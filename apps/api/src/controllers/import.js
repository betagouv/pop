const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const filenamify = require("filenamify");
const upload = multer({ dest: "uploads/" });
const { capture } = require("../sentry.js");
const Import = require("../models/import");
const { uploadFile } = require("./utils");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    try {
      const body = JSON.parse(req.body.import);
      const obj = new Import(body);
      const doc = await obj.save();
      for (var i = 0; i < req.files.length; i++) {
        await uploadFile(
          `import/${filenamify(doc._id)}/${filenamify(req.files[i].originalname)}`,
          req.files[i]
        );
      }
      return res.send({ success: true, msg: "OK", doc });
    } catch (e) {
      capture(JSON.stringify(e));
      return res.status(500).send({ success: false, msg: JSON.stringify(e) });
    }
  }
);

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  let imports = null;
  try {
    imports = await Import.find({});
    res.status(200).send(imports);
  } catch (e) {
    capture(JSON.stringify(e));
    return res.status(500).send({ e });
  }
});

module.exports = router;
