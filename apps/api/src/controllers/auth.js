const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const generator = require("generate-password");
const mailer = require("../mailer");
require("../passport")(passport);
const User = require("../models/user");
const config = require("../config.js");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Sign in.
router.post("/signin", async (req, res) => {
  /* 	
    #swagger.tags = ['Auth']
    #swagger.path = '/auth/signin'
    #swagger.description = 'Authentification utilisateur' 
  */
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send({ success: false, msg: `Mot de passe et email requis.` });
  }
  let user;
  try {
    user = await User.findOne({ email });
  } catch (e) {
    return res.status(500).send({ success: false, msg: `L'authentification a échoué.` });
  }
  if (!user) {
    return res.status(401).send({ success: false, msg: `Email ou mot de passe incorrect.` });
  }
  user.comparePassword(req.body.password, async function(err, isMatch) {
    if (isMatch && !err) {
      const token = jwt.sign({ _id: user._id }, config.secret, { expiresIn: "1d" });
      user.set({ lastConnectedAt: Date.now() });
      await user.save();
      res.status(200).send({ success: true, token: "JWT " + token, user, id_app: config.ID_PROD_APP });
    } else {
      res.status(401).send({ success: false, msg: `Email ou mot de passe incorrect.` });
    }
  });
});

// Get current user.
router.get("/user", passport.authenticate("jwt", { session: false }), (req, res) => {
   /* 	
    #swagger.tags = ['Auth']
    #swagger.path = '/auth/user'
    #swagger.description = 'Informations utilisateur' 
  */
  res.send({ success: true, user: req.user });
});

// Password lost.
router.post("/forgetPassword", async (req, res) => {
  /* 	
    #swagger.tags = ['Auth']
    #swagger.path = '/auth/forgetPassword'
    #swagger.description = 'Demande de modification du mot de passe' 
  */
  const email = req.body.email.toLowerCase();
  if (!email) {
    return res.status(400).send({ success: false, msg: `Email requis.` });
  }

  let user;
  try {
    user = await User.findOne({ email });
  } catch (e) {
    return res.status(500).send({ success: false, msg: `L'opération a échouée.` });
  }
  if (!user) {
    const msg = `Utilisateur ${email.toLowerCase()} introuvable`;
    return res.status(404).send({ success: false, msg });
  }

  var password = generator.generate({ length: 12, numbers: true, symbols: true, exclude:"<>" });
  user.set({ password });
  await user.save();
  res.status(200).json({ success: true, msg: "Mot de passe mis à jour" });
  mailer.send(
    "Réinitialisation du mot de passe",
    email,
    `Bonjour!<br /><br />
    Votre nouveau mot de passe provisoire est ${password}<br />
    Nous vous recommandons de modifier votre mot de passe le plus rapidement 
    possible en cliquant en haut à droite lors de votre connexion<br /><br />
    L'équipe POP<br />
    Et en cas de problème, vous pouvez toujours nous contacter à pop@culture.gouv.fr<br />`,
    false
  );
});

// Update password.
router.post(
  "/updatePassword",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
  /* 	
    #swagger.tags = ['Auth']
    #swagger.path = '/auth/updatePassword'
    #swagger.description = 'Modification mot de passe' 
  */
    const { email, pwd, pwd1, pwd2 } = req.body;

    if (!pwd1) {
      return res
        .status(400)
        .send({ success: false, msg: `Le nouveau mot de passe ne peut être vide` });
    }

    if (pwd1 !== pwd2) {
      return res
        .status(400)
        .send({ success: false, msg: `Les mots de passe ne sont pas identiques` });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(404).send({
        success: false,
        msg: `La mise à jour du mot de passe à échoué. Utilisateur ${email.toLowerCase()} introuvable.`
      });
    }

    // Vérification de la sécurité du mot de passe
    const checkPassword = user.validatePassword(user.email, pwd1);

    if(!checkPassword.success){
      return res.status(401).send(checkPassword); 
    }

    user.comparePassword(pwd, async function(err, isMatch) {
      if (isMatch && !err) {
        user.set({ password: pwd1 });
        user.set({ hasResetPassword: true });
        try {
          await user.save();
        } catch (e) {
          return res.status(500).send({
            success: false,
            msg: `La mise à jour du mot de passe à échoué.`
          });
        }
        return res.status(200).send({
          success: true,
          msg: `La mise à jour du mot de passe a été effectuée avec succès`
        });
      } else {
        return res.status(401).send({
          success: false,
          msg: `La mise à jour du mot de passe à échoué. Le mot de passe original n'est pas bon.`
        });
      }
    });
  }
);

module.exports = router;
