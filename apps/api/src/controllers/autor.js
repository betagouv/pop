const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Autor = require("../models/autor");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/:ref", async (req, res) => {
  const autor = await Autor.findOne({ REF: req.params.ref });
  if (autor) {
    return res.status(200).send(autor);
  }
  return res.sendStatus(404);
});

module.exports = router;
