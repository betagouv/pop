const express = require("express");
const router = express.Router();

// Get maintenance status for diffusion app
router.get("/diffusion", async (req, res) => {
	return res.status(200).send({ maintenance: process.env.MAINTENANCE_DIFFUSION });
});

// Get maintenance status for production app
router.get("/production", async (req, res) => {
	return res.status(200).send({ maintenance: process.env.MAINTENANCE_PRODUCTION });
});

// Legacy endpoint - kept for backwards compatibility
router.get("/", async (req, res) => {
	return res.status(200).send({ maintenance: process.env.MAINTENANCE });
});

module.exports = router;
