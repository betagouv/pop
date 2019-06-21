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
router.post("/signin", (req, res) => {
  const failureObject = {
    success: false,
    msg: `L'authentification a échoué. Email ou mot de passe incorrect.`
  };
  User.findOne(
    {
      email: req.body.email.toLowerCase()
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send(failureObject);
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            const token = jwt.sign({ _id: user._id }, config.secret, {
              expiresIn: "1d"
            });
            user.set({ lastConnectedAt: Date.now() });
            user.save();
            res.status(200).send({
              success: true,
              token: "JWT " + token,
              user
            });
          } else {
            res.status(401).send(failureObject);
          }
        });
      }
    }
  );
});

// Get current user.
router.get("/user", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send({
    success: true,
    user: req.user
  });
});

// Password lost.
router.post("/forgetPassword", (req, res) => {
  const { email } = req.body;

  User.findOne({ email: email }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({
        success: false,
        msg: `Utilisateur ${email.toLowerCase()} introuvable`
      });
    } else {
      var password = generator.generate({ length: 10, numbers: true });
      user.set({ password });

      user.save(function(err) {
        if (err) throw err;
        res.status(200).json({
          success: true,
          msg: "Successful created new user."
        });

        mailer.send(
          "Réinitialisation du mot de passe",
          req.body.email.toLowerCase(),
          `Bonjour!<br /><br />
              Votre nouveau mot de passe provisoire est ${password}<br />
              Nous vous recommandons de modifier votre mot de passe le plus rapidement possible en cliquant en haut à droite lors de votre connexion<br /><br />
              L'équipe POP<br />
              Et en cas de problème, vous pouvez toujours nous contacter à jennifer.stephan@beta.gouv.fr<br />
          `
        );
      });
    }
  });
});

// Update password.
router.post(
  "/updatePassword",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
