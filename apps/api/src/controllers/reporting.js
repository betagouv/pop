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
      return "isabelle.rouge-ducos@culture.gouv.fr";
    case "inv":
      return ["geraud.buffa@culture.gouv.fr", "jean.davoigneau@culture.gouv.fr", "ines.graillat@culture.gouv.fr"].join(",");
    case "joconde":
      return ["sophie.daenens@culture.gouv.fr", "angelina.meslem@culture.gouv.fr"].join(",");
    case "memoire":
      return [
        "anne.cook@culture.gouv.fr",
        "matthieu.rivallin@culture.gouv.fr",
        "antonella.rotolo@culture.gouv.fr"
      ].join(",");
    case "mh":
      return [
        "antonella.rotolo@culture.gouv.fr",
        "franck.fusibet@culture.gouv.fr",
        "franck.genestoux@culture.gouv.fr",
        "anne-violaine.bouilloud@culture.gouv.fr"
      ].join(",");
    case "museo":
      return "laurent.manoeuvre@culture.gouv.fr";
    // Dynamic recipient (email): user must exist in database.
    case "enluminures":
      return "wilfried.muller@culture.gouv.fr"  
      break;
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
   /* 	
      #swagger.tags = ['Reporting']
      #swagger.path = '/reporting/email'
      #swagger.description = 'Envoie du rapport par mail' 
    */
  let { subject, to, body } = req.body;
  if (!subject || !to || !body) {
    return res.status(400).send("Information incomplete.");
  }
  to = await recipients(to);
  if (!to) {
    return res.status(400).send("Destinataires invalides.");
  }
  try {
    //await Mailer.send(subject, to, body, true);
    return res.status(200).send({ success: true, msg: "OK" });
  } catch (e) {
    console.log(e);
    capture(e);
    return res.status(403).send({ success: false, msg: "Impossible d'envoyer le mail" });
  }
});

module.exports = router;
