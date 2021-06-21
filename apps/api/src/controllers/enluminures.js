const express = require("express");
const router = express.Router();
const Enluminures = require("../models/enluminures");

router.get("/:ref", async (req, res) => {
  /* 	
    #swagger.tags = ['Enluminures']
    #swagger.path = '/enluminures/{ref}'
    #swagger.description = "Retourne les informations de la notice enluminure par rapport à la référence"
    #swagger.parameters['ref'] = { 
      in: 'path', 
      description: 'Référence de la notice enluminure',
      type: 'string' 
    }
    #swagger.responses[200] = { 
      schema: { 
        "$ref": '#/definitions/GetEnluminures'
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

  const doc = await Enluminures.findOne({ REF: req.params.ref });
  if (doc) {
    return res.status(200).send(doc);
  }
  return res.status(404).send({ success: false, msg: "Document introuvable" });
});

module.exports = router;
