const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const passport = require("passport");
const filenamify = require("filenamify");
const upload = multer({ dest: "uploads/" });
const Joconde = require("../models/joconde");
const Museo = require("../models/museo");
const { capture } = require("./../sentry.js");
const { uploadFile, deleteFile, formattedNow, checkESIndex, updateNotice } = require("./utils");
const { canUpdateJoconde, canCreateJoconde, canDeleteJoconde } = require("./utils/authorization");

async function checkJoconde(notice) {
  const errors = [];
  try {
    if (!notice.CONTACT) {
      errors.push("Le champ CONTACT ne doit pas être vide");
    }
    if (!notice.TICO && !notice.TITR) {
      errors.push("Cette notice devrait avoir un TICO ou un TITR");
    }
    for (let i = 0; i < IMG.length; i++) {
      try {
        await rp.get(PREFIX_IMAGE + IMG[i]);
      } catch (e) {
        errors.push(`Image est inaccessible`);
      }
    }
  } catch (e) {
    capture(e);
  }
  return errors;
}

function transformBeforeCreate(notice) {
  notice.DMIS = formattedNow();
  notice.CONTIENT_IMAGE = notice.IMG ? "oui" : "non";
}

function transformBeforeCreateAndUpdate(notice) {
  return new Promise(async (resolve, reject) => {
    try {
      if (notice.IMG !== undefined) {
        notice.CONTIENT_IMAGE = notice.IMG ? "oui" : "non";
      }
      notice.DMAJ = formattedNow();

      if (notice.MUSEO) {
        const museo = await Museo.findOne({ REF: notice.MUSEO });
        if (museo) {
          notice.REGION = museo.REGION || "";
          notice.DPT = museo.DPT || "";
          notice.VILLE_M = museo.VILLE_M || "";
          notice.NOMOFF = museo.NOMOFF || "";
          notice.CONTACT = museo.CONTACT_GENERIQUE || "";

          if (museo.location && museo.location.lat) {
            notice.POP_COORDONNEES = museo.location;
            notice.POP_CONTIENT_GEOLOCALISATION = "oui";
          } else {
            notice.POP_CONTIENT_GEOLOCALISATION = "non";
          }
        }
      }

      resolve();
    } catch (e) {
      capture(e);
      reject(e);
    }
  });
}

// Update a notice by ref
router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    const ref = req.params.ref;
    const notice = JSON.parse(req.body.notice);

    try {
      const prevNotice = await Joconde.findOne({ REF: ref });
      if (!canUpdateJoconde(req.user, prevNotice, notice)) {
        return res.status(401).send({
          success: false,
          msg: "Autorisation nécessaire pour mettre à jour cette ressource."
        });
      }
      const promises = [];

      // Delete previous images if not present anymore (only if the actually is an IMG field).
      if (notice.IMG !== undefined) {
        for (let i = 0; i < prevNotice.IMG.length; i++) {
          if (!(notice.IMG || []).includes(prevNotice.IMG[i])) {
            // Security: no need to escape filename, it comes from database.
            if (prevNotice.IMG[i]) {
              promises.push(deleteFile(prevNotice.IMG[i], "joconde"));
            }
          }
        }
      }

      // Upload all files.
      for (let i = 0; i < req.files.length; i++) {
        const f = req.files[i];
        const path = `joconde/${filenamify(notice.REF)}/${filenamify(f.originalname)}`;
        promises.push(uploadFile(path, f));
      }

      // Update IMPORT ID (this code is unclear…)
      if (notice.POP_IMPORT.length) {
        const id = notice.POP_IMPORT[0];
        delete notice.POP_IMPORT;
        notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
      }

      // Prepare and update notice.
      await transformBeforeCreateAndUpdate(notice);
      promises.push(updateNotice(Joconde, ref, notice));

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
    try {
      const notice = JSON.parse(req.body.notice);
      if (!canCreateJoconde(req.user, notice)) {
        return res
          .status(401)
          .send({ success: false, msg: "Autorisation nécessaire pour créer cette ressource." });
      }
      const promises = [];

      // Upload all files (should this be done after creating notice?)
      for (let i = 0; i < req.files.length; i++) {
        const path = `joconde/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
        promises.push(uploadFile(path, req.files[i]));
      }

      // Transform and create.
      transformBeforeCreate(notice);
      await transformBeforeCreateAndUpdate(notice);
      const obj = new Joconde(notice);
      checkESIndex(obj);
      promises.push(obj.save());
      await Promise.all(promises);
      res.send({ success: true, msg: "OK" });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, error: e });
    }
  }
);

// Get one notice by ref.
router.get("/:ref", async (req, res) => {
  const ref = req.params.ref;
  const notice = await Joconde.findOne({ REF: ref });
  if (notice) {
    return res.status(200).send(notice);
  }
  return res.status(404).send({ success: false, msg: "Notice introuvable." });
});

// Delete one notice.
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const ref = req.params.ref;
    const doc = await Joconde.findOne({ REF: ref });
    if (!doc) {
      return res.status(404).send({
        success: false,
        msg: `Impossible de trouver la notice joconde ${ref} à supprimer.`
      });
    }
    if (!canDeleteJoconde(req.user, doc)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour supprimer cette ressource." });
    }
    // remove all images and the document itself.
    await Promise.all([doc.IMG.filter(i => i).map(f => deleteFile(f, "joconde")), doc.remove()]);
    return res.status(200).send({ success: true, msg: "La notice à été supprimée." });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

module.exports = router;
