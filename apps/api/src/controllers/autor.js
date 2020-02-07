const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Autor = require("../models/autor");
const passport = require("passport");
const { formattedNow, updateNotice } = require("./utils");
const validator = require("validator");
const { canUpdateAutor, canCreateAutor, canDeleteAutor } = require("./utils/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });



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
      
      //TODO: index elastic pas encore existant
      //checkESIndex(obj);
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

function transformBeforeCreateAndUpdate(notice) {
  console.log("transformBeforeCreateAndUpdate");
  return new Promise(async (resolve, reject) => {
    try {
      notice.DMAJ = formattedNow();

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
  // REF must be 7 chars.
  if (notice.REF && notice.REF.length !== 7) {
    notice.POP_FLAGS.push("REF_LENGTH_EXACT_7");
  }
  // CONTACT must be an email.
  if (notice.CONTACT && !validator.isEmail(notice.CONTACT)) {
    notice.POP_FLAGS.push("CONTACT_INVALID_EMAIL");
  }
  return notice;
}

module.exports = router;
