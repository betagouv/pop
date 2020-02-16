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
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const query = {};
  // Only "administrateur" role can view all accounts.
  if (req.user.role !== "administrateur") {
    return res.status(403).send({ success: false, msg: "Autorisation requise." });
  }
  // Limit to group if group !== admin.
  if (req.user.group && req.user.group !== "admin") {
    query.group = req.user.group;
  }
  try {
    const producteurs = await Producteur.find(query);
    return res.status(200).send({ success: true, producteurs });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

// Update a user (or self) by email.
router.put("/:_id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { _id, LABEL, BASE } = req.body;

    // Validate required fields.
    const validation = producteurValidation({ ...req.body});
    if (!validation.success) {
        return res.status(400).send({ success: validation.success, msg: validation.msg });
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

// Create one user.
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => { 
    const { LABEL, BASE } = req.body;
    // Validate required fields.
    const validation = producteurValidation({ ...req.body });
    if (!validation.success) {
        return res.status(400).send({ success: validation.success, msg: validation.msg });
    }

    //Create the new producteur with this LABEL and BASE
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


// Delete one producteur by id.
router.delete("/:_id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const _id = req.params._id;
        const authenticatedUser = req.user;

        // test if producteur is not null
        let producteur = Producteur.findOne({ _id });
        if (!producteur) {
            return res.status(403).send({ success: false, msg: "Le producteur n'existe pas en base de données." });
          }
    
        // Only admin can delete accounts.
        if (authenticatedUser.role !== "administrateur") {
          return res.status(403).send({ success: false, msg: "Autorisation requise." });
        }
    
        // Actually delete the user.
        await Producteur.findOneAndRemove({ _id });
        return res.status(200).send({ success: true });
      } catch (error) {
        capture(error);
        return res.status(500).send({ success: false, msg: error });
      }
});


function producteurValidation({ LABEL, baseList }) {
    let msg = "";
    console.log("api baseList = " + baseList[0].prefixes.length);
    // Some params are required.
    if (!LABEL) {
      msg = "Le nom du producteur ne doit pas être vide";
      return { success: false, msg };
    }
    for(let i=0; i<baseList.length; i++){
      if(baseList[i].base=="" || baseList[i].prefixes.length<1){
        msg = "Veuillez sélectionner une base et saisir le ou les préfixes associés";
      return { success: false, msg };
      }
    }
    return { success: true };
}

module.exports = router;
