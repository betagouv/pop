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

  try {
    const groups = await Group.find(query);
    return res.status(200).send({ success: true, groups });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

// Get group by label.
router.get("/label", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const {label} = req.query;
    try {
        const group = await Group.findOne({LABEL: label});
        return res.status(200).send({ success: true, group });
    } catch (error) {
        capture(error);
        return res.status(500).send({ success: false, error });
    }
});


// Get all groups.
router.get("/canEdit", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const {ref, museo, producteur, collection} = req.query;
    const user = req.user;
    
    let validate = false;

    // Si on a bien un utilisateur rattaché à un groupe et un rôle, ainsi qu'une notice
    if(user && ref && user.role && user.group){        
        //Si l'utilisateur a un rôle administrateur et que son groupe est admin ou celui correspondant à la collection, retourne true
        if(user.role == "administrateur" && user.group === "admin"){
            validate = true;
            return res.status(200).send({ success: true, validate });
        }

        //On récupère le groupe de l'utilisateur en base
        let group = await Group.findOne({LABEL: user.group});

        // Si l'utilisateur a le rôle administrateur ou producteur
        if (["producteur", "administrateur"].includes(user.role)){
            // Si le groupe récupéré en base contient bien un LABEL et des PRODUCTEURS
            if(group.LABEL && group.PRODUCTEURS){
                // Pour chaque producteurs rattachés au groupe, on vérifie sur le producteur de la notice y est présent
                group.PRODUCTEURS.map( prod => {

                // Si le producteur de la notice correspond à un de ceux du groupe
                // Ou s'il s'agit de la base museo n'ayant pas de producteur
                if( String(producteur)===String(prod) || collection==="museo"){
                    if(collection==="joconde"){
                        validate = user.museofile.includes(museo);
                    }
                    else if(collection==="museo"){
                        validate = user.museofile.includes(ref);
                    }
                    else{
                        validate = true;
                    }
                }
                });
            }
        }
    }
    return res.status(200).send({ success: true, validate });
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
