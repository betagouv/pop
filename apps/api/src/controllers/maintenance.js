const express = require("express");
const router = express.Router();

// Get one notice by ref.
router.get("/", async (req, res) => {
    return res.status(200).send({ maintenance: process.env.MAINTENANCE });
});

module.exports = router;