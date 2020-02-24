const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Autor = require("../models/autor");
const passport = require("passport");
const { formattedNow, updateNotice } = require("./utils");
const { canUpdateAutor, canCreateAutor, canDeleteAutor } = require("./utils/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { checkESIndex } = require("../controllers/utils");



router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/:ref", async (req, res) => {
  const autor = await Autor.findOne({ REF: req.params.ref });
  if (autor) {
    return res.status(200).send(autor);
  }
  return res.status(404).send({ success: false, msg: "Document introuvable" });
});

router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    const ref = req.params.ref;

    const notice = JSON.parse(req.body.notice);


    try {
      const prevNotice = await Autor.findOne({ REF: ref });
      if (!canUpdateAutor(req.user, prevNotice, notice)) {
        return res.status(401).send({
          success: false,
          msg: "Autorisation nécessaire pour mettre à jour cette ressource."
        });
      }
      const promises = [];

      // Prepare and update notice.
      await transformBeforeCreateAndUpdate(notice);

      const obj = new Autor(notice);
      
      checkESIndex(obj);
      promises.push(updateNotice(Autor, ref, notice));


      // Consume promises and send sucessful result.
      await Promise.all(promises);

      res.status(200).send({ success: true, msg: "Notice mise à jour." });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, error: e });
    }
  }
);

// Create a new notice.
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    const notice = JSON.parse(req.body.notice);
    notice.DMAJ = formattedNow();
    transformBeforeCreateAndUpdate(notice);
    if (!canCreateAutor(req.user, notice)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour créer cette ressource." });
    }
    try {
      const obj = new Autor(notice);
      const promises = [];

      checkESIndex(obj);
      promises.push(obj.save());
      await Promise.all(promises);

      res.send({ success: true, msg: "OK" });
    } catch (error) {
      capture(error);
      res.status(500).send({ success: false, error });
    }
  }
);

// Delete one notice.
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const ref = req.params.ref;
    const doc = await Autor.findOne({ REF: ref });
    if (!doc) {
      return res.status(404).send({
        success: false,
        msg: `Impossible de trouver la notice autor ${ref} à supprimer.`
      });
    }
    if (!canDeleteAutor(req.user, doc)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour supprimer cette ressource." });
    }
    // remove all images and the document itself.
    await Promise.all([doc.remove()]);
    return res.status(200).send({ success: true, msg: "La notice à été supprimée." });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

function transformBeforeCreateAndUpdate(notice) {
  console.log("transformBeforeCreateAndUpdate");
  return new Promise(async (resolve, reject) => {
    try {
      notice.DMIS = formattedNow();

      notice = withFlags(notice);

      resolve();
    } catch (e) {
      capture(e);
      reject(e);
    }
  });
}

// Control properties document, flag each error.
function withFlags(notice) {
  notice.POP_FLAGS = [];
  // Required properties.
  ["REF"]
    .filter(prop => !notice[prop])
    .forEach(prop => notice.POP_FLAGS.push(`${prop}_EMPTY`));

  return notice;
}

module.exports = router;
