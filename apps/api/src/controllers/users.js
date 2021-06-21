const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const generator = require("generate-password");
const mailer = require("../mailer");
const { capture } = require("./../sentry.js");
require("../passport")(passport);
const User = require("../models/user");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Get all users.
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  /* 	
      #swagger.tags = ['Users']
      #swagger.path = '/users'
      #swagger.description = 'Récupère la liste des utilisateurs' 
  */
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
    const users = await User.find(query);
    return res.status(200).send({ success: true, users });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

// Update a user (or self) by email.
router.put("/:email", passport.authenticate("jwt", { session: false }), async (req, res) => {
   /* 	
      #swagger.tags = ['Users']
      #swagger.path = '/users'
      #swagger.description = 'Mise à jour d\'un utilisateur' 
  */
  const { nom, prenom, institution, group, role, museofile } = req.body;
  const email = req.params.email && req.params.email.toLowerCase();
  const authenticatedUser = req.user;

  // Validate required fields.
  const validation = userValidation({ ...req.body, email });
  if (!validation.success) {
    return res.status(400).send({ success: validation.success, msg: validation.msg });
  }

  // Get user by its email.
  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }

  // User not found.
  if (!user) {
    res.status(404).send({
      success: false,
      msg: `La mise à jour des informations à échoué. Utilisateur ${email} introuvable.`
    });
  }

  // A user can modify her own account, otherwise...
  if (email !== authenticatedUser.email) {
    // The authenticated user must be "administrateur"
    // AND she must be in the same group OR from admin group.
    if (
      authenticatedUser.role !== "administrateur" &&
      authenticatedUser.group !== "admin" &&
      authenticatedUser.group !== user.group
    ) {
      return res.status(403).send({ success: false, msg: "Autorisation requise." });
    }
  }

  // Add new params to user.
  user.set({ institution, nom, prenom, group, role });
  if (museofile) {
    user.set({ museofile });
  }

  // Actually save the user.
  try {
    await user.save();
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
  /* 	
      #swagger.tags = ['Users']
      #swagger.path = '/users'
      #swagger.description = 'Création d\'un utilisateur' 
  */
  const { nom, prenom, institution, group, role, museofile } = req.body;
  const email = req.body.email && req.body.email.toLowerCase();
  const authenticatedUser = req.user;

  // Validate required fields.
  const validation = userValidation({ ...req.body, email });
  if (!validation.success) {
    return res.status(400).send({ success: validation.success, msg: validation.msg });
  }

  // The authenticated user must be "administrateur"
  // AND she must be in the same group OR from admin group.
  if (
    authenticatedUser.role !== "administrateur" &&
    authenticatedUser.group !== "admin" &&
    authenticatedUser.group !== user.group
  ) {
    return res.status(403).send({ success: false, msg: "Autorisation requise." });
  }

  const password = generator.generate({ length: 12, numbers: true, symbols: true });
  const data = { nom, prenom, email, group, role, institution, password, hasResetPassword: false };
  if (needMuseofile({ role, group })) {
    data.museofile = museofile;
  }

  const newUser = new User(data);
  try {
    await newUser.save();
  } catch (e) {
    return res.status(400).json({
      success: false,
      msg: `L'utilisateur ${req.body.email} existe déja.`
    });
  }

  res.status(200).json({ success: true, msg: "Utilisateur créé." });
  mailer.send(
    "Compte POP créé avec succès",
    req.body.email,
    `Félicitations!<br /><br />
        Votre compte ${req.body.role} POP a été créé avec succès.<br /><br />
        Le lien vers la plateforme de production est le suivant : <a href="http://production.pop.culture.gouv.fr">http://production.pop.culture.gouv.fr</a><br />
        Le lien vers la plateforme de diffusion est le suivant : <a href="https://www.pop.culture.gouv.fr/">https://www.pop.culture.gouv.fr/</a><br /><br />
        Votre identifiant de connexion est ${req.body.email}<br />
        Votre mot de passe provisoire est ${password}<br />
        Nous vous recommandons de modifier votre mot de passe le plus rapidement possible en cliquant en haut à droite lors de votre connexion<br /><br />
        L'équipe POP<br />
        Et en cas de problème, vous pouvez contacter pop@culture.gouv.fr<br />`
  );
});

// Delete one user by her email.
router.delete("/:email", passport.authenticate("jwt", { session: false }), async (req, res) => {
  /* 	
      #swagger.tags = ['Users']
      #swagger.path = '/users'
      #swagger.description = 'Suppression d\'un utilisateur' 
  */
  try {
    const email = req.params.email;
    const authenticatedUser = req.user;

    // Only admin can delete accounts.
    if (authenticatedUser.role !== "administrateur") {
      return res.status(403).send({ success: false, msg: "Autorisation requise." });
    }

    // User must be in same group (or in admin group) to delete an account.
    groupQuery = {};
    if (authenticatedUser.group !== "admin") {
      groupQuery = { group: authenticatedUser.group };
    }

    // Actually delete the user.
    await User.findOneAndRemove({ email, ...groupQuery });
    return res.status(200).send({ success: true });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, msg: error });
  }
});

function userValidation({ nom, prenom, institution, group, role, museofile, email }) {
  let msg = "";
  // Some params are required.
  if (!nom || !prenom || !institution || !group || !role || !email) {
    msg = "Email, nom, prenom, institution, groupe et rôle ne peuvent pas être vides";
    return { success: false, msg };
  }

  // User must be "administrateur" if group is "admin"
  if (group === "admin" && role !== "administrateur") {
    msg = "Les membres du groupe « admin » doivent avoir le rôle « administrateur »";
    return { success: false, msg };
  }

  // Museofile is required
  if (needMuseofile({ role, group })) {
    if (!museofile.length) {
      msg = "Le champ muséofile est obligatoire pour les producteurs du groupe joconde ou museo.";
      return { success: false, msg };
    } else if (museofile.some(e => !e.match(/^[M?B][0-9]+$/))) {
      msg = "Le format du champ muséofile est invalide (utilisez M ou B suivi de plusieurs chiffres)";
      return { success: false, msg };
    }
  }
  return { success: true };
}

function needMuseofile({ role, group }) {
  return role === "producteur" && (group === "joconde" || group === "museo");
}

module.exports = router;
