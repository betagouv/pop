const express = require("express")
const router = express.Router()
const passport = require("passport")
const validator = require("validator")
const mongoose = require("mongoose")

const Memoire = require("../models/memoire")
const Merimee = require("../models/merimee")
const Palissy = require("../models/palissy")
const Autor = require("../models/autor")
const Joconde = require("../models/joconde")
const Museo = require("../models/museo")


// Get one notice by ref.
router.get("", async (req, res) => {
    const ref = req.params.ref;
    const notice = await Joconde.findOne({ REF: ref });
    if (notice) {
      return res.status(200).send(notice);
    }
    return res.status(404).send({ success: false, msg: "Notice introuvable." });
  });