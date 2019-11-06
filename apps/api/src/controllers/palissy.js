const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const filenamify = require("filenamify");
const validator = require("validator");
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
  convertCOORM,
  uploadFile,
  hasCorrectCoordinates,
  hasCorrectPolygon,
  findPalissyProducteur
} = require("./utils");
const { capture } = require("./../sentry.js");
const passport = require("passport");
const { canUpdatePalissy, canCreatePalissy, canDeletePalissy } = require("./utils/authorization");

const regions = require("./utils/regions");
const { getDepartement } = require("./utils/departments");

// Control properties document, flag each error.
async function withFlags(notice) {
  notice.POP_FLAGS = [];
  // Required properties.
  ["DOSS", "ETUD", "COPY", "TICO", "CONTACT", "REF"]
    .filter(prop => !notice[prop])
    .forEach(prop => notice.POP_FLAGS.push(`${prop}_EMPTY`));
  // If "existingProp" exists then "requiredProp" must not be empty.
  [["PROT", "DPRO"], ["COM", "WCOM"], ["ADRS", "WADRS"]]
    .filter(([existingProp, requiredProp]) => notice[existingProp] && !notice[requiredProp])
    .forEach(([existingProp, requiredProp]) =>
      notice.POP_FLAGS.push(`${existingProp}_REQUIRED_FOR_${requiredProp}`)
    );
  // DPT must be 2 char or more.
  if (notice.DPT && notice.DPT.length < 2) {
    notice.POP_FLAGS.push("DPT_LENGTH_2");
  }
  // INSEE must be 5 char or more.
  if (notice.INSEE && notice.INSEE.length < 5) {
    notice.POP_FLAGS.push("INSEE_LENGTH_5");
  }
  // INSEE & DPT must start with the same first 2 letters.
  if (notice.INSEE && notice.DPT && notice.INSEE.substring(0, 2) !== notice.DPT.substring(0, 2)) {
    notice.POP_FLAGS.push("INSEE_DPT_MATCH_FAIL");
  }
  // REF must be an Alphanumeric.
  if (!validator.isAlphanumeric(notice.REF)) {
    notice.POP_FLAGS.push("REF_INVALID_ALNUM");
  }
  // DOSURL and DOSURLPDF must be valid URLs.
  ["DOSURL", "DOSURLPDF"]
    .filter(prop => notice[prop] && !validator.isURL(notice[prop]))
    .forEach(prop => notice.POP_FLAGS.push(`${prop}_INVALID_URL`));
  // CONTACT must be an email.
  if (notice.CONTACT && !validator.isEmail(notice.CONTACT)) {
    notice.POP_FLAGS.push("CONTACT_INVALID_EMAIL");
  }
  // Region should exist.
  if (notice.REG && !regions.includes(notice.REG)) {
    notice.POP_FLAGS.push("REG_INVALID");
  }
  // Reference not found (RENV, REFP, REFE, REFA)
  // Reference not found RENV
  if (notice.RENV) {
    for (let i = 0; i < notice.RENV.length; i++) {
      if (!(await Merimee.exists({ REF: notice.RENV[i] }))) {
        notice.POP_FLAGS.push("RENV_REF_NOT_FOUND");
      }
    }
  }
  // Reference not found REFP
  if (notice.REFP) {
    for (let i = 0; i < notice.REFP.length; i++) {
      if (!(await Merimee.exists({ REF: notice.REFP[i] }))) {
        notice.POP_FLAGS.push("REFP_REF_NOT_FOUND");
      }
    }
  }
  // Reference not found REFE
  if (notice.REFE) {
    for (let i = 0; i < notice.REFE.length; i++) {
      if (!(await Merimee.exists({ REF: notice.REFE[i] }))) {
        notice.POP_FLAGS.push("REFE_REF_NOT_FOUND");
      }
    }
  }
  // Reference not found REFA
  if (notice.REFA) {
    for (let i = 0; i < notice.REFA.length; i++) {
      if (!(await Merimee.exists({ REF: notice.REFA[i] }))) {
        notice.POP_FLAGS.push("REFA_REF_NOT_FOUND");
      }
    }
  }
  return notice;
}

