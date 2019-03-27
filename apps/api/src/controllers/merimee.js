const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const filenamify = require("filenamify");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const Merimee = require("../models/merimee");
const Palissy = require("../models/palissy");
const Memoire = require("../models/memoire");
const {
  formattedNow,
  checkESIndex,
  updateNotice,
  lambertToWGS84,
  getPolygonCentroid,
  convertCOORM,
  fixLink,
  getNewId,
  uploadFile,
  hasCorrectCoordinates
} = require("./utils");
const { capture } = require("./../sentry.js");
const passport = require("passport");

function transformBeforeCreateOrUpdate(notice) {
  notice.CONTIENT_IMAGE = notice.MEMOIRE && notice.MEMOIRE.some(e => e.url) ? "oui" : "non";

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

function transformBeforeCreate(notice) {
  notice.DMAJ = notice.DMIS = formattedNow();
  transformBeforeCreateOrUpdate(notice);
  switch (notice.REF.substring(0, 2)) {
    case "IA":
      notice.DISCIPLINE = notice.PRODUCTEUR = "Inventaire";
      break;
    case "PA":
      notice.DISCIPLINE = notice.PRODUCTEUR = "Monuments Historiques";
      break;
    case "EA":
      notice.DISCIPLINE = notice.PRODUCTEUR = "Architecture";
      break;
    default:
      notice.DISCIPLINE = notice.PRODUCTEUR = "Autre";
      break;
  }
}

async function checkMerimee(notice) {
  const errors = [];
  try {
    if (!notice.CONTACT) {
      //Check contact
      errors.push("Le champ CONTACT ne doit pas être vide");
    }

    const { message } = lambertToWGS84(notice.COOR, notice.ZONE); //Check coor
    if (message) {
      errors.push(message);
    }

    if (!notice.TICO && !notice.TITR) {
      // check Title
      errors.push("Cette notice devrait avoir un TICO ou un TITR");
    }

    const { RENV, REFP, REFE, REFO } = notice; // check Links
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
    if (REFO && REFO.length) {
      const doc = await Palissy.findOne({ REF: REFO[0] });
      if (!doc) {
        errors.push(`Le champ REFO ${REFO[0]} pointe vers une notice absente`);
      }
    }
  } catch (e) {
    console.log(e);
  }

  return errors;
}

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
  return new Promise(async (resolve, _reject) => {
    const objs = await Palissy.find({ REFA: notice.REF });
    const REFO = objs.map(e => e.REF);
    resolve(REFO);
  });
}

router.get("/newId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const prefix = req.query.prefix;
    const dpt = req.query.dpt;

    if (!prefix || !dpt) {
      return res.status(500).send({ error: "Missing dpt or prefix" });
    }
    const id = await getNewId(Merimee, prefix, dpt);
    return res.status(200).send({ id });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    try {
      const ref = req.params.ref;
      const notice = JSON.parse(req.body.notice);
      notice.MEMOIRE = await checkIfMemoireImageExist(notice);
      notice.REFO = await populateREFO(notice);

      //Update IMPORT ID
      if (notice.POP_IMPORT.length) {
        const id = notice.POP_IMPORT[0];
        delete notice.POP_IMPORT;
        notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
      }

      const arr = [];

      for (let i = 0; i < req.files.length; i++) {
        arr.push(
          uploadFile(
            `merimee/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`,
            req.files[i]
          )
        );
      }
      //Add generate fields
      transformBeforeUpdate(notice);

      arr.push(updateNotice(Merimee, ref, notice));

      await Promise.all(arr);

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
      notice.MEMOIRE = await checkIfMemoireImageExist(notice);
      notice.REFO = await populateREFO(notice);
      transformBeforeCreate(notice);

      const obj = new Merimee(notice);
      checkESIndex(obj);

      const arr = [];
      arr.push(obj.save());

      for (let i = 0; i < req.files.length; i++) {
        arr.push(
          uploadFile(
            `merimee/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`,
            req.files[i]
          )
        );
      }

      await Promise.all(arr);
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

router.delete("/:ref", passport.authenticate("jwt", { session: false }), (req, res) => {
  const ref = req.params.ref;
  Merimee.findOneAndRemove({ REF: ref }, error => {
    if (error) {
      capture(error);
      return res.status(500).send({ error });
    }
    return res.status(200).send({});
  });
});

module.exports = router;
