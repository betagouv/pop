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
const { canUpdateMuseo, canDeleteMuseo } = require("./utils/authorization");

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

// Get one notice.
router.get("/:ref", async (req, res) => {
  const museo = await Museo.findOne({ REF: req.params.ref });
  if (museo) {
    return res.status(200).send(museo);
  }
  return res.status(404).send({ success: false, msg: "Notice introuvable." });
});

// Update a notice.
router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    const notice = JSON.parse(req.body.notice);
    if (!notice || !notice.REF) {
      return res.status(400).json({ success: false, msg: "Objet museo ou référence absente" });
    }

    // Check authorisation.
    const prevNotice = await Museo.findOne({ REF: notice.REF });
    if (!canUpdateMuseo(req.user, prevNotice, notice)) {
      return res.status(401).send({
        success: false,
        msg: "Autorisation nécessaire pour mettre à jour cette ressource."
      });
    }
    const promises = [];

    // Upload images.
    for (let i = 0; i < req.files.length; i++) {
      const path = `museo/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
      promises.push(uploadFile(path, req.files[i]));
    }

    // Update IMPORT ID (this code is unclear…)
    if (notice.POP_IMPORT.length) {
      const id = notice.POP_IMPORT[0];
      delete notice.POP_IMPORT;
      notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
    }

    transformBeforeCreateOrUpdate(notice);
    promises.push(updateJocondeNotices(notice));
    promises.push(Museo.findOneAndUpdate({ REF: notice.REF }, notice, { new: true }));
    try {
      await Promise.all(promises);
      res.status(200).send({ success: true, msg: "Notice mise à jour." });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, error: e });
    }
  }
);

// Delete a notice by its ref.
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const ref = req.params.ref;
    const doc = await Museo.findOne({ REF: ref });
    if (!doc) {
      return res.status(404).send({
        success: false,
        msg: `Impossible de trouver la notice museo ${ref} à supprimer.`
      });
    }
    if (!canDeleteMuseo(req.user, doc)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour supprimer cette ressource." });
    }
    if (doc.PHOTO) {
      deleteFile(doc.PHOTO, "museo");
    }
    await doc.remove();
    return res.status(200).send({ success: true, msg: "La notice à été supprimée." });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

module.exports = router;
