const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const User = require("../models/user");
const router = express.Router();
const Mailer = require("../mailer");
const { capture } = require("./../sentry.js");
require("../passport")(passport);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

async function recipients(to) {
  switch (to) {
    case "mnr":
      return "francoise.gaborit@culture.gouv.fr";
    case "inv":
      return ["geraud.buffa@culture.gouv.fr", "jean.davoigneau@culture.gouv.fr"].join(",");
    case "joconde":
      return ["sophie.daenens@culture.gouv.fr", "jeannette.ivain@culture.gouv.fr"].join(",");
    case "memoire":
      return [
        "anne.cook@culture.gouv.fr",
        "matthieu.rivallin@culture.gouv.fr",
        "gaelle.pichon-meunier@culture.gouv.fr",
        "antonella.rotolo@culture.gouv.fr"
      ].join(",");
    case "mh":
      return [
        "gaelle.pichon-meunier@culture.gouv.fr",
        "antonella.rotolo@culture.gouv.fr",
        "franck.fusibet@culture.gouv.fr"
      ].join(",");
    case "museo":
      return "natacha.villeroy@culture.gouv.fr";
    // Dynamic recipient (email): user must exist in database.
    default:
      try {
        const user = await User.findOne({ email: to });
        if (user && user.email) {
          return user.email;
        }
      } catch (e) {}
  }
}

router.post("/email", passport.authenticate("jwt", { session: false }), async (req, res) => {
  let { subject, to, body } = req.body;
  if (!subject || !to || !body) {
    return res.status(400).send("Information incomplete.");
  }
  to = await recipients(to);
  if (!to) {
    return res.status(400).send("Destinataires invalides.");
  }
  try {
    await Mailer.send(subject, to, body);
    return res.status(200).send({ success: true, msg: "OK" });
  } catch (e) {
    capture(e);
    return res.status(500).send({ success: false, msg: "Impossible d'envoyer le mail" });
  }
});

module.exports = router;
