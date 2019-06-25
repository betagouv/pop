const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const filenamify = require("filenamify");
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
  uploadFile,
  hasCorrectCoordinates,
  findPalissyProducteur
} = require("./utils");
const { capture } = require("./../sentry.js");
const passport = require("passport");
const { canUpdatePalissy, canCreatePalissy, canDeletePalissy } = require("./utils/authorization");

function transformBeforeCreateOrUpdate(notice) {
  notice.CONTIENT_IMAGE = notice.MEMOIRE && notice.MEMOIRE.some(e => e.url) ? "oui" : "non";

  if (notice.COORM && notice.ZONE) {
    const { coordinates } = convertCOORM(notice.COORM, notice.ZONE);
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
  notice.DISCIPLINE = notice.PRODUCTEUR = findPalissyProducteur(notice);
}

function transformBeforeUpdate(notice) {
  notice.DMAJ = formattedNow();
  transformBeforeCreateOrUpdate(notice);
}

async function checkPalissy(notice) {
  const errors = [];
  try {
    // Check contact.
    if (!notice.CONTACT) {
      errors.push("Le champ CONTACT ne doit pas être vide");
    }

    // Check coor.
    const { message } = lambertToWGS84(notice.COOR, notice.ZONE);
    if (message) {
      errors.push(message);
    }
    // Palissy
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
    capture(e);
  }

  return errors;
}

function transformBeforeCreate(notice) {
  notice.DMAJ = notice.DMIS = formattedNow();
  transformBeforeCreateOrUpdate(notice);
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
      transformBeforeUpdate(notice);

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

      transformBeforeCreate(notice);

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
    return res.status(200).send({ success: true, msg: "La notice à été supprimée." });
  } catch (error) {
    capture(error);
    return res.status(500).send({ success: false, error });
  }
});

module.exports = router;
