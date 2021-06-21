const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const filenamify = require("filenamify");
const upload = multer({ dest: "uploads/" });
const { capture } = require("../sentry.js");
const Import = require("../models/import");
const { uploadFile } = require("./utils");

// Store import data (list of created, updated notices)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  async (req, res) => {
    /* 	
    #swagger.tags = ['Import']
    #swagger.path = '/import'
    #swagger.description = "Création d'un import"
  */
    try {
      const body = JSON.parse(req.body.import);
      const obj = new Import(body);
      const doc = await obj.save();

      for (let i = 0; i < req.files.length; i++) {
        const id = String(doc._id);
        const path = `import/${filenamify(id)}/${filenamify(req.files[i].originalname)}`;
        await uploadFile(path, req.files[i]);
      }
      return res.send({ success: true, msg: "OK", doc });
    } catch (e) {
      capture(JSON.stringify(e));
      return res.status(500).send({ success: false, msg: JSON.stringify(e) });
    }
  }
);

// Get imports count (for diffusion stats).
router.get("/count", async (req, res) => {
   /* 	
    #swagger.tags = ['Import']
    #swagger.path = '/import/count'
    #swagger.description = "Retourne le nombre total d\'import"
    #swagger.responses[200] = { 
      schema: 'number',
      description: 'Récupération des informations avec succés' 
    }
    #swagger.responses[500] = { 
      description: 'Erreur interne serveur',
      schema: {
        success: false,
        msg: "Erreur survenue lors de la récupération des données"
      } 
    }
  */
  let imports = null;
  try {
    imports = await Import.collection.estimatedDocumentCount({});
    res.status(200).send(String(imports));
  } catch (e) {
    capture(JSON.stringify(e));
    return res.status(500).send({ sucess: false, error: e });
  }
});

module.exports = router;
