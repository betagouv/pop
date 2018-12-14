const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mongoose = require("mongoose");
const Memoire = require("../models/memoire");
const Merimee = require("../models/merimee");
const Palissy = require("../models/palissy");
const {
  uploadFile,
  formattedNow,
  checkESIndex,
  updateNotice,
  deleteFile
} = require("./utils");
const { capture } = require("./../sentry.js");
const passport = require("passport");

function findCollection(ref = "") {
  const prefix = ref.substring(0, 2);
  switch (prefix) {
    case "EA":
    case "PA":
    case "IA":
      return Merimee;
    case "IM":
    case "PM":
      return Palissy;
    default:
      return "";
  }
}

function transformBeforeUpdate(notice) {
  notice.CONTIENT_IMAGE = notice.IMG ? "oui" : "non";
  notice.DMAJ = formattedNow();
}

function transformBeforeCreate(notice) {
  notice.CONTIENT_IMAGE = notice.IMG ? "oui" : "non";
  notice.DMAJ = notice.DMIS = formattedNow();
  notice.PRODUCTEUR = findProducteur(notice.REF, notice.IDPROD, notice.EMET);
}

function findProducteur(REF, IDPROD, EMET) {
  if (
    String(REF).startsWith("IVN") ||
    String(REF).startsWith("IVR") ||
    String(REF).startsWith("IVD") ||
    String(REF).startsWith("IVC")
  ) {
    return "INV";
  } else if (String(REF).startsWith("OA")) {
    return "CAOA";
  } else if (String(REF).startsWith("MH")) {
    return "CRMH";
  } else if (String(REF).startsWith("AR")) {
    return "ARCH";
  } else if (
    String(REF).startsWith("AP") &&
    String(IDPROD).startsWith("Service départemental")
  ) {
    return "UDAP";
  } else if (
    String(IDPROD).startsWith("SAP") ||
    String(EMET).startsWith("SAP")
  ) {
    return "SAP";
  }
  return "AUTRE";
}

function getMerimeeOrPalissyNotice(LBASE) {
  return new Promise(async (resolve, reject) => {
    const collection = findCollection(LBASE);
    if (!collection) {
      console.log(`No collection ${LBASE}`);
      reject();
      return;
    }
    const notice = await collection.findOne({ REF: LBASE });
    resolve(notice);
  });
}

async function updateLinks(notice) {
  try {
    const REF = notice.REF;
    const URL = notice.IMG;
    let LBASE = notice.LBASE || [];
    const toAdd = [...LBASE];

    console.log("UPDATE LINKS");

    const palissyNotices = await Palissy.find({ "MEMOIRE.ref": REF });
    const merimeeNotices = await Merimee.find({ "MEMOIRE.ref": REF });

    console.log("DELETE PALISSY ");
    //Supression palissy
    for (let i = 0; i < palissyNotices.length; i++) {
      if (!LBASE.includes(palissyNotices[i].REF)) {
        await palissyNotices[i].update({ $pull: { MEMOIRE: { ref: REF } } });
        console.log("DELETED", palissyNotices[i].REF);
      } else {
        const index = toAdd.indexOf(palissyNotices[i].REF);
        if (index > -1) {
          toAdd.splice(index, 1);
        }
      }
    }

    console.log("DELETE Merimee ");
    //Supression Merimee
    for (let i = 0; i < merimeeNotices.length; i++) {
      if (!LBASE.includes(merimeeNotices[i].REF)) {
        await merimeeNotices[i].update({ $pull: { MEMOIRE: { ref: REF } } });
        console.log("DELETED", merimeeNotices[i].REF);
      } else {
        const index = toAdd.indexOf(merimeeNotices[i].REF);
        if (index > -1) {
          toAdd.splice(index, 1);
        }
      }
    }
    console.log("AJOUT  ");
    //Ajout
    for (let i = 0; i < toAdd.length; i++) {
      const notice = await getMerimeeOrPalissyNotice(toAdd[i]);
      if (notice) {
        notice.MEMOIRE.push({ ref: REF, url: URL });
        await notice.save();
      }
    }
  } catch (error) {
    capture(error);
  }
}
router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  (req, res) => {
    const ref = req.params.ref;
    const notice = JSON.parse(req.body.notice);

    const arr = [];
    for (let i = 0; i < req.files.length; i++) {
      //TODO
      //DELETE the current file IMAGE when update a new file

      arr.push(
        uploadFile(
          `memoire/${notice.REF}/${req.files[i].originalname}`,
          req.files[i]
        )
      );
    }

    //Update IMPORT ID
    if (notice.POP_IMPORT.length) {
      const id = notice.POP_IMPORT[0];
      delete notice.POP_IMPORT;
      notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
    }

    transformBeforeUpdate(notice);

    arr.push(updateLinks(notice));
    arr.push(updateNotice(Memoire, ref, notice));

    Promise.all(arr)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(e => {
        capture(e);
        res.sendStatus(500);
      });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  (req, res) => {
    const notice = JSON.parse(req.body.notice);

    notice.DMIS = notice.DMAJ = formattedNow();
    const arr = [];
    for (var i = 0; i < req.files.length; i++) {
      arr.push(
        uploadFile(
          `memoire/${notice.REF}/${req.files[i].originalname}`,
          req.files[i]
        )
      );
    }

    arr.push(updateLinks(notice));

    transformBeforeCreate(notice);

    const obj = new Memoire(notice);

    //send error if obj is not well sync with ES
    checkESIndex(obj);

    arr.push(obj.save());
    Promise.all(arr)
      .then(() => {
        res.send({ success: true, msg: "OK" });
      })
      .catch(error => {
        capture(error);
        res.sendStatus(500);
      });
  }
);

router.get("/", (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  Memoire.paginate({}, { offset, limit }).then(results => {
    res.status(200).send(results.docs);
  });
});

router.get("/:ref", (req, res) => {
  const ref = req.params.ref;
  Memoire.findOne({ REF: ref }, (err, notice) => {
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

router.delete(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const ref = req.params.ref;
      const doc = await Memoire.findOne({ REF: ref });
      if (!doc) {
        return res.status(500).send({
          error: `Je ne trouve pas la notice memoire ${ref} à supprimer`
        });
      }

      //DELETE LBASE
      doc.LBASE = [];
      await updateLinks(notice);

      const arr = [deleteFile(doc.IMG), doc.remove()];
      await Promise.all(arr);
      return res.status(200).send({});
    } catch (error) {
      capture(error);
      console.log("error", error);
      return res.status(500).send({
        error
      });
    }
  }
);

module.exports = router;
