const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const router = express.Router();
const multer = require("multer");
const filenamify = require("filenamify");
const upload = multer({ dest: "uploads/" });
const { capture } = require("../sentry.js");
const { uploadFile } = require("./utils");
const Gallery = require("../models/gallery");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ limit: "200kb" }));

router.get("/:id", async (req, res) => {
  /* 	
      #swagger.tags = ['Gallery']
      #swagger.path = '/gallery/{id}'
      #swagger.description = 'Retourne les informations de la notice gallery (permaliens MNR)' 
      #swagger.parameters['id'] = { 
        in: 'path', 
        description: 'Identifiant de la notice gallery',
        type: 'string' 
      }
      #swagger.responses[200] = { 
        schema: { 
          "$ref": '#/definitions/GetGallery'
        },
        description: 'Récupération des informations avec succés' 
      }
      #swagger.responses[404] = { 
        description: 'Document non trouvé',
        schema: {
          success: false,
          msg: "Document introuvable"
        } 
      }
  */

  let doc;
  try {
    doc = await Gallery.findById(req.params.id);
  } catch (e) {}
  return doc
    ? res.status(200).send(doc)
    : res.status(404).send({ success: false, msg: "Document introuvable" });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30 // limit each IP to 30 requests per windowMs
});

router.post("/", limiter, upload.any(), async (req, res) => {
   /* 	
      #swagger.tags = ['Gallery']
      #swagger.path = '/gallery'
  */
  try {
    const data = JSON.parse(req.body.gallery);
    if (!data) {
      return res.status(400).send({ success: false, msg: "Données manquantes" });
    }
    // Create and save the gallery with its data.
    const gallery = new Gallery(data);
    const doc = await gallery.save();

    // Save the associated image if present.
    if (req.files && req.files.length && req.files[0].originalname) {
      const imagePath = `gallery/${filenamify(doc._id)}/${filenamify(req.files[0].originalname)}`;
      await uploadFile(imagePath, req.files[0]);
      doc.image = imagePath;
      await doc.save();
    }

    return res.status(200).send({ success: true, doc });
  } catch (e) {
    capture(e);
    return res.status(500).send({ success: false, msg: "Impossible de traiter les données." });
  }
});

module.exports = router;
