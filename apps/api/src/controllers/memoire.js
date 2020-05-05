const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mongoose = require("mongoose");
const filenamify = require("filenamify");
const passport = require("passport");
const validator = require("validator");
const Memoire = require("../models/memoire");
const Merimee = require("../models/merimee");
const Palissy = require("../models/palissy");
const Autor = require("../models/autor");
const Joconde = require("../models/joconde");
const Museo = require("../models/museo");
const Producteur = require("../models/producteur");

const {
  uploadFile,
  formattedNow,
  checkESIndex,
  updateNotice,
  deleteFile,
  findMemoireProducteur,
  identifyProducteur
} = require("./utils");
const { canUpdateMemoire, canCreateMemoire, canDeleteMemoire } = require("./utils/authorization");
const { capture } = require("./../sentry.js");

// Control properties document, flag each error.
async function withFlags(notice) {
  let listPrefix = await getPrefixesFromProducteurs(["palissy", "merimee", "autor"]);

  notice.POP_FLAGS = [];
  // Required properties.
  ["CONTACT", "TYPDOC", "DOM", "LOCA", "LEG", "COPY", "REF", "IDPROD"]
    .filter(prop => !notice[prop])
    .forEach(prop => notice.POP_FLAGS.push(`${prop}_EMPTY`));
  // LBASE must be 10 chars and starts with EA, PA, etc.
  if (notice.LBASE) {
    // LBASE must be 10 chars.
    if (notice.LBASE.filter(lb => lb.length !== 10).length > 0) {
      notice.POP_FLAGS.push("LBASE_LENGTH_EXACT_10");
    }
    // LBASE must start with EA, PA, etc.
    if (
      notice.LBASE.map(lb => lb.substring(0, 2)).filter(
        prefix => !listPrefix.includes(prefix)
      ).length > 0
    ) {
      notice.POP_FLAGS.push("LBASE_INVALID");
    }
  }
  // INSEE must be 5 char or more.
  if (notice.INSEE && notice.INSEE.length < 5) {
    notice.POP_FLAGS.push("INSEE_LENGTH_5");
  }
  // REF must only be alphanum + "_"
  if (notice.REF && !notice.REF.match(/^[A-Z0-9_]+$/)) {
    notice.POP_FLAGS.push("REF_INVALID");
  }
  // CONTACT must be an email.
  if (notice.CONTACT && !validator.isEmail(notice.CONTACT)) {
    notice.POP_FLAGS.push("CONTACT_INVALID_EMAIL");
  }
  // NUMTI and NUMP must be valid Alphanumeric.
  ["NUMTI", "NUMP"]
    .filter(prop => notice[prop] && !validator.isAlphanumeric(notice[prop]))
    .forEach(prop => notice.POP_FLAGS.push(`${prop}_INVALID_ALNUM`));
  return notice;
}

// Get collection by ref prefix.
async function findCollection(ref = "") {
  let collection = "";
  const producteurs = await Producteur.find();
  
  producteurs.map( producteur => {
    producteur.BASE.map( BASE => {
      BASE.prefixes.map( prefix => {
        if(String(ref).startsWith(String(prefix))){
          collection = BASE.base;
        }
      })
    });
  });

  switch (collection) {
    case "merimee":
      return Merimee;
    case "palissy":
      return Palissy;
    case "autor":
      return Autor;
    default:
      return "";
  }
}

async function getPrefixesFromProducteurs(listBase){
  let listePrefix = [];
  const producteurs = await Producteur.find({"BASE.base": {$in:listBase}});

  producteurs.map(
    producteur => producteur.BASE.filter(
      base => listBase.includes(base.base)
    ).map(
      base => listePrefix = listePrefix.concat(base.prefixes)
    )
  )  

  return listePrefix;
}

async function transformBeforeUpdate(notice) {
  if (notice.IMG !== undefined) {
    notice.CONTIENT_IMAGE = notice.IMG ? "oui" : "non";
  }
  
  notice.DMAJ = formattedNow();
  notice = await withFlags(notice);
}

