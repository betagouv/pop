const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const filenamify = require("filenamify");
const validator = require("validator");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const Merimee = require("../models/merimee");
const Palissy = require("../models/palissy");
const Memoire = require("../models/memoire");
const Joconde = require("../models/joconde");
const Museo = require("../models/museo");
const NoticesOAI = require("../models/noticesOAI");
let moment = require('moment-timezone')
const { checkValidRef, removeChar } = require("./utils/notice");

const {
  formattedNow,
  checkESIndex,
  updateNotice,
  updateOaiNotice, 
  getBaseCompletName,
  lambertToWGS84,
  getPolygonCentroid,
  convertCOORM,
  isInFrance,
  getNewId,
  uploadFile,
  hasCorrectCoordinates,
  hasCorrectPolygon,
  findMerimeeProducteur,
  identifyProducteur
} = require("./utils");
const { capture } = require("./../sentry.js");
const passport = require("passport");
const { canUpdateMerimee, canCreateMerimee, canDeleteMerimee } = require("./utils/authorization");
const regions = require("./utils/regions");
const { getDepartement } = require("./utils/departments");

// Control properties document, flag each error.
async function withFlags(notice) {
  notice.POP_FLAGS = [];
  // Required properties.
  ["DOSS", "ETUD", "COPY", "TICO", "CONTACT", "REF"]
    .filter(prop => !notice[prop])
    .forEach(prop => notice.POP_FLAGS.push(`${prop}_EMPTY`));
  // If "existingProp" exists then "requiredProp" must not be empty.
  [["PROT", "DPRO"], ["COM", "WCOM"], ["ADRS", "WADRS"]]
    .filter(([existingProp, requiredProp]) => notice[existingProp] && !notice[requiredProp])
    .forEach(([existingProp, requiredProp]) =>
      notice.POP_FLAGS.push(`${existingProp}_REQUIRED_FOR_${requiredProp}`)
    );
  // DPT must be 2 char or more.
  if (notice.DPT && notice.DPT.length > 0) {
    notice.DPT.forEach( dpt => {
      if(dpt.length < 2 && !notice.POP_FLAGS.includes("DPT_LENGTH_2")){
        notice.POP_FLAGS.push("DPT_LENGTH_2");
      }
    });
  }
  // INSEE must be 5 char or more.
  if (notice.INSEE && notice.INSEE.length > 0) {
    notice.INSEE.forEach( insee => {
      if(insee.length < 5 && !notice.POP_FLAGS.includes("INSEE_LENGTH_5")){
        notice.POP_FLAGS.push("INSEE_LENGTH_5");
      }
    });
  }
  // INSEE & DPT must start with the same first 2 letters.
  if (notice.INSEE && notice.DPT && notice.INSEE[0].substring(0, 2) !== notice.DPT[0].substring(0, 2)) {
    notice.POP_FLAGS.push("INSEE_DPT_MATCH_FAIL");
  }
  // REF must be an Alphanumeric.
  if (!validator.isAlphanumeric(notice.REF)) {
    notice.POP_FLAGS.push("REF_INVALID_ALNUM");
  }
  // DOSURL and DOSURLPDF must be valid URLs.
  ["DOSURL", "DOSURLPDF"]
    .filter(prop => notice[prop] && !validator.isURL(notice[prop]))
    .forEach(prop => notice.POP_FLAGS.push(`${prop}_INVALID_URL`));
  // CONTACT must be an email.
  if (notice.CONTACT && !validator.isEmail(notice.CONTACT)) {
    notice.POP_FLAGS.push("CONTACT_INVALID_EMAIL");
  }
  // Region should exist.
  if (Array.isArray(notice.REG) && notice.REG.length > 0 ) {
    for(let i=0; i<notice.REG.length; i++){
      if(!regions.includes(notice.REG[i])){
        notice.POP_FLAGS.push("REG_INVALID");
      } 
    }
  }
  // Reference not found (RENV, REFP, REFE)
  // Reference not found RENV
  if (notice.RENV) {
    for (let i = 0; i < notice.RENV.length; i++) {
      if (!(await Merimee.exists({ REF: notice.RENV[i] }))) {
        notice.POP_FLAGS.push("RENV_REF_NOT_FOUND");
      }
    }
  }
  // Reference not found REFP
  if (notice.REFP) {
    for (let i = 0; i < notice.REFP.length; i++) {
      if (!(await Merimee.exists({ REF: notice.REFP[i] }))) {
        notice.POP_FLAGS.push("REFP_REF_NOT_FOUND");
      }
    }
  }
  // Reference not found REFE
  if (notice.REFE) {
    for (let i = 0; i < notice.REFE.length; i++) {
      if (!(await Merimee.exists({ REF: notice.REFE[i] }))) {
        notice.POP_FLAGS.push("REFE_REF_NOT_FOUND");
      }
    }
  }
  //Coorm not in France
  if(notice.COORM && notice.ZONE){
    const convert = convertCOORM(notice.COORM, notice.ZONE);
    if(convert.message && convert.message == "La projection utilisée n'est pas correct"){
      notice.POP_FLAGS.push("COORM_NOT_IN_FRANCE");
    }
  }

  //Coor not in France
  if(notice.COOR && notice.ZONE){
    const convert = convertCOORM(notice.COOR, notice.ZONE);
    if(convert.message && convert.message == "La projection utilisée n'est pas correct"){
      notice.POP_FLAGS.push("COOR_NOT_IN_FRANCE");
    }
  }

  //Test if coordinates in France
  if(notice.POP_COORDONNEES && notice.POP_COORDONNEES.lat && notice.POP_COORDONNEES.lon){
    if(!isInFrance(notice.POP_COORDONNEES.lat, notice.POP_COORDONNEES.lon)){
      notice.POP_FLAGS.push("POP_COORDONNEES_NOT_IN_FRANCE");
    }
  }

  //Check link refs
  notice.POP_FLAGS = await checkValidRef(notice.REFJOC, Joconde, notice.POP_FLAGS, "REFJOC");
  notice.POP_FLAGS = await checkValidRef(notice.REFMUS, Museo, notice.POP_FLAGS, "REFMUS");
  
  return notice;
}
async function transformBeforeCreateOrUpdate(notice) {
  notice.CONTIENT_IMAGE = notice.MEMOIRE && notice.MEMOIRE.some(e => e.url) ? "oui" : "non";
  let coordinates;

  // IF POLYGON IN LAMBERT, We convert it to a polygon in WGS84
  if (notice.COORM && notice.ZONE) {
    // Convert it to a proper format in WGS84
    coordinates = (convertCOORM(notice.COORM, notice.ZONE)).coordinates;
    notice["POP_COORDINATES_POLYGON"] = { type: "Polygon", coordinates };
  }
  
  if (notice.DPT && notice.DPT.length > 0) {
    notice.DPT_LETTRE = notice.DPT.map( dpt => getDepartement(dpt)).filter(el => el !== "");
  } else {
    notice.DPT_LETTRE = [];
  }

  //If COOR in Lambert and not correct coordinates, convert this to WGS84.
  if (notice.COOR && notice.ZONE && !hasCorrectCoordinates(notice)) {
    notice.POP_COORDONNEES = lambertToWGS84(notice.COOR, notice.ZONE);
  }
  //If no correct coordinates, get polygon centroid.
  if (hasCorrectPolygon(notice) && !hasCorrectCoordinates(notice)) {
    const centroid = getPolygonCentroid(coordinates);
    if (centroid && centroid.length == 2) {
      notice.POP_COORDONNEES = { lat: centroid[0], lon: centroid[1] };
    }
  }
  // To prevent crash on ES
  if (!notice.POP_COORDONNEES && !hasCorrectCoordinates(notice)) {
    notice.POP_COORDONNEES = { lat: 0, lon: 0 };
  }
  notice.POP_CONTIENT_GEOLOCALISATION = hasCorrectCoordinates(notice) ? "oui" : "non";
  notice = await withFlags(notice);
}

