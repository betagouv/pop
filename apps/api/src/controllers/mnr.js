const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const filenamify = require("filenamify");
const upload = multer({ dest: "uploads/" });
const passport = require("passport");
const { capture } = require("./../sentry.js");
const Mnr = require("../models/mnr");
const NoticesOAI = require("../models/noticesOAI");
let moment = require('moment-timezone')

const { uploadFile, deleteFile, formattedNow, checkESIndex, updateNotice, updateOaiNotice, getBaseCompletName, identifyProducteur } = require("./utils");
const { canUpdateMnr, canCreateMnr, canDeleteMnr } = require("./utils/authorization");

const router = express.Router();

async function withFlags(notice) {
  notice.POP_FLAGS = [];

  // Reference not found RENV
  if (notice.RENV) {
    for (let i = 0; i < notice.RENV.length; i++) {
      if (!(await Mnr.exists({ REF: notice.RENV[i] }))) {
        notice.POP_FLAGS.push("RENV_REF_NOT_FOUND");
      }
    }
  }
  
  return notice;
}

async function transformBeforeUpdate(notice) {
  notice.DMAJ = formattedNow();
  if (notice.VIDEO !== undefined) {
    notice.CONTIENT_IMAGE = notice.VIDEO && notice.VIDEO.length ? "oui" : "non";
  }
  notice = await withFlags(notice);
}

async function transformBeforeCreate(notice) {
  notice.DMAJ = notice.DMIS = formattedNow();
  notice.CONTIENT_IMAGE = notice.VIDEO && notice.VIDEO.length ? "oui" : "non";
  notice = await withFlags(notice);
}
/*
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
*/

// Update a notice by ref.
router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
     /* 	
    #swagger.tags = ['Mnr']
    #swagger.path = '/mnr/{ref}'
    #swagger.description = 'Modification de la notice Mnr' 
  */
    const ref = req.params.ref;
    const notice = JSON.parse(req.body.notice);
    const updateMode = req.body.updateMode;
    const user = req.user;

    try {
      const prevNotice = await Mnr.findOne({ REF: ref });
      await determineProducteur(notice);

      if (!await canUpdateMnr(req.user, prevNotice, notice)) {
        return res.status(401).send({
          success: false,
          msg: "Autorisation nécessaire pour mettre à jour cette ressource."
        });
      }
      const promises = [];

      if (notice.VIDEO !== undefined) {
        for (let i = 0; i < prevNotice.VIDEO.length; i++) {
          if (!(notice.VIDEO || []).includes(prevNotice.VIDEO[i])) {
            promises.push(deleteFile(prevNotice.VIDEO[i], "mnr"));
          }
        }
      }

      for (let i = 0; i < req.files.length; i++) {
        const f = req.files[i];
        promises.push(uploadFile(`mnr/${filenamify(notice.REF)}/${filenamify(f.originalname)}`, f));
      }

      // Update IMPORT ID
      if (notice.POP_IMPORT.length) {
        const id = notice.POP_IMPORT[0];
        delete notice.POP_IMPORT;
        notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
      }

      await transformBeforeUpdate(notice);

      //Ajout de l'historique de la notice
      var today = new Date(Date.now());
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes();
      var dateTime = date+' '+time;
      
      let HISTORIQUE = notice.HISTORIQUE || [];
      const newHistorique = {nom: user.nom, prenom: user.prenom, email: user.email, date: dateTime, updateMode: updateMode};

      HISTORIQUE.push(newHistorique);
      notice.HISTORIQUE = HISTORIQUE;

      const doc = new Mnr(notice);
      let oaiObj = { DMAJ: notice.DMAJ }
      checkESIndex(doc);
      promises.push(updateNotice(Mnr, ref, notice));
      promises.push(updateOaiNotice(NoticesOAI, ref, oaiObj));
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
  /* 	
    #swagger.tags = ['Mnr']
    #swagger.path = '/mnr'
    #swagger.description = 'Création de la notice Mnr' 
  */
    const notice = JSON.parse(req.body.notice);
    await determineProducteur(notice);
    await transformBeforeCreate(notice);
    if (!await canCreateMnr(req.user, notice)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour créer cette ressource." });
    }
    try {
      let oaiObj = {
        REF: notice.REF,
        BASE: "mnr",
        DMAJ: notice.DMIS || moment(new Date()).format("YYYY-MM-DD")
      }
      const doc = new Mnr(notice);
      const obj2 = new NoticesOAI(oaiObj)

      checkESIndex(doc);
      await doc.save();
      await obj2.save();

      res.send({ success: true, msg: "OK" });
    } catch (error) {
      capture(error);
      res.status(500).send({ success: false, error });
    }
  }
);

// Get one notice by ref.
router.get("/:ref", async (req, res) => {
  /* 	
    #swagger.tags = ['Mnr']

    #swagger.description = 'Retourne les informations de la notice Mnr' 
    #swagger.parameters['ref'] = { 
      in: 'path', 
      description: 'Référence de la notice Mnr',
      type: 'string' 
    }
    #swagger.responses[200] = { 
      schema: { 
        "$ref": '#/definitions/GetMnr'
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
  const notice = await Mnr.findOne({ REF: ref });
  if (notice) {
    return res.status(200).send(notice);
  }
  return res.status(404).send({ success: false, msg: "Notice introuvable." });
});

// Delete
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
   /* 	
    #swagger.tags = ['Mnr']
    #swagger.path = '/mnr/{ref}'
    #swagger.description = 'Suppression de la notice Mnr' 
  */
  try {
    const ref = req.params.ref;
    const doc = await Mnr.findOne({ REF: ref });
    const docOai = await NoticesOAI.findOne({ REF: ref });

    if (!doc) {
      return res.status(404).send({
        success: false,
        msg: `Impossible de trouver la notice mnr ${ref} à supprimer.`
      });
    }
    if (!await canDeleteMnr(req.user, doc)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour supprimer cette ressource." });
    }
    const promises = doc.VIDEO.map(f => deleteFile(f, "mnr"));
    promises.push(doc.remove());
    promises.push(docOai.remove());
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
      let noticeProducteur = await identifyProducteur("mnr", notice.REF, "", "");
      if(noticeProducteur){
        notice.PRODUCTEUR = noticeProducteur;
      }
      else {
        notice.PRODUCTEUR = "MNR";
      }
      resolve();
    } catch (e) {
      capture(e);
      reject(e);
    }
  });
}

module.exports = router;