async function transformBeforeCreate(notice) {
  notice.CONTIENT_IMAGE = notice.IMG ? "oui" : "non";
  notice.DMAJ = notice.DMIS = formattedNow();
  
  notice = await withFlags(notice);
}

//function findProducteur(REF, IDPROD, EMET) {
//  return findMemoireProducteur(REF, IDPROD, EMET);
//}

// Complicated function to update linked notice
// Uses cases :
// - You can remove a link by removing the reference in LBASE
// - You can create a link by adding a reference in LBASE
// - You need to update information ( copy, name, url ) if memoire has been updated
async function removeMemoireImageForNotice(notice, REF) {
  const MEMOIRE = notice.MEMOIRE.filter(e => e.ref !== REF);
  const CONTIENT_IMAGE = MEMOIRE.some(e => e.url) ? "oui" : "non";
  notice.CONTIENT_IMAGE = CONTIENT_IMAGE;
  notice.MEMOIRE = MEMOIRE;
  await notice.update({ MEMOIRE, CONTIENT_IMAGE });
  checkESIndex(notice);
  notice.index((err, res) => {
    console.log("I've been indexed!");
  });
}

async function updateMemoireImageForNotice(notice, REF, IMG = "", COPY = "", NAME = "") {
  const MEMOIRE = notice.MEMOIRE;
  let index = MEMOIRE.findIndex(e => e.ref === REF);
  if (index !== -1) {
    // update if needed only
    if (
      MEMOIRE[index].url === IMG &&
      MEMOIRE[index].copy === COPY &&
      MEMOIRE[index].name === NAME
    ) {
      return;
    }
    MEMOIRE[index] = { ref: REF, url: IMG, copy: COPY, name: NAME }; // create
  } else {
    MEMOIRE.push({ ref: REF, url: IMG, copy: COPY, name: NAME });
  }
  const CONTIENT_IMAGE = MEMOIRE.some(e => e.url) ? "oui" : "non";
  notice.CONTIENT_IMAGE = CONTIENT_IMAGE;
  await notice.update({ MEMOIRE, CONTIENT_IMAGE });
  checkESIndex(notice);
  notice.index((err, res) => {
    console.log("I've been indexed!");
  });
}

