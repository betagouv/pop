const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const multer = require("multer");
const filenamify = require("filenamify");
const upload = multer({ dest: "uploads/" });
const Museo = require("../models/museo");
const { formattedNow, uploadFile } = require("./utils");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

function transformBeforeCreateOrUpdate(notice) {
  notice.DMAJ = notice.DMIS = formattedNow();
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
    const notice = JSON.parse(req.body.notice);
    if (!notice || !notice.REF) {
      return res.status(400).json({ success: false, msg: "Objet museo ou référence absente" });
    }
    const arr = [];
    for (let i = 0; i < req.files.length; i++) {
      arr.push(
        uploadFile(
          `museo/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`,
          req.files[i]
        )
      );
    }
    transformBeforeCreateOrUpdate(notice);
    arr.push(Museo.findOneAndUpdate({ REF: notice.REF }, notice, { new: true }));
    try {
      await Promise.all(arr);
      return res.sendStatus(200);
    } catch (e) {
      capture(e);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
