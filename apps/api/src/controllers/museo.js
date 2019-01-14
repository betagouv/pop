const express = require("express");
const router = express.Router();
const Museo = require("../models/museo");
const { formattedNow } = require("./utils");

function transformBeforeCreateOrUpdate(notice) {
  notice.DT_MODIF = formattedNow();
}

router.use("/:ref", async (req, res) => {
  const museo = await Museo.findOne({ REF: req.params.ref });
  if (museo) {
    return res.status(200).send(museo);
  }
  return res.sendStatus(404);
});

module.exports = router;
