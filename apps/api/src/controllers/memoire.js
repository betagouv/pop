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
const {
  uploadFile,
  formattedNow,
  checkESIndex,
  updateNotice,
  deleteFile,
  findMemoireProducteur
} = require("./utils");
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

/* Complicated function to update linked notice
Uses cases : 
- You can remove a link by removing the reference in LBASE
- You can create a link by adding a reference in LBASE
- You need to update information ( copy, name, url ) if memoire has been updated



*/

async function removeMemoireImageForNotice(notice, REF) {
  const MEMOIRE = notice.MEMOIRE.filter(e => e.ref !== REF);
  const CONTIENT_IMAGE = notice.MEMOIRE.some(e => e.url) ? "oui" : "non";
  await notice.update({ MEMOIRE, CONTIENT_IMAGE });
}

async function updateMemoireImageForNotice(notice, REF, IMG = "", COPY = "", NAME = "") {
  const MEMOIRE = notice.MEMOIRE;
  let index = MEMOIRE.findIndex(e => e.ref === REF);
  if (index !== -1) {
    //update if needed only
    if (
      MEMOIRE[index].url === IMG &&
      MEMOIRE[index].copy === COPY &&
      MEMOIRE[index].name === NAME
    ) {
      return;
    }
    console.log("update", REF);
    MEMOIRE[index] = { ref: REF, url: IMG, copy: COPY, name: NAME };
  } else {
    //create
    MEMOIRE.push({ ref: REF, url: IMG, copy: COPY, name: NAME });
  }
  const CONTIENT_IMAGE = MEMOIRE.some(e => e.url) ? "oui" : "non";
  await notice.update({ MEMOIRE, CONTIENT_IMAGE });
}

async function updateLinks(notice) {
  try {
    // if we update only a partial notice, no need to check link stuff
    if (notice.LBASE === undefined) {
      return;
    }

    const { REF, IMG, COPY } = notice;

    const NAME = notice.TICO || notice.LEG || `${notice.EDIF || ""} ${notice.OBJ || ""}`.trim();
    let LBASE = notice.LBASE || [];

    const linkedNotices = [];
    linkedNotices.push(...(await Palissy.find({ "MEMOIRE.ref": REF })));
    linkedNotices.push(...(await Merimee.find({ "MEMOIRE.ref": REF })));

    const toAdd = [...notice.LBASE];

    // Check  for deletion, addition and update.
    const promises = [];
    for (let i = 0; i < linkedNotices.length; i++) {
      if (!LBASE.includes(linkedNotices[i].REF)) {
        promises.push(removeMemoireImageForNotice(linkedNotices[i], REF)); // Delete  links.
      } else {
        const index = toAdd.indexOf(linkedNotices[i].REF);
        if (index > -1) {
          toAdd.splice(index, 1);
        }
        //existing notices
        promises.push(updateMemoireImageForNotice(linkedNotices[i], REF, IMG, COPY, NAME));
      }
    }

    for (let i = 0; i < toAdd.length; i++) {
      const collection = await findCollection(toAdd[i]);
      const doc = await collection.findOne({ REF: toAdd[i] });
      promises.push(updateMemoireImageForNotice(doc, REF, IMG, COPY, NAME));
    }

    await Promise.all(promises);
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
