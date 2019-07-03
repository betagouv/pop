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
  hasCorrectCoordinates,
  hasCorrectPolygon,
  findMerimeeProducteur
} = require("./utils");
const { capture } = require("./../sentry.js");
const passport = require("passport");
const { canUpdateMerimee, canCreateMerimee, canDeleteMerimee } = require("./utils/authorization");

function transformBeforeCreateOrUpdate(notice) {
  notice.CONTIENT_IMAGE = notice.MEMOIRE && notice.MEMOIRE.some(e => e.url) ? "oui" : "non";

  // IF POLYGON IN LAMBERT, We convert it to a polygon in WGS84
  if (notice.COORM && notice.ZONE) {
    // Convert it to a proper format in WGS84
    const { coordinates } = convertCOORM(notice.COORM, notice.ZONE);
    notice["POP_COORDINATES_POLYGON"] = { type: "Polygon", coordinates };
  }

  //If COOR in Lambert and not correct coordinates, convert this to WGS84.
  if (notice.COOR && notice.ZONE && !hasCorrectCoordinates(notice)) {
    notice.POP_COORDONNEES = lambertToWGS84(notice.COOR, notice.ZONE);
  }

  //If no correct coordinates, get polygon centroid.
  if (hasCorrectPolygon(notice) && !hasCorrectCoordinates(notice)) {
    const centroid = getPolygonCentroid(coordinates);
    if (centroid && centroid.length == 2) {
      notice.POP_COORDONNEES = { lat: centroid[0], lon: centroid[1] };
    }
  }

  // To prevent crash on ES
  if (!notice.POP_COORDONNEES && !hasCorrectCoordinates(notice)) {
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
  notice.DISCIPLINE = notice.PRODUCTEUR = findMerimeeProducteur(notice);
}

function transformBeforeUpdate(notice) {
  notice.DMAJ = formattedNow();
  transformBeforeCreateOrUpdate(notice);
}

function transformBeforeCreate(notice) {
  notice.DMAJ = notice.DMIS = formattedNow();
  transformBeforeCreateOrUpdate(notice);
}

async function checkMerimee(notice) {
  const errors = [];
  try {
    if (!notice.CONTACT) {
      // Check contact.
      errors.push("Le champ CONTACT ne doit pas être vide");
    }

    const { message } = lambertToWGS84(notice.COOR, notice.ZONE); // Check coor
    if (message) {
      errors.push(message);
    }

    if (!notice.TICO && !notice.TITR) {
      // Check Title
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
    capture(e);
  }

  return errors;
}

function checkIfMemoireImageExist(notice) {
  return new Promise(async (resolve, reject) => {
    try {
      // Here, we update the images and we keep the order ( !! important )
      const NoticesMemoire = await Memoire.find({ LBASE: notice.REF });
      const arr = NoticesMemoire.map(e => {
        const NAME = e.TICO || e.LEG || `${e.EDIF || ""} ${e.OBJ || ""}`.trim();
        return { ref: e.REF, url: e.IMG, copy: e.COPY, name: NAME };
      });

      const newArr = (notice.MEMOIRE || []).filter(e => arr.find(f => f.ref == e.ref));
      for (let i = 0; i < arr.length; i++) {
        if (!newArr.find(e => e.REF === arr[i].REF)) {
          newArr.push(arr[i]);
        }
      }
      resolve(newArr);
    } catch (e) {
      capture(e);
      reject(e);
    }
  });
}

function populateREFO(notice) {
  return new Promise(async (resolve, _reject) => {
    const objs = await Palissy.find({ REFA: notice.REF });
    const REFO = objs.map(e => e.REF);
    resolve(REFO);
  });
}

// Generate new ID from notice information (department + prefix)
router.get("/newId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const prefix = req.query.prefix;
    const dpt = req.query.dpt;

    if (!prefix || !dpt) {
      return res.status(500).send({ error: "dpt ou prefix manquants" });
    }
    const id = await getNewId(Merimee, prefix, dpt);
    return res.status(200).send({ success: true, id });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

// Update a notice by ref.
router.put(
  "/:ref",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    try {
      const ref = req.params.ref;
      const notice = JSON.parse(req.body.notice);

      const prevNotice = await Merimee.findOne({ REF: ref });
      if (!canUpdateMerimee(req.user, prevNotice, notice)) {
        return res.status(401).send({
          success: false,
          msg: "Autorisation nécessaire pour mettre à jour cette ressource."
        });
      }

      if (notice.MEMOIRE) {
        notice.MEMOIRE = await checkIfMemoireImageExist(notice);
      }
      notice.REFO = await populateREFO(notice);

      // Update IMPORT ID (this code is unclear…)
      if (notice.POP_IMPORT.length) {
        const id = notice.POP_IMPORT[0];
        delete notice.POP_IMPORT;
        notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
      }

      const promises = [];
      for (let i = 0; i < req.files.length; i++) {
        const path = `merimee/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
        promises.push(uploadFile(path, req.files[i]));
      }

      // Prepare and update notice.
      transformBeforeUpdate(notice);
      promises.push(updateNotice(Merimee, ref, notice));
      await Promise.all(promises);
      res.status(200).send({ success: true, msg: "OK" });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, msg: JSON.stringify(e) });
    }
  }
);

// Create a new notice.
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    try {
      const notice = JSON.parse(req.body.notice);
      if (!canCreateMerimee(req.user, notice)) {
        return res
          .status(401)
          .send({ success: false, msg: "Autorisation nécessaire pour créer cette ressource." });
      }
      notice.MEMOIRE = await checkIfMemoireImageExist(notice);
      notice.REFO = await populateREFO(notice);
      transformBeforeCreate(notice);

      const promises = [];
      const doc = new Merimee(notice);
      checkESIndex(doc);
      promises.push(doc.save());

      for (let i = 0; i < req.files.length; i++) {
        const path = `merimee/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`;
        promises.push(uploadFile(path, req.files[i]));
      }

      await Promise.all(promises);
      res.status(200).send({ success: true, msg: "OK" });
    } catch (e) {
      capture(e);
      res.status(500).send({ success: false, msg: JSON.stringify(e) });
    }
  }
);

// Get one notice by ref.
router.get("/:ref", async (req, res) => {
  const ref = req.params.ref;
  const notice = await Merimee.findOne({ REF: ref });
  if (notice) {
    return res.status(200).send(notice);
  }
  return res.status(404).send({ success: false, msg: "Notice introuvable." });
});

// Delete one notice.
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const ref = req.params.ref;
    const doc = await Merimee.findOne({ REF: ref });
    if (!doc) {
      return res.status(404).send({
        success: false,
        msg: `Impossible de trouver la notice merimee ${ref} à supprimer.`
      });
    }
    if (!canDeleteMerimee(req.user, doc)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour supprimer cette ressource." });
    }
    return res.status(200).send({ success: true, msg: "La notice à été supprimée." });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

module.exports = router;
