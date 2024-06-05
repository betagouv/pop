const express = require("express");
const router = express.Router();
const axios = require("axios");
const _ = require("lodash");
const logger = require("../logger");

router.get("/search", async (req, res) => {
	if (req.query.q == null) {
		return res
			.status(400)
			.json({ message: "Query parameter 'q' is required." });
	}

	if (_.isEmpty(req.query.q) || req.query.q.length < 3) {
		logger.debug("Empty query");
		return res.status(200).json({ features: [] });
	}

	try {
		const response = await axios.get(
			"https://api-adresse.data.gouv.fr/search/",
			{
				params: {
					q: req.query.q,
				},
			},
		);

		return res.status(200).json(response.data);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;