async function transformBeforeUpdate(notice) {
  notice.DMAJ = formattedNow();
  await transformBeforeCreateOrUpdate(notice);
}

async function transformBeforeCreate(notice) {
  notice.DMAJ = notice.DMIS = formattedNow();
  await transformBeforeCreateOrUpdate(notice);
}

function checkIfMemoireImageExist(notice) {
  return new Promise(async (resolve, reject) => {
    try {
      // Here, we update the images and we keep the order ( !! important )
      const NoticesMemoire = await Memoire.find({ LBASE: notice.REF });
      const arr = NoticesMemoire.map(e => {
        const NAME = e.TICO || e.LEG || `${e.EDIF || ""} ${e.OBJ || ""}`.trim();
        return { ref: e.REF, url: e.IMG, copy: e.COPY, name: NAME, marq: e.MARQ };
      });

      const newArr = (notice.MEMOIRE || []).filter(e => arr.find(f => f.ref == e.ref));
      for (let i = 0; i < arr.length; i++) {
        if (!newArr.find(e => e.REF === arr[i].REF)) {
          newArr.push(arr[i]);
        }
      }
      resolve(newArr);
    } catch (e) {
      capture(e);
      reject(e);
    }
  });
}

function populateREFO(notice) {
  return new Promise(async (resolve, _reject) => {
    const objs = await Palissy.find({ REFA: notice.REF });
    const REFO = objs.map(e => e.REF);
    resolve(REFO);
  });
}

