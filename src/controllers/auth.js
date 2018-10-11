const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const generator = require("generate-password");
const { capture } = require("./../sentry.js");
const mailer = require("../mailer");

require("../passport")(passport);

const User = require("../models/user");
const config = require("../config.js");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/signup", (req, res) => {
  if (
    !req.body.email ||
    !req.body.group ||
    !req.body.role ||
    !req.body.institution
  ) {
    return res.status(400).json({
      success: false,
      msg: "Email, group, institution ou role absent"
    });
  }

  var password = generator.generate({ length: 10, numbers: true });

  const newUser = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    group: req.body.group,
    role: req.body.role,
    institution: req.body.institution,
    password
  });

  newUser.save(function(err) {
    if (err) {
      console.log("signup", err);
      return res.status(400).json({
        success: false,
        msg: `L'utilisateur ${req.body.email} existe déja`
      });
    }

    res.status(200).json({
      success: true,
      msg: "Successful created new user."
    });

    mailer.send(
      "Compte POP créé avec succès",
      req.body.email,
      `Félicitations!<br /><br />
          Votre compte ${req.body.role} POP a été créé avec succès.<br />
          Votre identifiant de connexion est ${req.body.email}<br />
          Votre mot de passe provisoire est ${password}<br />
          Nous vous recommandons de modifier votre mot de passe le plus rapidement possible en cliquant en haut à droite lors de votre connexion<br /><br />
          L'équipe POP<br />
          Et en cas de problème, vous pouvez toujours nous contacter à sebastien.legoff@beta.gouv.fr<br />
      `
    );
  });
});

router.get("/", (req, res) => {
  const query = {};
  if (req.query.group && req.query.group !== "admin") {
    query.group = req.query.group;
  }

  User.find(query, (error, users) => {
    if (error) {
      capture(error);
      return res.status(500).send({ error });
    }
    res.status(200).send(users);
  });
});

router.post("/forgetPassword", (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({
        success: false,
        msg: `Utilisateur ${email} introuvable`
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
          req.body.email,
          `Bonjour!<br /><br />
              Votre nouveau mot de passe provisoire est ${password}<br />
              Nous vous recommandons de modifier votre mot de passe le plus rapidement possible en cliquant en haut à droite lors de votre connexion<br /><br />
              L'équipe POP<br />
              Et en cas de problème, vous pouvez toujours nous contacter à sebastien.legoff@beta.gouv.fr<br />
          `
        );
      });
    }
  });
});

router.post("/updatePassword", (req, res) => {
  const { email, ppwd, pwd1, pwd2 } = req.body;

  if (!pwd1) {
    return res.status(401).send({
      success: false,
      msg: `Le nouveau mot de passe ne peut être vide`
    });
  }

  if (pwd1 !== pwd2) {
    return res.status(401).send({
      success: false,
      msg: `Les mots de passe ne sont pas identiques`
    });
  }

  User.findOne({ email }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({
        success: false,
        msg: `La mise à jour du mot de passe à échouée. Utilisateur ${email} introuvable`
      });
    } else {
      user.comparePassword(ppwd, function(err, isMatch) {
        if (isMatch && !err) {
          user.set({ password: pwd1 });

          user.save(function(err) {
            if (err) throw err;
            return res.status(200).send({
              success: true,
              msg: `La mise à jour du mot de passe à été effectuée avec succès`
            });
          });
        } else {
          res.status(401).send({
            success: false,
            msg: `La mise à jour du mot de passe à échouée. Utilisateur introuvable`
          });
        }
      });
    }
  });
});

router.post("/signin", (req, res) => {
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: `L'authentification à échouée. Utilisateur ${
            req.body.email
          } introuvable`
        });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            const token = jwt.sign({ _id: user._id }, config.secret);
            res.status(200).send({
              success: true,
              token: "JWT " + token,
              user
            });
          } else {
            res.status(401).send({
              success: false,
              msg:
                "Impossible de se connecter. Le mot de passe ne correspond pas."
            });
          }
        });
      }
    }
  );
});

router.post(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({
      success: true,
      msg: "It works!"
    });
  }
);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({
      success: true,
      user: req.user
    });
  }
);

router.put(
  "/user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { fname, lname } = req.body;
    if (!fname || !lname) {
      return res.status(400).send({
        success: false,
        msg: "Le nom et le prénom ne doivent pas être vide."
      });
    }
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { nom: fname, prenom: lname } },
      { new: true }
    );
    res.send({ success: true, user });
  }
);

module.exports = router;
