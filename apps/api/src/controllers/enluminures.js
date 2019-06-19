const express = require("express");
const router = express.Router();
const Enluminures = require("../models/enluminures");

router.get("/:ref", async (req, res) => {
  const doc = await Enluminures.findOne({ REF: req.params.ref });
  if (doc) {
    return res.status(200).send(doc);
  }
  return res.status(404).send({ success: false, msg: "Document introuvable" });
});

module.exports = router;