// Generate new ID from notice information (department + prefix)
router.get("/newId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  /* 	
    #swagger.tags = ['Mérimée']
    #swagger.path = '/merimee/newId'
    #swagger.description = 'Retourne la nouvelle référence' 
  */
  try {
    const prefix = req.query.prefix;
    const dpt = req.query.dpt;

    if (!prefix || !dpt) {
      return res.status(500).send({ error: "dpt ou prefix manquants" });
    }
    const id = await getNewId(Merimee, prefix, dpt);
    return res.status(200).send({ success: true, id });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

// Update a notice by ref.
router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    /* 	
      #swagger.tags = ['Mérimée']
      #swagger.path = '/merimee/{ref}'
      #swagger.description = 'Modification de la notice Mérimée' 
    */
    try {
      const ref = req.params.ref;
      const notice = JSON.parse(req.body.notice);
      const updateMode = req.body.updateMode;
      const user = req.user;
      await determineProducteur(notice);
      const prevNotice = await Merimee.findOne({ REF: ref });
      if (!await canUpdateMerimee(req.user, prevNotice, notice)) {
        return res.status(401).send({
          success: false,
          msg: "Autorisation nécessaire pour mettre à jour cette ressource."
        });
      }

      if(typeof notice.DESC !== "undefined"){
        notice.DESC = removeChar(notice.DESC);
      }

      if(typeof notice.HIST !== "undefined"){
        notice.HIST = removeChar(notice.HIST);
      }

      if(typeof notice.MEMOIRE === "undefined"){
        // Maintient des notices MEMOIRE précédemment rattachées.
        notice.MEMOIRE = prevNotice.MEMOIRE;
      }
      
      if (notice.MEMOIRE) {
        notice.MEMOIRE = await checkIfMemoireImageExist(notice);
      }
      notice.REFO = await populateREFO(notice);

      // Update IMPORT ID (this code is unclear…)
      if (notice.POP_IMPORT.length) {
        const id = notice.POP_IMPORT[0];
        delete notice.POP_IMPORT;
        notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
      }

      const promises = [];
      for (let i = 0; i < req.files.length; i++) {
        const path = `merimee/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
        promises.push(uploadFile(path, req.files[i]));
      }

      // Prepare and update notice.
      await transformBeforeUpdate(notice);

      const timeZone = 'Europe/Paris';
      //Ajout de l'historique de la notice
      var today = moment.tz(new Date(),timeZone).format('YYYY-MM-DD HH:mm');
      
      let HISTORIQUE = prevNotice.HISTORIQUE || [];
      const newHistorique = {nom: user.nom, prenom: user.prenom, email: user.email, date: today, updateMode: updateMode};

      HISTORIQUE.push(newHistorique);
      notice.HISTORIQUE = HISTORIQUE;

      //Modification liens entre bases
     
      await populateBaseFromMerimee(notice, notice.REFJOC, Joconde);
      await populateBaseFromMerimee(notice, notice.REFMUS, Museo);

      const doc = new Merimee(notice);
      let oaiObj = { DMAJ: notice.DMAJ }

      checkESIndex(doc);
      promises.push(updateNotice(Merimee, ref, notice));
      promises.push(updateOaiNotice(NoticesOAI, ref, oaiObj));
      await Promise.all(promises);
    
      res.status(200).send({ success: true, msg: "OK" });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, msg: JSON.stringify(e) });
    }
  }
);

// Create a new notice.
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    /* 	
      #swagger.tags = ['Mérimée']
      #swagger.path = '/merimee'
      #swagger.description = 'Création de la notice Mérimée' 
    */
    try {
      const notice = JSON.parse(req.body.notice);
      await determineProducteur(notice);
      if (!await canCreateMerimee(req.user, notice)) {
        return res
          .status(401)
          .send({ success: false, msg: "Autorisation nécessaire pour créer cette ressource." });
      }
      notice.MEMOIRE = await checkIfMemoireImageExist(notice);
      notice.REFO = await populateREFO(notice);
      await transformBeforeCreate(notice);
      //Modification liens entre bases
      await populateBaseFromMerimee(notice, notice.REFJOC, Joconde);
      await populateBaseFromMerimee(notice, notice.REFMUS, Museo);
      let oaiObj = {
        REF: notice.REF,
        BASE: "merimee",
        DMAJ: notice.DMIS || moment(new Date()).format("YYYY-MM-DD")
      }

      const promises = [];
      const doc = new Merimee(notice);
      const obj2 = new NoticesOAI(oaiObj)
      checkESIndex(doc);
      promises.push(doc.save());
      promises.push(obj2.save());
      for (let i = 0; i < req.files.length; i++) {
        const path = `merimee/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
        promises.push(uploadFile(path, req.files[i]));
      }
      await Promise.all(promises);
      res.status(200).send({ success: true, msg: "OK" });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, msg: JSON.stringify(e) });
    }
  }
);

