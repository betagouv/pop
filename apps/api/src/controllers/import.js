const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { capture } = require("../sentry.js");

const Import = require("../models/import");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  (req, res) => {
    const body = JSON.parse(req.body.import);
    const obj = new Import(body);
    obj.save().then(doc => {
      res.send({ success: true, msg: "OK", doc });
    });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let imports = null;
    try {
      imports = await Import.find({});
    } catch (e) {
      capture(e);
      return res.status(500).send({ e });
    }
    res.status(200).send(imports);
  }
);

module.exports = router;
