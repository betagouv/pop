const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const multer = require("multer");
const filenamify = require("filenamify");
const upload = multer({ dest: "uploads/" });
const Museo = require("../models/museo");
const Joconde = require("../models/joconde");
const { formattedNow, deleteFile, uploadFile } = require("./utils");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

function transformBeforeCreateOrUpdate(notice) {
  notice.DMAJ = notice.DMIS = formattedNow();
  notice.CONTIENT_IMAGE = notice.PHOTO ? "oui" : "non";
}

async function updateJocondeNotices(notice) {
  const { CONTACT_GENERIQUE, REGION, DPT, VILLE_M, NOMOFF } = notice;
  const obj = {};
  if (CONTACT_GENERIQUE !== undefined) {
    obj.CONTACT = CONTACT_GENERIQUE;
  }
  if (REGION !== undefined) {
    obj.REGION = REGION;
  }
  if (DPT !== undefined) {
    obj.DPT = DPT;
  }
  if (VILLE_M !== undefined) {
    obj.VILLE_M = VILLE_M;
  }
  if (NOMOFF !== undefined) {
    obj.NOMOFF = NOMOFF;
  }
  await Joconde.update({ MUSEO: notice.REF }, obj);
}

router.get("/:ref", async (req, res) => {
  const museo = await Museo.findOne({ REF: req.params.ref });
  if (museo) {
    return res.status(200).send(museo);
  }
  return res.sendStatus(404);
});

router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    const notice = JSON.parse(req.body.notice);
    if (!notice || !notice.REF) {
      return res.status(400).json({ success: false, msg: "Objet museo ou référence absente" });
    }
    const arr = [];
    for (let i = 0; i < req.files.length; i++) {
      arr.push(
        uploadFile(
          `museo/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`,
          req.files[i]
        )
      );
    }
    transformBeforeCreateOrUpdate(notice);

    //update joconde
    arr.push(updateJocondeNotices(notice));

    arr.push(Museo.findOneAndUpdate({ REF: notice.REF }, notice, { new: true }));
    try {
      await Promise.all(arr);
      return res.sendStatus(200);
    } catch (e) {
      capture(e);
      res.sendStatus(500);
    }
  }
);

router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const ref = req.params.ref;

    console.log("DELETE");

    const doc = await Museo.findOne({ REF: ref });
    if (!doc) {
      return res.status(500).send({
        error: `Je ne trouve pas la notice museo ${ref} à supprimer`
      });
    }
    if (doc.PHOTO) {
      deleteFile(doc.PHOTO);
    }
    await doc.remove();
    return res.status(200).send({});
  } catch (error) {
    capture(error);
    return res.status(500).send({
      error
    });
  }
});

module.exports = router;
