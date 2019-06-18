const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const multer = require("multer");
const filenamify = require("filenamify");
const upload = multer({ dest: "uploads/" });
const Museo = require("../models/museo");
const Joconde = require("../models/joconde");
const { formattedNow, uploadFile } = require("./utils");

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
  return res.status(404).send({ success: false, msg: "Notice introuvable." });
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
      const path = `museo/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
      arr.push(uploadFile(path, req.files[i]));
    }
    
    transformBeforeCreateOrUpdate(notice);
    //update joconde
    arr.push(updateJocondeNotices(notice));
    arr.push(Museo.findOneAndUpdate({ REF: notice.REF }, notice, { new: true }));
    try {
      await Promise.all(arr);
      res.status(200).send({ success: true, msg: "Notice mise à jour." });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, error: e });
    }
  }
);

module.exports = router;