async function transformBeforeCreateOrUpdate(notice) {
  notice.CONTIENT_IMAGE = notice.MEMOIRE && notice.MEMOIRE.some(e => e.url) ? "oui" : "non";

  // IF POLYGON IN LAMBERT, We convert it to a polygon in WGS84
  if (notice.COORM && notice.ZONE) {
    // Convert it to a proper format in WGS84
    const { coordinates } = convertCOORM(notice.COORM, notice.ZONE);
    notice["POP_COORDINATES_POLYGON"] = { type: "Polygon", coordinates };
  }

  if (notice.DPT) {
    const DPT_LETTRE = getDepartement(notice.DPT);
    if (DPT_LETTRE) {
      notice.DPT_LETTRE = DPT_LETTRE;
    }
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
  notice.DISCIPLINE = notice.PRODUCTEUR = findPalissyProducteur(notice);

  notice = await withFlags(notice);
}

async function transformBeforeUpdate(notice) {
  notice.DMAJ = formattedNow();
  await transformBeforeCreateOrUpdate(notice);
}

async function transformBeforeCreate(notice) {
  notice.DMAJ = notice.DMIS = formattedNow();
  await transformBeforeCreateOrUpdate(notice);
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

function populateMerimeeREFO(notice) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!Array.isArray(notice.REFA)) {
        resolve();
        return;
      }
      const promises = [];
      const merimees = await Merimee.find({ REFO: notice.REF });

      for (let i = 0; i < merimees.length; i++) {
        // If the object is removed from notice, then remove it from palissy
        if (!notice.REFA.includes(merimees[i].REF)) {
          merimees[i].REFO = merimees[i].REFO.filter(e => e !== notice.REF);
          promises.push(merimees[i].save());
        }
      }

      for (let i = 0; i < notice.REFA.length; i++) {
        if (!merimees.find(e => e.REF === notice.REFA[i])) {
          const obj = await Merimee.findOne({ REF: notice.REFA[i] });
          if (obj && Array.isArray(obj.REFO) && !obj.REFO.includes(notice.REF)) {
            obj.REFO.push(notice.REF);
            promises.push(obj.save());
          }
        }
      }
      await Promise.all(promises);
      resolve();
    } catch (error) {
      capture(error);
      resolve();
    }
  });
}

router.get("/newId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const prefix = req.query.prefix;
  const dpt = req.query.dpt;
  try {
    if (!prefix || !dpt) {
      return res.status(500).send({ success: false, error: "Missing dpt or prefix" });
    }
    const id = await getNewId(Palissy, prefix, dpt);
    return res.status(200).send({ success: true, id });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
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

      const prevNotice = await Palissy.findOne({ REF: ref });
      if (!canUpdatePalissy(req.user, prevNotice, notice)) {
        return res.status(401).send({
          success: false,
          msg: "Autorisation nécessaire pour mettre à jour cette ressource."
        });
      }

      if (notice.MEMOIRE) {
        notice.MEMOIRE = await checkIfMemoireImageExist(notice);
      }
      // Update IMPORT ID
      if (notice.POP_IMPORT.length) {
        const id = notice.POP_IMPORT[0];
        delete notice.POP_IMPORT;
        notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
      }

      // Add generate fields
      await transformBeforeUpdate(notice);
      const obj = new Palissy(notice);
      checkESIndex(obj);

      const promises = [];

      for (let i = 0; i < req.files.length; i++) {
        promises.push(
          uploadFile(
            `palissy/${filenamify(notice.REF)}/${filenamify(req.files[i].originalname)}`,
            req.files[i]
          )
        );
      }

      promises.push(updateNotice(Palissy, ref, notice));
      promises.push(populateMerimeeREFO(notice));

      await Promise.all(promises);

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
      if (!canCreatePalissy(req.user, notice)) {
        return res
          .status(401)
          .send({ success: false, msg: "Autorisation nécessaire pour créer cette ressource." });
      }
      notice.MEMOIRE = await checkIfMemoireImageExist(notice);
      await populateMerimeeREFO(notice);

      await transformBeforeCreate(notice);

      const obj = new Palissy(notice);
      checkESIndex(obj);

      const promises = [];
      promises.push(obj.save());

      for (let i = 0; i < req.files.length; i++) {
        promises.push(
          uploadFile(`palissy/${notice.REF}/${req.files[i].originalname}`, req.files[i])
        );
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
  const notice = await Palissy.findOne({ REF: ref });
  if (notice) {
    return res.status(200).send(notice);
  }
  return res.status(404).send({ success: false, msg: "Notice introuvable." });
});

// Delete one notice.
router.delete("/:ref", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const ref = req.params.ref;
    const doc = await Palissy.findOne({ REF: ref });
    if (!doc) {
      return res.status(404).send({
        success: false,
        msg: `Impossible de trouver la notice palissy ${ref} à supprimer.`
      });
    }
    if (!canDeletePalissy(req.user, doc)) {
      return res
        .status(401)
        .send({ success: false, msg: "Autorisation nécessaire pour supprimer cette ressource." });
    }
    await doc.remove();
    return res.status(200).send({ success: true, msg: "La notice à été supprimée." });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

module.exports = router;
