const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const filenamify = require("filenamify");
const validator = require("validator");
const upload = multer({ dest: "uploads/" });
const Enluminures = require("../models/enluminures");
const NoticesOAI = require("../models/noticesOAI");
let moment = require('moment-timezone')
const { capture } = require("./../sentry.js");
const { uploadFile, deleteFile, formattedNow, checkESIndex, updateNotice, updateOaiNotice, getBaseCompletName, identifyProducteur } = require("./utils");
const { canUpdateEnluminures, canCreateEnluminures, canDeleteEnluminures } = require("./utils/authorization");
const { checkValidRef } = require("./utils/notice");

function transformBeforeCreate(notice) {
  notice.DMIS = formattedNow();
  notice.CONTIENT_IMAGE = notice.VIDEO ? "oui" : "non";
}

// Control properties document, flag each error.
async function withFlags(notice) {
  notice.POP_FLAGS = [];
  // Required properties.
  ["REF"]
    .filter(prop => !notice[prop])
    .forEach(prop => notice.POP_FLAGS.push(`${prop}_EMPTY`));
  // REF must be 11 chars.
  if (notice.REF && notice.REF.length !== 11) {
    notice.POP_FLAGS.push("REF_LENGTH_11");
  }

  // LIENS must be valid URLs.
  const arr = notice.LIENS;
  if(arr){
    for(let i=0; i<arr.length; i++){
      if(arr[i] && !validator.isURL(arr[i])){
        notice.POP_FLAGS.push(`LIENS_INVALID_URL`);
      }
    }
  }

  // Reference not found RENV
  if (notice.RENV) {
    for (let i = 0; i < notice.RENV.length; i++) {
      if (!(await Enluminures.exists({ REF: notice.RENV[i] }))) {
        notice.POP_FLAGS.push("RENV_REF_NOT_FOUND");
      }
    }
  }
  // Reference not found REFC
  if (notice.REFC) {
    for (let i = 0; i < notice.REFC.length; i++) {
      if (!(await Enluminures.exists({ REF: notice.REFC[i] }))) {
        notice.POP_FLAGS.push("REFC_REF_NOT_FOUND");
      }
    }
  }
  // Reference not found REFDE
  if (notice.REFDE) {
    for (let i = 0; i < notice.REFDE.length; i++) {
      if (!(await Enluminures.exists({ REF: notice.REFDE[i] }))) {
        notice.POP_FLAGS.push("REFDE_REF_NOT_FOUND");
      }
    }
  }

  return notice;
}


function transformBeforeCreateAndUpdate(notice) {
  return new Promise(async (resolve, reject) => {
    try {
      if (notice.VIDEO !== undefined) {
        if (Array.isArray(notice.VIDEO)) {
          notice.CONTIENT_IMAGE = notice.VIDEO.length ? "oui" : "non";
        } else {
          notice.CONTIENT_IMAGE = notice.VIDEO ? "oui" : "non";
        }
      }

      //Si la notice contient des coordonnées, contient geolocalisation devient oui
      let lat = "";
      let lon = "";
      let coordonnees = {lat: 0, lon: 0}

      if(notice["POP_COORDONNEES.lat"] || notice["POP_COORDONNEES.lon"]){
        lat = String(notice["POP_COORDONNEES.lat"]);
        lon = String(notice["POP_COORDONNEES.lon"]);
      }
      else if(notice.POP_COORDONNEES && (notice.POP_COORDONNEES.lat || notice.POP_COORDONNEES.lon)){
        lat = String(notice.POP_COORDONNEES.lat);
        lon = String(notice.POP_COORDONNEES.lon);
      }
      if (lat || lon) {
        if(lat){
          coordonnees.lat = parseFloat(lat.replace(",","."));
        }
        if(lon){
          coordonnees.lon = parseFloat(lon.replace(",","."));
        }
        //Si lat et lon, alors POP_CONTIENT_GEOLOCALISATION est oui
        if(coordonnees.lat !==0  && !isNaN(coordonnees.lat) && 
          coordonnees.lon !==0  && !isNaN(coordonnees.lon)){
          notice.POP_CONTIENT_GEOLOCALISATION = "oui";
        }
        else {
          notice.POP_CONTIENT_GEOLOCALISATION = "non";
        }
      } else {
        notice.POP_CONTIENT_GEOLOCALISATION = "non";
      }
      if(notice["POP_COORDONNEES.lat"] || notice["POP_COORDONNEES.lon"]){
        notice["POP_COORDONNEES.lat"] = coordonnees.lat;
        notice["POP_COORDONNEES.lon"] = coordonnees.lon;
      }
      else{
        notice.POP_COORDONNEES = coordonnees;
      }

      notice.DMAJ = formattedNow();

      notice = await withFlags(notice);
      resolve();
    } catch (e) {
      capture(e);
      reject(e);
    }
  });
}

