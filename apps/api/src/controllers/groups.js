const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const { capture } = require("./../sentry.js");
require("../passport")(passport);
const Group = require("../models/group");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Get all groups.
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
    const groups = await Group.find(query);
    return res.status(200).send({ success: true, groups });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

// Update a group.
 router.put("/:_id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { _id, label, producteurs } = req.body;

    // Validate required fields.
    let allGroups;
    try {
      allGroups = await Group.find({});
    } catch (error) {
        capture(error);
        return res.status(500).send({ success: false, error });
    }
    const validation = groupValidation( _id, label, producteurs, allGroups );
    if (!validation.success) {
        return res.status(400).send({ success: validation.success, msg: validation.msg });
    }


    // Get group by its id.
    let group;
    try {
      group = await Group.findOne({ _id });
    } catch (error) {
        capture(error);
        return res.status(500).send({ success: false, error });
    }

    // group not found.
    if (!group) {
        res.status(404).send({
        success: false,
        msg: `La mise à jour des informations à échoué. Le groupe ${label} est introuvable.`
        });
    }

    // Add new params to group.
    const LABEL = label;
    const PRODUCTEURS = producteurs;
    group.set({ LABEL, PRODUCTEURS });

    // Actually save the group.
    try {
        await group.save();
        return res
        .status(200)
        .send({ success: true, msg: `La mise à jour a été effectuée avec succès` });
    } catch (e) {
        capture(e);
        res.status(500).send({ success: false, msg: `La mise à jour a échoué` });
    }
});

// Create one group.
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    let { label, producteurs } = req.body;
    // Validate required fields.
    let allGroups;
    try {
      allGroups = await Group.find({});
    } catch (error) {
        capture(error);
        return res.status(500).send({ success: false, error });
    }
    const validation = groupValidation( 0, label, producteurs, allGroups);
    if (!validation.success) {
        return res.status(400).send({ success: validation.success, msg: validation.msg });
    }

    //Create the new group with this LABEL and PROUCTEURS and removing index from base objects
    for(let i=0; i<producteurs.length; i++){
      delete producteurs[i].index;
    }

    const LABEL = label;
    const PRODUCTEURS = producteurs;
    const data = { LABEL, PRODUCTEURS };
    const newGroup = new Group(data);
    try {
        await newGroup.save();
    } catch (e) {
        return res.status(400).json({
        success: false,
        msg: `Le groupe ${req.body.LABEL} existe déjà.`
        });
    }

    res.status(200).json({ success: true, msg: "Groupe créé." });
});


//Méthode permettant de valider les données du groupe
function groupValidation(_id, label, producteurs, allGroups ) {
    let msg = "";
    let usedProducteurs = [];

    // Some params are required.
    if (!label) {
        msg = "Le nom du groupe ne doit pas être vide";
        return { success: false, msg };
    }

    //Si parmis les groupes existants il y en a un portant le même nom, retourne une erreur
    allGroups.map(item => {
        if(String(item.LABEL) === label && item._id != _id){
            msg = "Ce nom de groupe existe déjà";
        }
    })
    if(msg!=""){
        return { success: false, msg };
    }

    //Test si le producteur n'est pas présent deux fois ou plus, ou s'il est vide
    if(producteurs.length<1){
        msg = "Le groupe doit contenir au moins un producteur";
    }
    for(let i=0; i<producteurs.length; i++){
        let producteur = producteurs[i];

        if(producteur!=""){
            usedProducteurs.map(used => {
                if(String(used)===String(producteur)){
                    msg = "Le producteur \"" + producteur + "\"ne doit pas être présent plusieurs fois dans le même groupe";
                }
                else {
                    usedProducteurs[usedProducteurs.length] = producteur;
                }
            })
            if(usedProducteurs.length<1){
                usedProducteurs[0] = producteur;
            }
        }
        else{
            msg = "Un producteur ne doit pas être vide";
            break;
        }
    }

    if(msg!=""){
        return { success: false, msg };
    }

    return { success: true };
}

module.exports = router;
