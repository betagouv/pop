const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const passport = require("passport");
const filenamify = require("filenamify");
const validator = require("validator");
const upload = multer({ dest: "uploads/" });
const Joconde = require("../models/joconde");
const Museo = require("../models/museo");
const Memoire = require("../models/memoire");
const Merimee = require("../models/merimee");
const Palissy = require("../models/palissy");
const NoticesOAI = require("../models/noticesOAI");
const { capture } = require("./../sentry.js");
const { uploadFile, deleteFile, formattedNow, checkESIndex, updateNotice, updateOaiNotice, getBaseCompletName, identifyProducteur } = require("./utils");
const { canUpdateJoconde, canCreateJoconde, canDeleteJoconde } = require("./utils/authorization");
const { checkValidRef } = require("./utils/notice");

// Control properties document, flag each error.
async function withFlags(notice) {
  notice.POP_FLAGS = [];
  // Required properties.
  ["CONTACT", "MUSEO", "REF", "DOMN", "INV", "STAT"]
    .filter(prop => !notice[prop])
    .forEach(prop => notice.POP_FLAGS.push(`${prop}_EMPTY`));
  // REF must be 11 chars.
  if (notice.REF && notice.REF.length !== 11) {
    notice.POP_FLAGS.push("REF_LENGTH_EXACT_11");
  }
  // CONTACT must be an email.
  if (notice.CONTACT && !validator.isEmail(notice.CONTACT)) {
    notice.POP_FLAGS.push("CONTACT_INVALID_EMAIL");
  }
  // WWW must be valid URLs.
  const arr = notice.WWW;
  if(arr){
    for(let i=0; i<arr.length; i++){
      if(arr[i] && !validator.isURL(arr[i])){
        notice.POP_FLAGS.push(`WWW_INVALID_URL`);
      }
    }
  }

  // LVID must be an url.
  if (notice.LVID && !validator.isEmail(notice.LVID)) {
    notice.POP_FLAGS.push("LVID_INVALID_EMAIL");
  }

  //Check refs
  notice.POP_FLAGS = await checkValidRef(notice.REFMEM, Memoire, notice.POP_FLAGS, "REFMEM");
  notice.POP_FLAGS = await checkValidRef(notice.REFPAL, Palissy, notice.POP_FLAGS, "REFPAL");
  notice.POP_FLAGS = await checkValidRef(notice.REFMER, Merimee, notice.POP_FLAGS, "REFMER");

  return notice;
}

function transformBeforeCreate(notice) {
  notice.DMIS = formattedNow();
  notice.CONTIENT_IMAGE = notice.IMG ? "oui" : "non";
}

function transformBeforeCreateAndUpdate(notice) {
  console.log("transformBeforeCreateAndUpdate", notice.IMG);
  return new Promise(async (resolve, reject) => {
    try {
      if (notice.IMG !== undefined) {
        if (Array.isArray(notice.IMG)) {
          notice.CONTIENT_IMAGE = notice.IMG.length ? "oui" : "non";
        } else {
          notice.CONTIENT_IMAGE = notice.IMG ? "oui" : "non";
        }
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

          if (museo.POP_COORDONNEES && museo.POP_COORDONNEES.lat) {
            notice.POP_COORDONNEES = museo.POP_COORDONNEES;
            notice.POP_CONTIENT_GEOLOCALISATION = "oui";
          } else {
            notice.POP_CONTIENT_GEOLOCALISATION = "non";
          }
        }
      }
      notice = await withFlags(notice);
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
      const updateMode = req.body.updateMode;
      const user = req.user;
      const prevNotice = await Joconde.findOne({ REF: ref });
      await determineProducteur(notice);
      if (!await canUpdateJoconde(req.user, prevNotice, notice)) {
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

      //Ajout de l'historique de la notice
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes();
      var dateTime = date+' '+time;
      
      let HISTORIQUE = notice.HISTORIQUE || [];
      const newHistorique = {nom: user.nom, prenom: user.prenom, email: user.email, date: dateTime, updateMode: updateMode};

      HISTORIQUE.push(newHistorique);
      notice.HISTORIQUE = HISTORIQUE;

      // Prepare and update notice.
      await transformBeforeCreateAndUpdate(notice);
      const obj = new Joconde(notice);
      let oaiObj = { DMAJ: notice.DMAJ }
      checkESIndex(obj);
      promises.push(updateNotice(Joconde, ref, notice));
      promises.push(updateOaiNotice(NoticesOAI, ref, oaiObj));

      //Modification des liens entre bases
      await populateBaseFromJoconde(notice, notice.REFMEM, Memoire);
      await populateBaseFromJoconde(notice, notice.REFPAL, Palissy);
      await populateBaseFromJoconde(notice, notice.REFMER, Merimee);

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
      await determineProducteur(notice);
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
      //Modification des liens entre bases
      await populateBaseFromJoconde(notice, notice.REFMEM, Memoire);
      await populateBaseFromJoconde(notice, notice.REFPAL, Palissy);
      await populateBaseFromJoconde(notice, notice.REFMER, Merimee);

      let oaiObj = {
        REF: notice.REF,
        BASE: "Joconde",
        DMAJ: notice.DMIS
      }
      const obj = new Joconde(notice);
      const obj2 = new NoticesOAI(oaiObj)
      checkESIndex(obj);
      promises.push(obj.save());
      promises.push(obj2.save());
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
    const docOai = await NoticesOAI.findOne({ REF: ref });
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
    await Promise.all([docOai.remove()]);
    return res.status(200).send({ success: true, msg: "La notice à été supprimée." });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

function determineProducteur(notice) {
  return new Promise(async (resolve, reject) => {
    try {
      let noticeProducteur = await identifyProducteur("joconde", notice.REF, "", "");
      if(noticeProducteur){
        notice.PRODUCTEUR = noticeProducteur;
      }
      else {
        notice.PRODUCTEUR = "MUSEE";
      }
      resolve();
    } catch (e) {
      capture(e);
      reject(e);
    }
  });
}

function populateBaseFromJoconde(notice, refList, baseToPopulate) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!Array.isArray(refList)) {
        resolve();
        return;
      }
      const promises = [];
      const noticesToPopulate = await baseToPopulate.find({ REFJOC: notice.REF });

      for (let i = 0; i < noticesToPopulate.length; i++) {
        // If the object is removed from notice, then remove it from palissy
        if(!refList.includes(noticesToPopulate[i].REF)){
          noticesToPopulate[i].REFJOC = noticesToPopulate[i].REFJOC.filter(e => e !== notice.REF);
          promises.push(noticesToPopulate[i].save());
        }
      }

      let list = [];
      switch(baseToPopulate){
        case Memoire : 
          list = notice.REFMEM;
          break;
        case Merimee : 
          list = notice.REFMER;
          break;
        case Palissy : 
          list = notice.REFPAL;
          break;
      }

      for (let i = 0; i < list.length; i++) {
        if (!noticesToPopulate.find(e => e.REF === list[i])) {
          const obj = await baseToPopulate.findOne({ REF: list[i] });
          if (obj && Array.isArray(obj.REFJOC) && !obj.REFJOC.includes(notice.REF)) {
            obj.REFJOC.push(notice.REF);
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
