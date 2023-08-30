const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mongoose = require("mongoose");
const filenamify = require("filenamify");
const passport = require("passport");
const validator = require("validator");
const NoticesOAI = require("../models/noticesOAI");
const Memoire = require("../models/memoire");
const Merimee = require("../models/merimee");
const Palissy = require("../models/palissy");
const Autor = require("../models/autor");
const Joconde = require("../models/joconde");
const Museo = require("../models/museo");
const Producteur = require("../models/producteur");
let moment = require('moment-timezone')
const { checkValidRef } = require("./utils/notice");
const { cleanArrayValue } = require("./utils/dataFilter");

const {
  uploadFile,
  formattedNow,
  checkESIndex,
  updateNotice,
  updateOaiNotice,
  deleteFile,
  findMemoireProducteur,
  identifyProducteur,
  fileAuthorized
} = require("./utils");
const { canUpdateMemoire, canCreateMemoire, canDeleteMemoire } = require("./utils/authorization");
const { capture } = require("./../sentry.js");
const regions = require("./utils/regions");
const { getDepartement } = require("./utils/departments");

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

  // M45079 - Ajout vérification sur le champ REG
  // M45867 - Ajout condition sur le contrôle des régions, si le champ PAYS contient uniquement france la vérification est effectué sinon pas de vérification
  if (Array.isArray(notice.PAYS) && notice.PAYS.length < 2 && String(notice.PAYS[0]).toLowerCase() === "france" 
       && Array.isArray(notice.REG) && notice.REG.length > 0 ) {
    for(let i=0; i<notice.REG.length; i++){
      if(!regions.includes(notice.REG[i])){
        notice.POP_FLAGS.push("REG_INVALID");
      } 
    }
  }

  //Check refs
  notice.POP_FLAGS = await checkValidRef(notice.REFJOC, Joconde, notice.POP_FLAGS, "REFJOC");
  notice.POP_FLAGS = await checkValidRef(notice.REFMUS, Museo, notice.POP_FLAGS, "REFMUS");
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
  await transformBeforeCreateOrUpdate(notice);
  notice = await withFlags(notice);
}

async function transformBeforeCreate(notice) {
  notice.CONTIENT_IMAGE = notice.IMG ? "oui" : "non";
  notice.DMAJ = notice.DMIS = formattedNow();
  await transformBeforeCreateOrUpdate(notice);
  notice = await withFlags(notice);
}

