const passport = require("passport");
const express = require("express");
const { logger } = require("../logger");

const Memoire = require("../models/memoire");
const Merimee = require("../models/merimee");
const Palissy = require("../models/palissy");
const Joconde = require("../models/joconde");
const Museo = require("../models/museo");
const Mnr = require("../models/mnr");
const Enluminures = require("../models/enluminures");

const _ = require("lodash");

const router = express.Router();

const Notices = {
	memoire: Memoire,
	joconde: Joconde,
	merimee: Merimee,
	palissy: Palissy,
	museo: Museo,
	mnr: Mnr,
	enluminures: Enluminures,
};

/**
 * Fetch the existing notices for a given collection and a given file.
 * @param {string} collection - The collection to fetch notices from.
 * @param {File} file - The file to parse.
 * @returns {Promise<object[]>} - The found notices.
 */
const getExistingsNotices = async (collection, refs) => {
	const chunks = _.chunk(refs, 1000);
	logger.debug(`Will fetch ${chunks.length} chunks in ${collection}`);

	const noticeModel = Notices[collection];
	if (noticeModel == null) {
		throw new Error(`Collection ${collection} not found`);
	}

	let notices = await Promise.all(
		chunks.map((chunk) => noticeModel.find({ REF: { $in: chunk } })),
	);
	notices = _.flatten(notices);
	logger.debug(`Found ${notices.length} notices`);
	return notices;
};

// For a given collection and a given files, parse it and return found notices.
router.post(
	"/batch/:collection",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const { collection } = req.params;
		logger.debug(`Will fetch to collection ${collection}`);

		try {
			const notices = await getExistingsNotices(
				collection,
				req.body.refs,
			);
			res.status(200).json(notices);
		} catch (err) {
			res.status(400).json({
				message: "Erreur lors de la récupération des notices",
				error: err,
			});
		}
	},
);

module.exports = router;
