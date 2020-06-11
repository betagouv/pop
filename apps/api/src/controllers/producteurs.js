const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const generator = require("generate-password");
const mailer = require("../mailer");
const { capture } = require("./../sentry.js");
require("../passport")(passport);
const Producteur = require("../models/producteur");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Get all producteurs.
router.get("/", async (req, res) => {
  const query = {};
  try {
    const producteurs = await Producteur.find(query);
    return res.status(200).send({ success: true, producteurs });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

// Get producteur by label.
router.get("/label", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const {label} = req.query;
  try {
      const producteur = await Producteur.findOne({LABEL: label});
      return res.status(200).send({ success: true, producteur });
  } catch (error) {
      capture(error);
      return res.status(500).send({ success: false, error });
  }
});

// Update a producteur.
router.put("/:_id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { _id, label, base } = req.body;

    // Validate required fields.
    let allProducteurs;
    try {
      allProducteurs = await Producteur.find({});
    } catch (error) {
        capture(error);
        return res.status(500).send({ success: false, error });
    }
    const validation = producteurValidation( _id, label, base, allProducteurs );
    if (!validation.success) {
        return res.status(400).send({ success: validation.success, msg: validation.msg });
    }

    //Update the new producteur with this LABEL and BASE and removing index from base objects
    for(let i=0; i<base.length; i++){
      delete base[i].index;
    }

    // Get producteur by its id.
    let producteur;
    try {
      producteur = await Producteur.findOne({ _id });
    } catch (error) {
        capture(error);
        return res.status(500).send({ success: false, error });
    }

    // User not found.
    if (!producteur) {
        res.status(404).send({
        success: false,
        msg: `La mise à jour des informations à échoué. Producteur ${LABEL} introuvable.`
        });
    }

    // Add new params to producteur.
    const LABEL = label;
    const BASE = base;
    producteur.set({ LABEL, BASE });

    // Actually save the user.
    try {
        await producteur.save();
        return res
        .status(200)
        .send({ success: true, msg: `La mise à jour a été effectuée avec succès` });
    } catch (e) {
        capture(e);
        res.status(500).send({ success: false, msg: `La mise à jour a échoué` });
    }
});

router.get("/prefixesFromProducteurs", passport.authenticate("jwt", { session: false }), async (req, res) => { 
  let listePrefix = [];
  let listeProducteur = req.query.producteurs;
  let producteurs = await Producteur.find({});
  // Renvoie la liste des préfixes associés aux producteurs en paramètre
  producteurs.map(
    producteur => producteur.BASE.filter(
      base => listeProducteur.includes(base.base)
    ).map(
      base => listePrefix = listePrefix.concat(base.prefixes)
    )
  )  

  res.status(200).json({success: true, listePrefix: listePrefix})
});


// Create one producteur.
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => { 
    let { label, base } = req.body;

    // Validate required fields.
    let allProducteurs;
    try {
      allProducteurs = await Producteur.find({});
    } catch (error) {
      capture(error);
      return res.status(500).send({ success: false, error });
    }
    const validation = producteurValidation(0, label, base, allProducteurs);
    if (!validation.success) {
        return res.status(400).send({ success: validation.success, msg: validation.msg });
    }

    //Create the new producteur with this LABEL and BASE and removing index from base objects
    for(let i=0; i<base.length; i++){
      delete base[i].index;
    }
    const LABEL = label;
    const BASE = base;
    const data = { LABEL, BASE };
    const newProducteur = new Producteur(data);
    try {
        await newProducteur.save();
    } catch (e) {
        return res.status(400).json({
        success: false,
        msg: `Le producteur ${req.body.LABEL} existe déjà.`
        });
    }

    res.status(200).json({ success: true, msg: "Producteur créé." });
});


function producteurValidation( _id, label, base, allProducteurs ) {
    let msg = "";
    let usedBases = [];

    // Some params are required.
    if (!label) {
      msg = "Le nom du producteur ne doit pas être vide";
      return { success: false, msg };
    }

    //Si parmis les producteurs existants il y en a un portant le même nom, retourne une erreur
    allProducteurs.map(item => {
        if(String(item.LABEL) === label && item._id != _id){
            msg = "Ce nom de producteur existe déjà";
        }
    })
    if(msg!=""){
        return { success: false, msg };
    }

    // Vérifie si les bases et les préfixes sont remplis
    for(let i=0; i<base.length; i++){
      //Test si base et préfixe sont remplis
      if(base[i].base==""){
        msg = "Veuillez sélectionner une base";
        return { success: false, msg };
      }

      //Test si une même base est sélectionnée plusieurs fois
      for(let j=0; j<usedBases.length; j++){
        if(usedBases[j] == base[i].base){
          msg = "Une même base ne doit pas être sélectionnée plusieurs fois pour un même producteur";
          return { success: false, msg };
        }
      }
      //Ajout de la base utilisée dans la liste des bases
      usedBases[i] = base[i].base;
    }
    return { success: true };
}

module.exports = router;