router.get("/:ref", async (req, res) => {
  /* 	
    #swagger.tags = ['Enluminures']
    #swagger.path = '/enluminures/{ref}'
    #swagger.description = "Retourne les informations de la notice enluminure par rapport à la référence"
    #swagger.parameters['ref'] = { 
      in: 'path', 
      description: 'Référence de la notice enluminure',
      type: 'string' 
    }
    #swagger.responses[200] = { 
      schema: { 
        "$ref": '#/definitions/GetEnluminures'
      },
      description: 'Récupération des informations avec succés' 
    }
    #swagger.responses[404] = { 
      description: 'Document non trouvé',
      schema: {
        success: false,
        msg: "Document introuvable"
      } 
    }
  */

  const doc = await Enluminures.findOne({ REF: req.params.ref });
  if (doc) {
    return res.status(200).send(doc);
  }
  return res.status(404).send({ success: false, msg: "Document introuvable" });
});

// Create a new notice.
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
     /* 	
      #swagger.tags = ['Enluminures']
      #swagger.path = '/enluminures'
      #swagger.description = 'Création de la notice Enluminures' 
  */
    try {
      const notice = JSON.parse(req.body.notice);
      await determineProducteur(notice);
      if (!(await canCreateEnluminures(req.user, notice))) {
        return res
          .status(401)
          .send({ success: false, msg: "Autorisation nécessaire pour créer cette ressource." });
      }
      const promises = [];

      // Upload all files (should this be done after creating notice?)
      for (let i = 0; i < req.files.length; i++) {
        const path = `enluminures/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
        promises.push(uploadFile(path, req.files[i]));
      }
      // Transform and create.
      transformBeforeCreate(notice);
      await transformBeforeCreateAndUpdate(notice);
      //Modification des liens entre bases
      await populateLinksEnlunminures(notice, notice.RENV, "RENV");
      await populateLinksEnlunminures(notice, notice.REFDE, "REFC");
      await populateLinksEnlunminures(notice, notice.REFC, "REFDE");

      let oaiObj = {
        REF: notice.REF,
        BASE: "enluminures",
        DMAJ: notice.DMIS || moment(new Date()).format("YYYY-MM-DD")
      }
      const obj = new Enluminures(notice);
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


// Update a notice by ref
router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
     /* 	
      #swagger.tags = ['Enluminures']
      #swagger.path = '/enluminures/{ref}'
      #swagger.description = 'Modification de la notice Enluminures' 
    */
    const ref = req.params.ref;
    const notice = JSON.parse(req.body.notice);
    try {
      const updateMode = req.body.updateMode;
      const user = req.user;
      const prevNotice = await Enluminures.findOne({ REF: ref });
      await determineProducteur(notice);
      if (!await canUpdateEnluminures(req.user, prevNotice, notice)) {
        return res.status(401).send({
          success: false,
          msg: "Autorisation nécessaire pour mettre à jour cette ressource."
        });
      }
      const promises = [];

      // Delete previous images if not present anymore (only if the actually is an VIDEO field).
      if (notice.VIDEO !== undefined) {
        for (let i = 0; i < prevNotice.VIDEO.length; i++) {
          if (!(notice.VIDEO || []).includes(prevNotice.VIDEO[i])) {
            // Security: no need to escape filename, it comes from database.
            if (prevNotice.VIDEO[i]) {
              promises.push(deleteFile(prevNotice.VIDEO[i], "enluminures"));
            }
          }
        }
      }
      // Upload all files.
      for (let i = 0; i < req.files.length; i++) {
        const f = req.files[i];
        const path = `enluminures/${filenamify(notice.REF)}/${filenamify(f.originalname)}`;
        promises.push(uploadFile(path, f));
      }

      // Mise en place pour corriger les notices qui ont été importées manuellement
      if(!notice.POP_IMPORT){
        notice.POP_IMPORT = [];
      }

      // Update IMPORT ID
      if (notice.POP_IMPORT.length) {
        const id = notice.POP_IMPORT[0];
        delete notice.POP_IMPORT;
        notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
      }

      const timeZone = 'Europe/Paris';
      //Ajout de l'historique de la notice
      var today = moment.tz(new Date(),timeZone).format('YYYY-MM-DD HH:mm');
      
      let HISTORIQUE = prevNotice.HISTORIQUE || [];
      const newHistorique = {nom: user.nom, prenom: user.prenom, email: user.email, date: today, updateMode: updateMode};

      HISTORIQUE.push(newHistorique);
      notice.HISTORIQUE = HISTORIQUE;
      // Prepare and update notice.
      await transformBeforeCreateAndUpdate(notice);
      const obj = new Enluminures(notice);
      let oaiObj = { DMAJ: notice.DMAJ }
      checkESIndex(obj);
      promises.push(updateNotice(Enluminures, ref, notice));
      promises.push(updateOaiNotice(NoticesOAI, ref, oaiObj));
      //Modification des liens entre bases
      await populateLinksEnlunminures(notice, notice.RENV, "RENV");
      await populateLinksEnlunminures(notice, notice.REFDE, "REFC");
      await populateLinksEnlunminures(notice, notice.REFC, "REFDE");
      
      // Consume promises and send sucessful result.
      await Promise.all(promises);
      res.status(200).send({ success: true, msg: "Notice mise à jour." });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, error: e });
    }
  }
);

// Delete one notice.
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  /* 	
     #swagger.tags = ['Enluminures']
     #swagger.path = '/enluminures/{ref}'
     #swagger.description = 'Suppression de la notice Enluminures' 
 */
 try {
   const ref = req.params.ref;
   const doc = await Enluminures.findOne({ REF: ref });
   const docOai = await NoticesOAI.findOne({ REF: ref });
   if (!doc) {
     return res.status(404).send({
       success: false,
       msg: `Impossible de trouver la notice enluminures ${ref} à supprimer.`
     });
   }
   if (!await canDeleteEnluminures(req.user, doc)) {
     return res
       .status(401)
       .send({ success: false, msg: "Autorisation nécessaire pour supprimer cette ressource." });
   }

   if(doc.RENV !== []){
    doc.RENV = [];
    await removeLinksEnluminures(doc.REF, "RENV");
   }

   if(doc.REFC !== []){
    doc.REFC = [];
    await removeLinksEnluminures(doc.REF,"REFC");
   }

   if(doc.REFDE !== []){
    doc.REFDE = [];
    await removeLinksEnluminures(doc.REF,"REFDE");
   }


   // remove all images and the document itself.
   await Promise.all([doc.VIDEO.filter(i => i).map(f => deleteFile(f, "enluminures")), doc.remove()]);
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
      let noticeProducteur
      noticeProducteur = await identifyProducteur("enluminures", notice.REF, "", "");
      if(noticeProducteur){
        notice.PRODUCTEUR = noticeProducteur;
      }
      else {
        notice.PRODUCTEUR = "Enluminures";
      }
      resolve();
    } catch (e) {
      capture(e);
      reject(e);
    }
  });
}

function removeLinksEnluminures(ref, fieldEnluminures){
  return new Promise(async (resolve, reject) => {
    try{
      const promises = [];
      const criteres = {};
      criteres[fieldEnluminures] = ref
      // Récupération des notices Enluminures qui sont liées à la notice en cours
      const noticesToPopulate = await Enluminures.find(criteres);

      for (let i = 0; i < noticesToPopulate.length; i++) {
        // Si la référence de la notice est absente de la liste mise à jour, la référence est supprimée
        noticesToPopulate[i][fieldEnluminures] = noticesToPopulate[i][fieldEnluminures].filter(e => e !== ref);
        promises.push(noticesToPopulate[i].save());
      }
      await Promise.all(promises);
      resolve();
    } catch(error){
      reject(error)
    }
  });
}

function populateLinksEnlunminures(notice, refList, fieldEnluminures) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!Array.isArray(refList)) {
        resolve();
        return;
      }
      const promises = [];
      const criteres = {};
      criteres[fieldEnluminures] = notice.REF
      // Récupération des notices Enluminures qui sont liées à la notice en cours
      const noticesToPopulate = await Enluminures.find(criteres);

      let list = [];
      switch(fieldEnluminures){
        case "RENV" : 
          list = notice.RENV;
          break;
        case "REFC" : 
          list = notice.REFDE;
          break;
        case "REFDE" : 
          list = notice.REFC;
          break;
      }

      for (let i = 0; i < noticesToPopulate.length; i++) {
        // Si la référence de la notice est absente de la liste mise à jour, la référence est supprimée
        if(!list.includes(noticesToPopulate[i].REF)){
          noticesToPopulate[i][fieldEnluminures] = noticesToPopulate[i][fieldEnluminures].filter(e => e !== notice.REF);
          promises.push(noticesToPopulate[i].save());
        }
      }

      for (let i = 0; i < list.length; i++) {
        if (!noticesToPopulate.find(e => e.REF === list[i])) {
          // Si la notice n'est pas encore liée
          const obj = await Enluminures.findOne({ REF: list[i] });
          if (obj && Array.isArray(obj[fieldEnluminures]) && !obj[fieldEnluminures].includes(notice.REF)) {
            obj[fieldEnluminures].push(notice.REF);
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
