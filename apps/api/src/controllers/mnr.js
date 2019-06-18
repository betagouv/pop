const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const filenamify = require("filenamify");
const upload = multer({ dest: "uploads/" });
const passport = require("passport");
const { capture } = require("./../sentry.js");
const Mnr = require("../models/mnr");
const { uploadFile, deleteFile, formattedNow, checkESIndex, updateNotice } = require("./utils");

const router = express.Router();

function transformBeforeUpdate(notice) {
  notice.DMAJ = formattedNow();
  if (notice.VIDEO !== undefined) {
    notice.CONTIENT_IMAGE = notice.VIDEO && notice.VIDEO.length ? "oui" : "non";
  }
}

async function transformBeforeCreate(notice) {
  notice.DMAJ = notice.DMIS = formattedNow();
  notice.CONTIENT_IMAGE = notice.VIDEO && notice.VIDEO.length ? "oui" : "non";
}

async function checkMnr(notice) {
  const errors = [];
  try {
    // Check contact
    if (!notice.CONTACT) {
      errors.push("Le champ CONTACT ne doit pas être vide");
    }

    if (!notice.TICO && !notice.TITR) {
      errors.push("Cette notice devrait avoir un TICO ou un TITR");
    }

    for (let i = 0; i < VIDEO.length; i++) {
      try {
        await rp.get(PREFIX_IMAGE + VIDEO[i]);
      } catch (e) {
        errors.push(`Image est inaccessible`);
      }
    }
  } catch (e) {
    capture(e);
  }
  return errors;
}

// Update a notice by ref.
router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    const ref = req.params.ref;
    const notice = JSON.parse(req.body.notice);
    const arr = [];

    try {
      const prevNotice = await Mnr.findOne({ REF: ref });

      if (notice.VIDEO !== undefined) {
        for (let i = 0; i < prevNotice.VIDEO.length; i++) {
          if (!(notice.VIDEO || []).includes(prevNotice.VIDEO[i])) {
            arr.push(deleteFile(prevNotice.VIDEO[i]));
          }
        }
      }

      for (let i = 0; i < req.files.length; i++) {
        const f = req.files[i];
        arr.push(uploadFile(`mnr/${filenamify(notice.REF)}/${filenamify(f.originalname)}`, f));
      }

      // Update IMPORT ID
      if (notice.POP_IMPORT.length) {
        const id = notice.POP_IMPORT[0];
        delete notice.POP_IMPORT;
        notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
      }

      transformBeforeUpdate(notice);
      arr.push(updateNotice(Mnr, ref, notice));
      await Promise.all(arr);
      res.status(200).send({ success: true, msg: "Notice mise à jour." });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, error: e});
    }
  }
);

// Create a new notice.
router.post("/", passport.authenticate("jwt", { session: false }), upload.any(), (req, res) => {
  const notice = JSON.parse(req.body.notice);
  transformBeforeCreate(notice);

  const doc = new Mnr(notice);
  checkESIndex(doc);
  doc.save().then(e => {
    res.send({ success: true, msg: "OK" });
  });
});

// Get one notice by ref.
router.get("/:ref", (req, res) => {
  const ref = req.params.ref;
  Mnr.findOne({ REF: ref }, (err, notice) => {
    if (err || !notice) {
      res.status(404).send({ success: false, msg: "Notice introuvable." });
    } else {
      res.send(notice);
    }
  });
});

// Delete 
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const ref = req.params.ref;
    const doc = await Mnr.findOne({ REF: ref });
    if (!doc) {
      return res.status(500).send({
        error: `Impossible de trouver la notice mnr ${ref} à supprimer`
      });
    }

    const arr = doc.VIDEO.map(f => deleteFile(f));
    arr.push(doc.remove());
    await Promise.all(arr);
    return res.status(200).send({ success: true, msg: "La notice à été supprimée." });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

module.exports = router;
