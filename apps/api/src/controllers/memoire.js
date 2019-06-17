// TODO: control authorization (can use create, update or delete based on role, group and PRODUCTEUR?).
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
const { uploadFile, formattedNow, checkESIndex, updateNotice, deleteFile } = require("./utils");
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
  if (
    String(REF).startsWith("IVN") ||
    String(REF).startsWith("IVR") ||
    String(REF).startsWith("IVD") ||
    String(REF).startsWith("IVC")
  ) {
    return "INV";
  } else if (String(REF).startsWith("OA")) {
    return "CAOA";
  } else if (String(REF).startsWith("MH")) {
    return "CRMH";
  } else if (String(REF).startsWith("AR")) {
    return "ARCH";
  } else if (String(REF).startsWith("AP") && String(IDPROD).startsWith("Service départemental")) {
    return "UDAP";
  } else if (String(IDPROD).startsWith("SAP") || String(EMET).startsWith("SAP")) {
    return "MAP";
  }
  return "AUTRE";
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
        await collection.update({ REF: toAdd[i] }, { $push: { MEMOIRE: { ref: REF, url: URL } } });
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
    const arr = [];

    // Upload files.
    for (let i = 0; i < req.files.length; i++) {
      const path = `memoire/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
      arr.push(uploadFile(path, req.files[i]));
    }

    // Update IMPORT ID.
    if (notice.POP_IMPORT.length) {
      const id = notice.POP_IMPORT[0];
      delete notice.POP_IMPORT;
      notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
    }

    transformBeforeUpdate(notice);
    arr.push(updateLinks(notice));
    arr.push(updateNotice(Memoire, ref, notice));

    try {
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
    const notice = JSON.parse(req.body.notice);
    notice.DMIS = notice.DMAJ = formattedNow();
    const arr = [];

    // Upload images.
    for (let i = 0; i < req.files.length; i++) {
      const path = `memoire/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
      arr.push(uploadFile(path, req.files[i]));
    }

    // Update and save.
    arr.push(updateLinks(notice));
    transformBeforeCreate(notice);
    const obj = new Memoire(notice);
    checkESIndex(obj);
    arr.push(obj.save());
    try {
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
  Memoire.paginate({}, { offset, limit }).then(results => {
    res.status(200).send(results.docs);
  });
});

// Get one notice by ref.
router.get("/:ref", (req, res) => {
  const ref = req.params.ref;
  Memoire.findOne({ REF: ref }, (err, notice) => {
    if (err) {
      capture(err);
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

router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const ref = req.params.ref;
    const doc = await Memoire.findOne({ REF: ref });
    if (!doc) {
      return res.status(500).send({
        error: `Impossible de trouver la notice memoire ${ref} à supprimer`
      });
    }

    // Empty LBASE before updating links then remove documents and remove image.
    doc.LBASE = [];
    await updateLinks(doc);
    const arr = [doc.remove()];
    if (doc.IMG) {
      arr.push(deleteFile(doc.IMG));
    }
    await Promise.all(arr);
    return res.status(200).send({});
  } catch (error) {
    capture(error);
    return res.status(500).send({ error });
  }
});

module.exports = router;