async function updateLinks(notice) {
  try {
    // if we update only a partial notice, no need to check link stuff
    if (notice.LBASE === undefined) {
      return;
    }

    // get the original notice to get IMG & COPY
    //const { REF, IMG, COPY } = notice;
    let REF = notice.REF;
    let noticeMemoire = await Memoire.findOne({ REF: REF });
    let IMG = notice.IMG ? notice.IMG : (noticeMemoire? noticeMemoire.IMG : "");
    let COPY = notice.COPY ? notice.COPY : (noticeMemoire? noticeMemoire.COPY : "");
    const NAME = (notice.TICO ? notice.TICO : (noticeMemoire? noticeMemoire.TICO : "")) 
                  || (notice.LEG ? notice.LEG : (noticeMemoire? noticeMemoire.LEG : "")) 
                  || `${notice.EDIF || ""} ${notice.OBJ || ""}`.trim();
    let LBASE = notice.LBASE || [];

    const linkedNotices = [];
    linkedNotices.push(...(await Palissy.find({ "MEMOIRE.ref": REF })));
    linkedNotices.push(...(await Merimee.find({ "MEMOIRE.ref": REF })));
    linkedNotices.push(...(await Autor.find({ "MEMOIRE.ref": REF })));

    const toAdd = [...notice.LBASE];

    // Check for deletion, addition and update.
    const promises = [];
    for (let i = 0; i < linkedNotices.length; i++) {
      if (!LBASE.includes(linkedNotices[i].REF)) {
        promises.push(removeMemoireImageForNotice(linkedNotices[i], REF)); // Delete  links.
      } else {
        const index = toAdd.indexOf(linkedNotices[i].REF);
        if (index > -1) {
          toAdd.splice(index, 1);
        }
        // existing notices
        promises.push(updateMemoireImageForNotice(linkedNotices[i], REF, IMG, COPY, NAME));
      }
    }

    for (let i = 0; i < toAdd.length; i++) {
      const collection = await findCollection(toAdd[i]);
      if (collection) {
        const doc = await collection.findOne({ REF: toAdd[i] });
        if (doc) {
          promises.push(updateMemoireImageForNotice(doc, REF, IMG, COPY, NAME));
        }
      }
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
    if (notice.IDPROD !== undefined && notice.EMET !== undefined) {
      await determineProducteur(notice);
    }
    if (!await canUpdateMemoire(req.user, await Memoire.findOne({ REF: ref }), notice)) {
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

    await transformBeforeUpdate(notice);

    //Modification des liens entre bases
    await populateBaseFromMemoire(notice, notice.REFJOC, Joconde);
    await populateBaseFromMemoire(notice, notice.REFMUS, Museo);

    const obj = new Memoire(notice);
    checkESIndex(obj);

    try {
      await updateNotice(Memoire, ref, notice);
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, error: e });
    }

    try {
      await updateLinks(notice);
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
    await determineProducteur(notice);
    if (!await canCreateMemoire(req.user, notice)) {
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
    await transformBeforeCreate(notice);
    //Modification des liens entre bases
    await populateBaseFromMemoire(notice, notice.REFJOC, Joconde);
    await populateBaseFromMemoire(notice, notice.REFMUS, Museo);

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
    if (!await canDeleteMemoire(req.user, doc)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour supprimer cette ressource." });
    }
    // Empty LBASE before updating links then remove documents and remove image.
    doc.LBASE = [];
    await updateLinks(doc);
    const promises = [doc.remove()];
    if (doc.IMG) {
      promises.push(deleteFile(doc.IMG, "memoire"));
    }
    checkESIndex(doc);
    await Promise.all(promises);
    return res.status(200).send({ success: true, msg: "La notice à été supprimée." });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

function determineProducteur(notice) {
  return new Promise(async (resolve, reject) => {
    try {
      let noticeProducteur = await identifyProducteur("memoire", notice.REF, notice.IDPROD, notice.EMET);
      if(noticeProducteur){
        notice.PRODUCTEUR = noticeProducteur;
      }
      else {
        notice.PRODUCTEUR = "AUTRE";
      }
      resolve();
    } catch (e) {
      capture(e);
      reject(e);
    }
  });
}

function populateBaseFromMemoire(notice, refList, baseToPopulate) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!Array.isArray(refList)) {
        resolve();
        return;
      }
      const promises = [];
      const noticesToPopulate = await baseToPopulate.find({ REFMEM: notice.REF });

      for (let i = 0; i < noticesToPopulate.length; i++) {
        // If the object is removed from notice, then remove it from palissy
        if(!refList.includes(noticesToPopulate[i].REF)){
          noticesToPopulate[i].REFMEM = noticesToPopulate[i].REFMEM.filter(e => e !== notice.REF);
          promises.push(noticesToPopulate[i].save());
        }
      }

      let list = [];
      switch(baseToPopulate){
        case Joconde : 
          list = notice.REFJOC;
          break;
        case Museo : 
          list = notice.REFMUS;
          break;
      }

      for (let i = 0; i < list.length; i++) {
        if (!noticesToPopulate.find(e => e.REF === list[i])) {
          const obj = await baseToPopulate.findOne({ REF: list[i] });
          if (obj && Array.isArray(obj.REFMEM) && !obj.REFMEM.includes(notice.REF)) {
            obj.REFMEM.push(notice.REF);
            promises.push(obj.save());
          }
        }
      }
      
      await Promise.all(promises);
      resolve();
    } catch (error) {
      capture(error);
      resolve();
    }
  });
}

module.exports = router;
