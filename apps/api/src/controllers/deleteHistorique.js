const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const generator = require("generate-password");
const mailer = require("../mailer");
const { capture } = require("./../sentry.js");
require("../passport")(passport);
const DeleteHistorique = require("../models/deleteHistorique");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Get all deleteHistorique.
router.get("/", async (req, res) => {
  let query = {};
  try {
    let deleteHistorique;

    if(req.query.limit && parseInt(req.query.limit)){
      deleteHistorique = await DeleteHistorique.find(query).sort({ 'DATE': -1 }).limit(parseInt(req.query.limit));
    } else {
      deleteHistorique = await DeleteHistorique.find(query);
    }
  
    return res.status(200).send({ success: true, deleteHistorique });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});



// Create one historique from deleted notice.
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => { 
    const { ref, base } = req.body;
    const user = req.user;

    //Create the new historique with this LABEL and BASE and removing index from base objects
    const userString = user.prenom + " " + user.nom;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date+' '+time;
    const data = { REF: ref, BASE: base, USER: userString, EMAIL: user.email, DATE: dateTime };
    const newDeleteHistorique = new DeleteHistorique(data);
    try {
        console.log("new delete historique = " + JSON.stringify(newDeleteHistorique))
        await newDeleteHistorique.save();
    } catch (e) {
        console.log("error = " + e);
        return res.status(400).json({
        success: false,
        msg: `L'historique de la suppression de la notice ${req.body.ref} rencontre une erreur.`
        });
    }

    res.status(200).json({ success: true, msg: "Historique de suppression créé." });
});

module.exports = router;