async function transformBeforeCreateOrUpdate(notice) {
  if (notice.DPT && notice.DPT.length > 0) {
    notice.DPT_LETTRE = notice.DPT.map( dpt => getDepartement(dpt)).filter(el => el !== "");
  } else {
    notice.DPT_LETTRE = [];
  }
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

async function updateMemoireImageForNotice(notice, REF, IMG = "", COPY = "", NAME = "", MARQ = "") {
  const MEMOIRE = notice.MEMOIRE;
  let index = MEMOIRE.findIndex(e => e.ref === REF);
  if (index !== -1) {
    // update if needed only
    if (
      MEMOIRE[index].url === IMG &&
      MEMOIRE[index].copy === COPY &&
      MEMOIRE[index].name === NAME &&
      MEMOIRE[index].marq === MARQ
    ) {
      return;
    }
    MEMOIRE[index] = { ref: REF, url: IMG, copy: COPY, name: NAME, marq: MARQ }; // create
  } else {
    MEMOIRE.push({ ref: REF, url: IMG, copy: COPY, name: NAME, marq: MARQ });
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
    const NAME = (notice.LEG ? notice.LEG : (noticeMemoire? noticeMemoire.LEG : "")) 
                  || (notice.TICO ? notice.TICO : (noticeMemoire? noticeMemoire.TICO : "")) 
                  || `${notice.EDIF || ""} ${notice.OBJ || ""}`.trim();
    let LBASE = notice.LBASE || [];
    let MARQ = notice.MARQ ? notice.MARQ : (noticeMemoire? noticeMemoire.MARQ : "");

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
        promises.push(updateMemoireImageForNotice(linkedNotices[i], REF, IMG, COPY, NAME, MARQ));
      }
    }

    for (let i = 0; i < toAdd.length; i++) {
      const collection = await findCollection(toAdd[i]);
      if (collection) {
        const doc = await collection.findOne({ REF: toAdd[i] });
        if (doc) {
          promises.push(updateMemoireImageForNotice(doc, REF, IMG, COPY, NAME, MARQ));
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
    /* 	
      #swagger.tags = ['Mémoire']
      #swagger.path = '/memoire/{ref}'
      #swagger.description = 'Modification de la notice Mémoire' 
    */
    const ref = req.params.ref;
    const notice = JSON.parse(req.body.notice);
    //On récupère la notice existante pour alimenter les champs IDPROD et EMET s'ils ne sont pas précisés dans le fichier d'import
    const prevNotice = await Memoire.findOne({ REF: ref });
    if(notice.IDPROD==null && prevNotice!= null && prevNotice.IDPROD != null){
      notice.IDPROD = prevNotice.IDPROD;
    }
    if(notice.EMET==null && prevNotice!= null && prevNotice.EMET != null){
      notice.EMET = prevNotice.EMET;
    }
    // M43272 - Récupération de la valeur du champ DPT si celle-ci n'est pas renseignée à l'import
    // -> écrasement de la valeur de DPT_LETTRE si non repris
    if(notice.DPT==null && prevNotice!= null && prevNotice.DPT != null){
       notice.DPT = prevNotice.DPT;
    }
    //LBASE pour le ticket 43611 Mantis
    if(notice.LBASE==null && prevNotice!= null && prevNotice.LBASE != null){
      notice.LBASE = prevNotice.LBASE;
    }

    // M44947 - Problème de récupération IMG lors d'un import
    if(undefined === notice.IMG  && prevNotice.IMG){
      notice.IMG = prevNotice.IMG;

      if(undefined === notice.REFIMG && prevNotice.REFIMG) {
        notice.REFIMG = prevNotice.REFIMG;
      }
    }

    const user = req.user;
    await determineProducteur(notice);
    if (!await canUpdateMemoire(req.user, prevNotice, notice)) {
      return res.status(401).send({
        success: false,
        msg: "Autorisation nécessaire pour mettre à jour cette ressource."
      });
    }

    const promises = [];
    const updateMode = req.body.updateMode;

    // M45229 - Suppression de l'image via l'application production
    if("manuel" === updateMode)  {
      if('' === notice.IMG) {
        // Suppression de l'image sur le bucket S3
        promises.push(deleteFile(prevNotice.IMG, "memoire"));
      }
    }

    try {
       // Upload files.
      for (let i = 0; i < req.files.length; i++) {
        const f = req.files[i];
        if(!fileAuthorized.includes(f.mimetype)){
          throw new Error("le type fichier n'est pas accepté")      
        }
        const path = `memoire/${filenamify(notice.REF)}/${filenamify(f.originalname)}`;
        promises.push(uploadFile(path, f));
      }
    } catch (e) {
      capture(e);
      res.status(403).send({ success: false, error: e });
    }

   
    // Update IMPORT ID.
    if (notice.POP_IMPORT && notice.POP_IMPORT.length) {
      const id = notice.POP_IMPORT[0];
      delete notice.POP_IMPORT;
      notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
    }
    await transformBeforeUpdate(notice);

    const timeZone = 'Europe/Paris';
    //Ajout de l'historique de la notice
    var today = moment.tz(new Date(),timeZone).format('YYYY-MM-DD HH:mm');
  
    let HISTORIQUE = prevNotice.HISTORIQUE || [];
    const newHistorique = {nom: user.nom, prenom: user.prenom, email: user.email, date: today, updateMode: updateMode};

    HISTORIQUE.push(newHistorique);
    notice.HISTORIQUE = HISTORIQUE;
    //Modification des liens entre bases
    await populateBaseFromMemoire(notice, notice.REFJOC, Joconde);
    await populateBaseFromMemoire(notice, notice.REFMUS, Museo);

    // Suppression des valeurs vident pour les champs multivalues
    cleanArrayValue(notice);

    const obj = new Memoire(notice)
    let oaiObj = { DMAJ: notice.DMAJ }
    checkESIndex(obj)

    try {
      await updateNotice(Memoire, ref, notice)
      await updateOaiNotice(NoticesOAI, ref, oaiObj)
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
    /* 	
      #swagger.tags = ['Mémoire']
      #swagger.path = '/memoire'
      #swagger.description = 'Création de la notice Mémoire' 
  */
    const notice = JSON.parse(req.body.notice);
    notice.DMIS = notice.DMAJ = formattedNow();
    await determineProducteur(notice);
    if (!await canCreateMemoire(req.user, notice)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour créer cette ressource." });
    }
    const promises = [];

    try {
      // Upload images.
      for (let i = 0; i < req.files.length; i++) {
        const f = req.files[i];
        if(!fileAuthorized.includes(f.mimetype)){
          throw new Error("le type fichier n'est pas accepté")      
        }
        const path = `memoire/${filenamify(notice.REF)}/${filenamify(f.originalname)}`;
        promises.push(uploadFile(path, f));
      }
   } catch (e) {
     capture(e);
     res.status(403).send({ success: false, error: e });
   }

    // Update and save.
    promises.push(updateLinks(notice));
    await transformBeforeCreate(notice);
    //Modification des liens entre bases
    await populateBaseFromMemoire(notice, notice.REFJOC, Joconde);
    await populateBaseFromMemoire(notice, notice.REFMUS, Museo);
    let oaiObj = {
      REF: notice.REF,
      BASE: "memoire",
      DMAJ: notice.DMIS || moment(new Date()).format("YYYY-MM-DD")
    }

    // Suppression des valeurs vident pour les champs multivalues
    cleanArrayValue(notice);

    const obj = new Memoire(notice);
    const obj2 = new NoticesOAI(oaiObj)
    checkESIndex(obj);
    promises.push(obj.save());
    promises.push(obj2.save());
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
  /* 	
      #swagger.tags = ['Mémoire']
      #swagger.path = '/memoire/{ref}'
      #swagger.description = 'Retourne les informations de la notice Mémoire' 
      #swagger.parameters['ref'] = { 
        in: 'path', 
        description: 'Référence de la notice Mémoire',
        type: 'string' 
      }
      #swagger.responses[200] = { 
        schema: { 
          "$ref": '#/definitions/GetMemoire'
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
  const notice = await Memoire.findOne({ REF: ref });
  if (notice) {
    return res.status(200).send(notice);
  }
  return res.status(404).send({ success: false, msg: "Notice introuvable." });
});

// Delete one notice.
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  /* 	
      #swagger.tags = ['Mémoire']
      #swagger.path = '/memoire/{ref}'
      #swagger.description = 'Suppression de la notice Mémoire' 
  */
  try {
    const ref = req.params.ref;
    const doc = await Memoire.findOne({ REF: ref });
    const docOai = await NoticesOAI.findOne({ REF: ref });

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
    promises.push([docOai.remove()]);

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

async function determineProducteur(notice) {
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
