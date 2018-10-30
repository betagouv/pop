const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const upload = multer({ dest: "uploads/" });
const Mnr = require("../models/mnr");
const passport = require("passport");

const { capture } = require("./../sentry.js");
const { uploadFile, deleteFile, formattedNow } = require("./utils");

const router = express.Router();

router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    const ref = req.params.ref;
    const notice = JSON.parse(req.body.notice);
    notice.DMAJ = formattedNow();

    try {
      const prevNotice = await Mnr.findOne({ REF: ref });

      const arr = [
        ...(prevNotice.VIDEO || [])
          .filter(x => !(notice.VIDEO || []).includes(x))
          .map(f => deleteFile(f)),
        ...req.files.map(f =>
          uploadFile(`mnr/${notice.REF}/${f.originalname}`, f)
        )
      ];

      //Update IMPORT ID
      if (notice.POP_IMPORT.length) {
        const id = notice.POP_IMPORT[0];
        delete notice.POP_IMPORT;
        notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
      }

      arr.push(
        Mnr.findOneAndUpdate({ REF: ref }, notice, { upsert: true, new: true })
      );

      await Promise.all(arr);

      res.sendStatus(200);
    } catch (e) {
      capture(e);
      res.sendStatus(500);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  (req, res) => {
    const notice = JSON.parse(req.body.notice);
    notice.DMIS = notice.DMAJ = formattedNow();
    const obj = new Mnr(notice);
    obj.save().then(e => {
      res.send({ success: true, msg: "OK" });
    });
  }
);

router.get("/", (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  Mnr.paginate({}, { offset, limit }).then(results => {
    res.status(200).send(results.docs);
  });
});

router.get("/:ref", (req, res) => {
  const ref = req.params.ref;
  Mnr.findOne({ REF: ref }, (err, notice) => {
    if (err || !notice) {
      res.sendStatus(404);
    } else {
      res.send(notice);
    }
  });
});

router.delete(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const ref = req.params.ref;
    Mnr.findOneAndRemove({ REF: ref }, error => {
      if (error) {
        capture(error);
        return res.status(500).send({ error });
      }
      return res.status(200).send({});
    });
  }
);

module.exports = router;
