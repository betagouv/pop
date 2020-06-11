const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Autor = require("../models/autor");
const NoticesOAI = require("../models/noticesOAI");
const passport = require("passport");
const { formattedNow, updateNotice, updateOaiNotice, getBaseCompletName } = require("./utils");
const { canUpdateAutor, canCreateAutor, canDeleteAutor } = require("./utils/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { checkESIndex, identifyProducteur } = require("../controllers/utils");

router.get("/:ref", async (req, res) => {
  const autor = await Autor.findOne({ REF: req.params.ref });
  if (autor) {
    return res.status(200).send(autor);
  }
  return res.status(404).send({ success: false, msg: "Document introuvable" });
});

// PUT for IMPORT
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    const notices = JSON.parse(req.body.autorNotices);
    var promises = [];

    try {
      const updateMode = req.body.updateMode;
      let user = req.user
      for(let i=0; i<notices.length; i++){
        var e = notices[i];
        const ref = e.notice.REF;
        const prevNotice = await Autor.findOne({ REF: ref });
        await determineProducteur(e.notice);
        const canUpdate = await canUpdateAutor(user, prevNotice, e.notice);

        if (!canUpdate) {
          return res.status(401).send({
            success: false,
            msg: "Autorisation nécessaire pour mettre à jour ces notices"
          });
        }
        else{
          // Prepare and update notice.
          await transformBeforeCreateAndUpdate(e.notice, prevNotice);
          let oaiObj = { DMAJ: e.notice.DMAJ}

          //Ajout de l'historique de la notice
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes();
          var dateTime = date+' '+time;
          
          let HISTORIQUE = notice.HISTORIQUE || [];
          const newHistorique = {nom: user.nom, prenom: user.prenom, email: user.email, date: dateTime, updateMode: updateMode};

          HISTORIQUE.push(newHistorique);
          notice.HISTORIQUE = HISTORIQUE;
          
          var obj = new Autor(e.notice);   
          checkESIndex(obj);
          promises.push(updateNotice(Autor, ref, e.notice));
          promises.push(updateOaiNotice(NoticesOAI, ref, oaiObj));

        }
      }
      // Consume promises and send sucessfull result.
      await Promise.all(promises);
      res.status(200).send({ success: true, msg: "Notices mise à jour." });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, error: e });
    }
  }
);

// PUT for UPDATE
router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    const ref = req.params.ref;

    const notice = JSON.parse(req.body.notice);

    try {
      const prevNotice = await Autor.findOne({ REF: ref });
      if (!canUpdateAutor(req.user, prevNotice, notice)) {
        return res.status(401).send({
          success: false,
          msg: "Autorisation nécessaire pour mettre à jour cette ressource."
        });
      }
      const promises = [];

      // Prepare and update notice.
      await transformBeforeCreateAndUpdate(notice);
      await determineProducteur(notice);
      let oaiObj = { DMAJ: notice.DMAJ}
      const obj = new Autor(notice);
      
      checkESIndex(obj);
      promises.push(updateNotice(Autor, ref, notice));
      promises.push(updateOaiNotice(NoticesOAI, ref, oaiObj));


      // Consume promises and send sucessful result.
      await Promise.all(promises);
      res.status(200).send({ success: true, msg: "Notice mise à jour." });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, error: e });
    }
  })

// Create a new notice.
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    const notices = JSON.parse(req.body.autorNotices);
    let promises = [];
    for(let i=0; i<notices.length; i++){
      var e = notices[i];
      // Clean object.
      for (let propName in e.notice) {
        if (!e.notice[propName]) {
          delete e.notice[propName];
         }
      }
  
      e.notice.DMIS = formattedNow();
      let oaiObj = {
        REF: e.notice.REF,
        BASE: getBaseCompletName(e.notice.BASE),
        DMAJ: e.notice.DMIS
      }
      await determineProducteur(e.notice);
      await transformBeforeCreateAndUpdate(e.notice, null);
      if (!canCreateAutor(req.user, e.notice)) {
        return res
          .status(401)
          .send({ success: false, msg: "Autorisation nécessaire pour créer cette ressource." });
      }
      var obj = new Autor(e.notice);
      var obj2 = new NoticesOAI(oaiObj)
      checkESIndex(obj);
      promises.push(obj.save());
      promises.push(obj2.save());
    }
      try {
        await Promise.all(promises);
        res.send({ success: true, msg: "OK" });
      } catch (error) {
        capture(error);
        res.status(500).send({ success: false, error });
      }
  }
);

// Delete one notice.
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const ref = req.params.ref;
    const doc = await Autor.findOne({ REF: ref });
    const docOai = await NoticesOAI.findOne({ REF: ref });
    if (!doc) {
      return res.status(404).send({
        success: false,
        msg: `Impossible de trouver la notice autor ${ref} à supprimer.`
      });
    }
    if (!canDeleteAutor(req.user, doc)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour supprimer cette ressource." });
    }
    // remove all images and the document itself.
    await Promise.all([doc.remove()]);
    await Promise.all([docOai.remove()]);
    return res.status(200).send({ success: true, msg: "La notice à été supprimée." });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

function transformBeforeCreateAndUpdate(notice, prevNotice) {
  return new Promise(async (resolve, reject) => {
    try {
      notice.DMAJ = formattedNow();
      notice.BASE = "Ressources biographiques (Autor)";
      notice = withFlags(notice);

      //Construction du champ Nom + Prenom
      const NOM = notice.NOM;
      const PREN = notice.PREN;
      notice.NOMPRENOM = ((PREN? PREN : "")
                        + (PREN && NOM ? " " : "")
                        + (NOM? NOM : "")); 

      //Champ CONTIENT_IMAGE égal à oui si Memoire contient une url d'image au moins
      MEMOIRE = notice.MEMOIRE ? notice.MEMOIRE : (prevNotice? prevNotice.MEMOIRE : [])
      if(MEMOIRE.length > 0){
        notice.CONTIENT_IMAGE = ( MEMOIRE.some(e => e.url) ? "oui" : "non" );
      }
      else{
        notice.CONTIENT_IMAGE = "non";
      }

      resolve();
    } catch (e) {
      capture(e);
      reject(e);
    }
  });
}

async function determineProducteur(notice) {
  return new Promise(async (resolve, reject) => {
    try {
      let noticeProducteur = await identifyProducteur("autor", notice.REF, "", "");
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


// Control properties document, flag each error.
function withFlags(notice) {
  notice.POP_FLAGS = [];
  // Required properties.
  ["REF"]
    .filter(prop => !notice[prop])
    .forEach(prop => notice.POP_FLAGS.push(`${prop}_EMPTY`));

  return notice;
}

module.exports = router;
