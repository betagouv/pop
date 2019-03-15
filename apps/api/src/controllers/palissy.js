const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const upload = multer({ dest: "uploads/" });
const Memoire = require("../models/memoire");
const Merimee = require("../models/merimee");
const Palissy = require("../models/palissy");
const {
  formattedNow,
  getNewId,
  checkESIndex,
  updateNotice,
  lambertToWGS84,
  getPolygonCentroid,
  fixLink,
  convertCOORM,
  hasCorrectCoordinates
} = require("./utils");

const { capture } = require("./../sentry.js");
const passport = require("passport");

function transformBeforeCreateOrUpdate(notice) {
  notice.CONTIENT_IMAGE = notice.MEMOIRE && notice.MEMOIRE.length ? "oui" : "non";

  if (notice.COORM && notice.ZONE) {
    const { coordinates, message } = convertCOORM(notice.COORM, notice.ZONE);
    notice["POP_COORDINATES_POLYGON"] = {
      type: "Polygon",
      coordinates
    };
    if (!notice.COOR && !hasCorrectCoordinates(notice)) {
      const centroid = getPolygonCentroid(coordinates);
      if (centroid && centroid.length == 2) {
        notice.POP_COORDONNEES = {
          lat: centroid[0],
          lon: centroid[1]
        };
      }
    }
  }

  if (notice.COOR && notice.ZONE && !hasCorrectCoordinates(notice)) {
    notice.POP_COORDONNEES = lambertToWGS84(notice.COOR, notice.ZONE);
  }
  if (notice.POP_COORDONNEES && !hasCorrectCoordinates(notice)) {
    notice.POP_COORDONNEES = { lat: 0, lon: 0 };
  }
  notice.POP_CONTIENT_GEOLOCALISATION = hasCorrectCoordinates(notice) ? "oui" : "non";
  if (notice.DOSURL) {
    notice.DOSURL = fixLink(notice.DOSURL);
  }
  if (notice.DOSURLPDF) {
    notice.DOSURLPDF = fixLink(notice.DOSURLPDF);
  }
  if (notice.LIENS && Array.isArray(notice.LIENS)) {
    notice.LIENS = notice.LIENS.map(fixLink);
  }
}

function transformBeforeUpdate(notice) {
  notice.DMAJ = formattedNow();
  transformBeforeCreateOrUpdate(notice);
}

async function checkPalissy(notice) {
  const errors = [];
  try {
    //Check contact
    if (!notice.CONTACT) {
      errors.push("Le champ CONTACT ne doit pas être vide");
    }

    //Check coor
    const { message } = lambertToWGS84(notice.COOR, notice.ZONE);
    if (message) {
      errors.push(message);
    }
    //Palissy
    if (!notice.TICO && !notice.TITR) {
      errors.push("Cette notice devrait avoir un TICO ou un TITR");
    }

    const { RENV, REFP, REFE, REFA } = notice;
    if (RENV && RENV.length) {
      const doc = await Merimee.findOne({ REF: RENV[0] });
      if (!doc) {
        errors.push(`Le champ RENV ${RENV[0]} pointe vers une notice absente`);
      }
    }
    if (REFP && REFP.length) {
      const doc = await Merimee.findOne({ REF: REFP[0] });
      if (!doc) {
        errors.push(`Le champ REFP ${REFP[0]} pointe vers une notice absente`);
      }
    }
    if (REFE && REFE.length) {
      const doc = await Merimee.findOne({ REF: REFE[0] });
      if (!doc) {
        errors.push(`Le champ REFE ${REFE[0]} pointe vers une notice absente`);
      }
    }
    if (REFA && REFA.length) {
      const doc = await Merimee.findOne({ REF: REFA[0] });
      if (!doc) {
        errors.push(`Le champ REFA ${REFA[0]} pointe vers une notice absente`);
      }
    }
  } catch (e) {
    console.log(e);
  }

  return errors;
}

function transformBeforeCreate(notice) {
  notice.DMAJ = notice.DMIS = formattedNow();
  transformBeforeCreateOrUpdate(notice);

  switch (notice.REF.substring(0, 2)) {
    case "IM":
      notice.DISCIPLINE = notice.PRODUCTEUR = "Inventaire";
      break;
    case "PM":
      notice.DISCIPLINE = notice.PRODUCTEUR = "Monuments Historiques";
      break;
    case "EM":
      notice.DISCIPLINE = notice.PRODUCTEUR = "Etat";
      break;
    default:
      notice.DISCIPLINE = notice.PRODUCTEUR = "Autre";
      break;
  }
}

function checkIfMemoireImageExist(notice) {
  return new Promise(async (resolve, reject) => {
    const obj = await Memoire.find({ LBASE: notice.REF });
    if (obj) {
      const arr = obj.map(e => {
        return { ref: e.REF, url: e.IMG };
      });
      resolve(arr);
      return;
    }
    resolve([]);
  });
}

function populateMerimeeREFO(notice) {
  return new Promise(async (resolve, reject) => {
    if (!Array.isArray(notice.REFA)) {
      resolve();
      return;
    }
    for (var i = 0; i < notice.REFA.length; i++) {
      const obj = await Merimee.findOne({ REF: notice.REFA[i] });
      if (obj && Array.isArray(obj.REFO) && !obj.REFO.includes(notice.REF)) {
        obj.REFO.push(notice.REF);
        await obj.save();
      }
    }
    resolve();
  });
}

router.get("/newId", passport.authenticate("jwt", { session: false }), (req, res) => {
  const prefix = req.query.prefix;
  const dpt = req.query.dpt;

  if (!prefix || !dpt) {
    return res.status(500).send({ error: "Missing dpt or prefix" });
  }

  getNewId(Palissy, prefix, dpt)
    .then(id => {
      return res.status(200).send({ id });
    })
    .catch(error => {
      return res.status(500).send({ error });
    });
});

router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    try {
      const ref = req.params.ref;
      const notice = JSON.parse(req.body.notice);
      const arr = await checkIfMemoireImageExist(notice);
      notice.MEMOIRE = arr;

      //Update IMPORT ID
      if (notice.POP_IMPORT.length) {
        const id = notice.POP_IMPORT[0];
        delete notice.POP_IMPORT;
        notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
      }

      //Add generate fields
      transformBeforeUpdate(notice);

      await updateNotice(Palissy, ref, notice);

      await populateMerimeeREFO(notice);
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
      const arr = await checkIfMemoireImageExist(notice);
      await populateMerimeeREFO(notice);
      notice.MEMOIRE = arr;
      //Add generate fields
      transformBeforeCreate(notice);

      const obj = new Palissy(notice);
      //send error if obj is not well sync with ES
      checkESIndex(obj);
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
  Palissy.findOne({ REF: ref }, (err, notice) => {
    if (err) {
      capture(err);
      return res.status(500).send(err);
    }
    if (!notice) {
      return res.sendStatus(404);
    }
    res.status(200).send(notice);
  });
});

router.get("/", (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  Palissy.paginate({}, { offset, limit }).then(results => {
    res.status(200).send(results.docs);
  });
});

router.delete("/:ref", passport.authenticate("jwt", { session: false }), (req, res) => {
  const ref = req.params.ref;
  Palissy.findOneAndRemove({ REF: ref }, error => {
    if (error) {
      capture(error);
      return res.status(500).send({ error });
    }
    return res.status(200).send({});
  });
});

module.exports = router;
