// TODO: control authorization (can use create, update or delete based on role, group and museo?).
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

async function checkJoconde(notice) {
  const errors = [];
  try {
    // Check contact
    if (!notice.CONTACT) {
      errors.push("Le champ CONTACT ne doit pas être vide");
    }
    // Joconde
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

      console.log("notice.MUSEO", notice.MUSEO);
      if (notice.MUSEO) {
        const museo = await Museo.findOne({ REF: notice.MUSEO });
        console.log("FIND", museo);
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

      console.log(notice);

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
      const arr = [];

      // Delete previous images if not present anymore (only if the actually is an IMG field).
      if (notice.IMG !== undefined) {
        for (let i = 0; i < prevNotice.IMG.length; i++) {
          if (!(notice.IMG || []).includes(prevNotice.IMG[i])) {
            // Security: no need to escape filename, it comes from database.
            if (prevNotice.IMG[i]) {
              arr.push(deleteFile(prevNotice.IMG[i]));
            }
          }
        }
      }

      // Upload all files.
      for (let i = 0; i < req.files.length; i++) {
        const f = req.files[i];
        const path = `joconde/${filenamify(notice.REF)}/${filenamify(f.originalname)}`;
        arr.push(uploadFile(path, f));
      }

      // Update IMPORT ID (this code is unclear…)
      if (notice.POP_IMPORT.length) {
        const id = notice.POP_IMPORT[0];
        delete notice.POP_IMPORT;
        notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
      }

      // Prepare and update notice.
      await transformBeforeCreateAndUpdate(notice);
      arr.push(updateNotice(Joconde, ref, notice));

      // Consume promises and send sucessful result.
      await Promise.all(arr);
      res.sendStatus(200);
    } catch (e) {
      capture(e);
      res.sendStatus(500);
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
      const arr = [];

      // Upload all files (should this be done after creating notice?)
      for (let i = 0; i < req.files.length; i++) {
        const path = `joconde/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
        arr.push(uploadFile(path, req.files[i]));
      }

      // Transform and create.
      transformBeforeCreate(notice);
      arr.push(transformBeforeCreateAndUpdate(notice));
      const obj = new Joconde(notice);
      checkESIndex(obj);
      arr.push(obj.save());
      await Promise.all(arr);
      res.send({ success: true, msg: "OK" });
    } catch (e) {
      capture(e);
      res.sendStatus(500);
    }
  }
);

// Get notices by offset limit. Not sure it's still in use.
// TODO: check if it's in use.
router.get("/", (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  Joconde.paginate({}, { offset, limit }).then(results => {
    res.status(200).send(results.docs);
  });
});

// Get one notice by ref.
router.get("/:ref", (req, res) => {
  const ref = req.params.ref;
  Joconde.findOne({ REF: ref }, (err, notice) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (notice) {
      res.status(200).send(notice);
    } else {
      res.sendStatus(404);
    }
  });
});

// Delete one notice.
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const ref = req.params.ref;
    const doc = await Joconde.findOne({ REF: ref });
    if (!doc) {
      return res.status(500).send({
        error: `Impossible de trouver la notice joconde ${ref} à supprimer.`
      });
    }
    // remove all images and the document itself.
    const arr = doc.IMG.filter(i => i).map(f => deleteFile(f));
    arr.push(doc.remove());
    await Promise.all(arr);
    return res.status(200).send({});
  } catch (error) {
    capture(error);
    return res.status(500).send({ error });
  }
});

module.exports = router;
