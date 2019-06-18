const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mongoose = require("mongoose");
const filenamify = require("filenamify");
const passport = require("passport");
const Memoire = require("../models/memoire");
const Merimee = require("../models/merimee");
const Palissy = require("../models/palissy");
const { uploadFile, formattedNow, checkESIndex, updateNotice, deleteFile, findMemoireProducteur } = require("./utils");
const { canUpdateMemoire, canCreateMemoire, canDeleteMemoire } = require("./utils/authorization");
const { capture } = require("./../sentry.js");

// Get collection by ref prefix.
function findCollection(ref = "") {
  const prefix = ref.substring(0, 2);
  switch (prefix) {
    case "EA":
    case "PA":
    case "IA":
      return Merimee;
    case "IM":
    case "PM":
    case "EM":
      return Palissy;
    default:
      return "";
  }
}

function transformBeforeUpdate(notice) {
  if (notice.IMG !== undefined) {
    notice.CONTIENT_IMAGE = notice.IMG ? "oui" : "non";
  }
  if (notice.IDPROD !== undefined && notice.EMET !== undefined) {
    notice.PRODUCTEUR = findProducteur(notice.REF, notice.IDPROD, notice.EMET);
  }
  notice.DMAJ = formattedNow();
}

function transformBeforeCreate(notice) {
  notice.CONTIENT_IMAGE = notice.IMG ? "oui" : "non";
  notice.DMAJ = notice.DMIS = formattedNow();
  notice.PRODUCTEUR = findProducteur(notice.REF, notice.IDPROD, notice.EMET);
}

async function checkMemoire(notice) {
  const errors = [];
  try {
    //Check contact
    if (!notice.CONTACT) {
      errors.push("Le champ CONTACT ne doit pas être vide");
    }
    if (!notice.TICO && !notice.TITR && !notice.EDIF) {
      errors.push("Cette notice devrait avoir un TICO ou un TITR ou un EDIF");
    }

    for (let i = 0; i < notice.LBASE.length; i++) {
      const prefix = notice.LBASE[i].substring(0, 2);
      if (["EA", "PA", "IA"].includes(prefix)) {
        col = Merimee;
      } else if (["IM", "PM", "EM"].includes(prefix)) {
        col = Palissy;
      } else {
        errors.push(`Lien LBASE corrompu ${notice.LBASE[i]}`);
        continue;
      }
      const doc = await col.findOne({ REF: notice.LBASE[i] });
      if (!doc) {
        errors.push(`La notice ${notice.LBASE[i]} contenue dans LBASE n'existe pas`);
      }
    }

    if (notice.IMG) {
      try {
        const str =
          notice.IMG.indexOf("http://www2.culture.gouv.fr") === -1
            ? PREFIX_IMAGE + notice.IMG
            : notice.IMG;
        await rp.get(str);
      } catch (e) {
        errors.push(`Image ${str} est inaccessible`);
      }
    }
  } catch (e) {
    capture(e);
  }
  return errors;
}

function findProducteur(REF, IDPROD, EMET) {
  return findMemoireProducteur(REF, IDPROD, EMET);
}

async function updateLinks(notice) {
  try {
    const REF = notice.REF;
    const URL = notice.IMG;
    let LBASE = notice.LBASE || [];
    const toAdd = [...LBASE];

    const palissyNotices = await Palissy.find({ "MEMOIRE.ref": REF });
    const merimeeNotices = await Merimee.find({ "MEMOIRE.ref": REF });

    // Check palissy for deletion and addition.
    for (let i = 0; i < palissyNotices.length; i++) {
      if (!LBASE.includes(palissyNotices[i].REF)) {
        // Delete palissy links.
        await palissyNotices[i].update({ $pull: { MEMOIRE: { ref: REF } } });
      } else {
        // Adds to list of addition for palissy.
        const index = toAdd.indexOf(palissyNotices[i].REF);
        if (index > -1) {
          toAdd.splice(index, 1);
        }
      }
    }

    // Check merimee for deletion and addition.
    for (let i = 0; i < merimeeNotices.length; i++) {
      if (!LBASE.includes(merimeeNotices[i].REF)) {
        // Delete merimee links.
        await merimeeNotices[i].update({ $pull: { MEMOIRE: { ref: REF } } });
      } else {
        // Adds to list of addition for merimee.
        const index = toAdd.indexOf(merimeeNotices[i].REF);
        if (index > -1) {
          toAdd.splice(index, 1);
        }
      }
    }

    // Add new links to palissy and merimee.
    for (let i = 0; i < toAdd.length; i++) {
      const collection = await findCollection(toAdd[i]);
      if (collection) {
        const obj = { $push: { MEMOIRE: { ref: REF, url: URL } } };
        if (URL) {
          obj.CONTIENT_IMAGE = "oui";
        }
        // It doesnt work  if memoire is update instead of added.

        /// Its not indexed through ES
        await collection.update({ REF: toAdd[i] }, obj);
      }
    }
  } catch (error) {
    capture(error);
  }
}

// Update a notice.
router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    const ref = req.params.ref;
    const notice = JSON.parse(req.body.notice);

    if (!canUpdateMemoire(req.user, await Memoire.findOne({ REF: ref }), notice)) {
      return res.status(401).send({
        success: false,
        msg: "Autorisation nécessaire pour mettre à jour cette ressource."
      });
    }

    const promises = [];

    // Upload files.
    for (let i = 0; i < req.files.length; i++) {
      const path = `memoire/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
      promises.push(uploadFile(path, req.files[i]));
    }

    // Update IMPORT ID.
    if (notice.POP_IMPORT.length) {
      const id = notice.POP_IMPORT[0];
      delete notice.POP_IMPORT;
      notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
    }

    transformBeforeUpdate(notice);
    promises.push(updateLinks(notice));
    promises.push(updateNotice(Memoire, ref, notice));

    try {
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
    notice.DMIS = notice.DMAJ = formattedNow();
    if (!canCreateMemoire(req.user, notice)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour créer cette ressource." });
    }
    const promises = [];

    // Upload images.
    for (let i = 0; i < req.files.length; i++) {
      const path = `memoire/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
      promises.push(uploadFile(path, req.files[i]));
    }

    // Update and save.
    promises.push(updateLinks(notice));
    transformBeforeCreate(notice);
    const obj = new Memoire(notice);
    checkESIndex(obj);
    promises.push(obj.save());
    try {
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
  const notice = await Memoire.findOne({ REF: ref });
  if (notice) {
    return res.status(200).send(notice);
  }
  return res.status(404).send({ success: false, msg: "Notice introuvable." });
});

// Delete one notice.
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const ref = req.params.ref;
    const doc = await Memoire.findOne({ REF: ref });
    if (!doc) {
      return res.status(404).send({
        success: false,
        msg: `Impossible de trouver la notice memoire ${ref} à supprimer.`
      });
    }
    if (!canDeleteMemoire(req.user, doc)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour supprimer cette ressource." });
    }
    // Empty LBASE before updating links then remove documents and remove image.
    doc.LBASE = [];
    await updateLinks(doc);
    const promises = [doc.remove()];
    if (doc.IMG) {
      promises.push(deleteFile(doc.IMG));
    }
    await Promise.all(promises);
    return res.status(200).send({ success: true, msg: "La notice à été supprimée." });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

module.exports = router;
