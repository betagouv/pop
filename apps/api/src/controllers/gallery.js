const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const router = express.Router();
const Gallery = require("../models/gallery");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ limit: "200kb" }));

router.get("/:id", async (req, res) => {
  let doc;
  try {
    doc = await Gallery.findById(req.params.id);
  } catch (e) {}
  return doc ? res.status(200).send(doc) : res.sendStatus(404);
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30 // limit each IP to 100 requests per windowMs
});

router.post("/", limiter, async (req, res) => {
  const params = req.body.params;
  let doc;
  if (!params) {
    return res.sendStatus(400);
  }
  try {
    const gallery = new Gallery({params});
    doc = await gallery.save();
  } catch (e) {
    console.log(e)
  }
  return doc ? res.status(200).send(doc) : res.sendStatus(400);
});

module.exports = router;
