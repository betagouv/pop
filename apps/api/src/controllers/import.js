const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const filenamify = require("filenamify");
const upload = multer({ dest: "uploads/" });
const { capture } = require("../sentry.js");
const Import = require("../models/import");
const { uploadFile, fileAuthorized } = require("./utils");


// Get one notice by ref.
router.put("/:id",
  passport.authenticate("jwt", { session: false }),
  upload.any(), 
  async (req, res) => {
  /* 	
     #swagger.tags = ['Import']
     #swagger.path = '/import/{id}'
     #swagger.description = 'Retourne les informations sur un import' 
     #swagger.parameters['id'] = { 
       in: 'path', 
       description: 'Référence de l'import',
       type: 'string' 
     }
     #swagger.responses[200] = { 
       description: 'Mise à jour des informations avec succés' 
     }
     #swagger.responses[403] = { 
       description: 'Erreur pendant la mise à jour',
       schema: {
         success: false,
         msg: "erreur"
       } 
     }
  */

  try { 
    const id = String(req.params.id);
    const body = JSON.parse(req.body.import);
    await Import.updateOne({ _id: mongoose.Types.ObjectId(`${id}`) }, { $set: body });

    for (let i = 0; i < req.files.length; i++) {
      const f = req.files[i];
      if(!fileAuthorized.includes(f.mimetype)){
        throw new Error("le type fichier n'est pas accepté")      
      }
      const path = `import/${filenamify(id)}/${filenamify(f.originalname)}`;
      await uploadFile(path, f);
    }
    return res.send({ success: true, msg: "OK" });
  } catch (e) {
    capture(JSON.stringify(e));
    return res.status(403).send({ success: false, msg: JSON.stringify(e) });
  }
});

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
        const f = req.files[i];
        if(!fileAuthorized.includes(f.mimetype)){
          throw new Error("le type fichier n'est pas accepté")      
        }
        const path = `import/${filenamify(id)}/${filenamify(f.originalname)}`;
        await uploadFile(path, f);
      }
      return res.send({ success: true, msg: "OK", doc });
    } catch (e) {
      capture(JSON.stringify(e));
      return res.status(403).send({ success: false, msg: JSON.stringify(e) });
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
