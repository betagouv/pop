const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Museo = require("../models/museo");
const { formattedNow } = require("./utils");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

function transformBeforeCreateOrUpdate(museo) {
  museo.DT_MODIF = formattedNow();
}

router.get("/:ref", async (req, res) => {
  const museo = await Museo.findOne({ REF: req.params.ref });
  if (museo) {
    return res.status(200).send(museo);
  }
  return res.sendStatus(404);
});

router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    const data = JSON.parse(req.body.notice);
    if (!data || !data.REF) {
      return res.status(400).json({ success: false, msg: "Objet museo ou référence absente" });
    }
    transformBeforeCreateOrUpdate(data);
    const doc = await Museo.findOneAndUpdate({ REF: data.REF }, data, { new: true });
    if (!doc) {
      return res.sendStatus(404);
    }
    return res.status(200).send(doc);
  }
);

module.exports = router;
