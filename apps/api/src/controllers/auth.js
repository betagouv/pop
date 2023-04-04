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
const moment = require("moment-timezone")

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
  const MSG_FAIL_AUTH = `Email ou mot de passe incorrect.`;
  const MSG_WARNING_AUTH = `Email ou mot de passe incorrect.# En cas de nouvelle saisie erronée, votre compte sera temporairement bloqué.`;
  const MSG_ACCOUNT_LOCKED = `Compte temporairement bloqué.# Veuillez réessayer dans quelques minutes ou contacter l'administrateur POP.`;

  if (!email || !password) {
    return res.status(400).send({ success: false, msg: `Mot de passe et email requis.` });
  }
  let user;
  try {
    user = await User.findOne({ email });
  } catch (e) {
    return res.status(400).send({ success: false, msg: `L'authentification a échoué.` });
  }
  if (!user) {
    return res.status(401).send({ success: false, msg: MSG_FAIL_AUTH });
  }

  // Date now
  const dateNow = moment();

  // Date dernier échec d'authentification + le délai de déblocage du compte paramétré (variable environnement: exemple 5 min)
  const dateResetAccount = ( user.lastFailure && process.env.BLOCKED_USER_DELAY ) ? moment(user.lastFailure).add(process.env.BLOCKED_USER_DELAY, 'm') : null;

  // Si le compte est bloqué et le délai de déblocage du compte n'est pas dépassé 
  if(user.isBloqued && dateResetAccount && dateNow < dateResetAccount){
    return res.status(401).send({ success: false, msg: MSG_ACCOUNT_LOCKED });
  }

  user.comparePassword(req.body.password, async function(err, isMatch) {
    if (isMatch && !err) {
      const token = jwt.sign({ _id: user._id }, config.secret, { expiresIn: "1d" });
      /*
      * Mise à jour de l'utilisateur, remise à zéro du nombre de tentative, compte bloqué == false 
      */
      user.set({ 
        lastConnectedAt: Date.now(),
        isBloqued: false,
        attemptCount: 0
      });
      await user.save();
      res.status(200).send({ success: true, token: "JWT " + token, user, id_app: config.ID_PROD_APP });
    } else {

      user.set({
        lastFailure: dateNow.format(),
        attemptCount: user.attemptCount + 1,
        isBloqued : user.attemptCount + 1 > 4
      });
      await user.save();
      // Si le message est également à 4 => l'utilisateur est informé, à la prochaine erreur d'authentification, le compte est bloqué
      // Si le nombre de tentative est supérieur à 4 => message compte bloqué
      const message = ( user.attemptCount < 4 ) ? MSG_FAIL_AUTH : ( user.attemptCount > 4 ) ? MSG_ACCOUNT_LOCKED : MSG_WARNING_AUTH
      res.status(401).send({ success: false, msg: message });
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
    return res.status(500).send({ success: false, msg: `L'opération a échoué.` });
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
        msg: `La mise à jour du mot de passe a échoué. Utilisateur ${email.toLowerCase()} introuvable.`
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
            msg: `La mise à jour du mot de passe a échoué.`
          });
        }
        return res.status(200).send({
          success: true,
          msg: `La mise à jour du mot de passe a été effectuée avec succès`
        });
      } else {
        return res.status(401).send({
          success: false,
          msg: `La mise à jour du mot de passe a échoué. Le mot de passe original n'est pas bon.`
        });
      }
    });
  }
);

module.exports = router;
