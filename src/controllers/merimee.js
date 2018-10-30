const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const Merimee = require("../models/merimee");
const Palissy = require("../models/palissy");
const Memoire = require("../models/memoire");
const { uploadFile, formattedNow } = require("./utils");
const { capture } = require("./../sentry.js");
const passport = require("passport");

function checkIfMemoireImageExist(notice) {
  return new Promise(async (resolve, reject) => {
    const NoticesMemoire = await Memoire.find({ LBASE: notice.REF });
    const arr = NoticesMemoire.map(e => {
      return { ref: e.REF, url: e.IMG };
    });
    resolve(arr);
  });
}

function populateREFO(notice) {
  return new Promise(async (resolve, reject) => {
    const obj = await Palissy.findOne({ REFA: notice.REF });
    if (!obj) {
      resolve(notice.REFO);
      return;
    }
    if (!Array.isArray(notice.REFO)) {
      resolve([obj.REF]);
      return;
    }
    if (notice.REFO.includes(obj.REF)) {
      resolve(notice.REFO);
      return;
    }
    resolve([...notice.REFO, obj.REF]);
  });
}

router.get(
  "/newId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const prefix = req.query.prefix;
    const dpt = req.query.dpt;

    if (!prefix || !dpt) {
      return res.status(500).send({ error: "Missing dpt or prefix" });
    }

    getNewId(Merimee, prefix, dpt)
      .then(id => {
        return res.status(200).send({ id });
      })
      .catch(error => {
        return res.status(500).send({ error });
      });
  }
);

router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    try {
      const ref = req.params.ref;
      const notice = JSON.parse(req.body.notice);
      notice.DMAJ = formattedNow();
      const arr = await checkIfMemoireImageExist(notice);
      notice.REFO = await populateREFO(notice);
      notice.MEMOIRE = arr;

      //Update IMPORT ID
      if (notice.POP_IMPORT.length) {
        const id = notice.POP_IMPORT[0];
        delete notice.POP_IMPORT;
        notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
      }

      await Merimee.findOneAndUpdate({ REF: ref }, notice, {
        upsert: true,
        new: true
      });
      res.status(200).send({ success: true, msg: "OK" });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, msg: JSON.stringify(e) });
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    try {
      const notice = JSON.parse(req.body.notice);
      notice.DMIS = notice.DMAJ = formattedNow();
      const arr = await checkIfMemoireImageExist(notice);
      notice.REFO = await populateREFO(notice);
      notice.MEMOIRE = arr;
      const obj = new Merimee(notice);
      await obj.save();
      res.status(200).send({ success: true, msg: "OK" });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, msg: JSON.stringify(e) });
    }
  }
);

router.get("/:ref", (req, res) => {
  const ref = req.params.ref;
  Merimee.findOne({ REF: ref }, (err, notice) => {
    if (err) {
      capture(err);
      res.status(500).send(err);
      return;
    }
    if (notice) {
      res.status(200).send(notice);
    } else {
      res.sendStatus(404);
    }
  });
});

router.get("/", (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  Merimee.paginate({}, { offset, limit }).then(results => {
    res.status(200).send(results.docs);
  });
});

router.delete(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const ref = req.params.ref;
    Merimee.findOneAndRemove({ REF: ref }, error => {
      if (error) {
        capture(error);
        return res.status(500).send({ error });
      }
      return res.status(200).send({});
    });
  }
);

module.exports = router;