// Get one notice by ref.
router.get("/:ref", async (req, res) => {
  /* 	
      #swagger.tags = ['Mérimée']
      #swagger.path = '/merimee/{ref}'
      #swagger.description = 'Retourne les informations de la notice Mérimée' 
      #swagger.parameters['ref'] = { 
        in: 'path', 
        description: 'Référence de la notice Mérimée',
        type: 'string' 
      }
      #swagger.responses[200] = { 
        schema: { 
          "$ref": '#/definitions/GetMerimee'
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
  const ref = req.params.ref;
  const notice = await Merimee.findOne({ REF: ref });
  if (notice) {
    return res.status(200).send(notice);
  }
  return res.status(404).send({ success: false, msg: "Notice introuvable." });
});

// Delete one notice.
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  /* 	
    #swagger.tags = ['Mérimée']
    #swagger.path = '/merimee/{ref}'
    #swagger.description = 'Suppression de la notice Mérimée' 
  */
  try {
    const ref = req.params.ref;
    const doc = await Merimee.findOne({ REF: ref });
    const docOai = await NoticesOAI.findOne({ REF: ref });

    if (!doc) {
      return res.status(404).send({
        success: false,
        msg: `Impossible de trouver la notice merimee ${ref} à supprimer.`
      });
    }
    if (!await canDeleteMerimee(req.user, doc)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour supprimer cette ressource." });
    }
    await doc.remove();
    await docOai.remove();
    return res.status(200).send({ success: true, msg: "La notice à été supprimée." });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

function determineProducteur(notice) {
  return new Promise(async (resolve, reject) => {
    try {
      let noticeProducteur = await identifyProducteur("merimee", notice.REF, "", "");
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

function populateBaseFromMerimee(notice, refList, baseToPopulate) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!Array.isArray(refList)) {
        resolve();
        return;
      }
      const promises = [];
      const noticesToPopulate = await baseToPopulate.find({ REFMER: notice.REF });

      for (let i = 0; i < noticesToPopulate.length; i++) {
        // If the object is removed from notice, then remove it from palissy
        if(!refList.includes(noticesToPopulate[i].REF)){
          noticesToPopulate[i].REFMER = noticesToPopulate[i].REFMER.filter(e => e !== notice.REF);
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
          if (obj && Array.isArray(obj.REFMER) && !obj.REFMER.includes(notice.REF)) {
            obj.REFMER.push(notice.REF);
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
