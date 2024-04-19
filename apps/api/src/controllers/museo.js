const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const multer = require("multer");
const mongoose = require("mongoose");
const filenamify = require("filenamify");
const upload = multer({ dest: "uploads/" });
const Museo = require("../models/museo");
const Joconde = require("../models/joconde");
const Memoire = require("../models/memoire");
const Merimee = require("../models/merimee");
const Palissy = require("../models/palissy");
const NoticesOAI = require("../models/noticesOAI");
const { checkValidRef } = require("./utils/notice");
const moment = require("moment-timezone");
const { capture } = require("./../sentry.js");

const {
	formattedNow,
	deleteFile,
	uploadFile,
	updateOaiNotice,
	hasCorrectCoordinates,
	fileAuthorized,
} = require("./utils");
const { canUpdateMuseo, canDeleteMuseo } = require("./utils/authorization");
const { checkESIndex, identifyProducteur } = require("../controllers/utils");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

async function withFlags(notice) {
	//check refs
	notice.POP_FLAGS = await checkValidRef(
		notice.REFMEM,
		Memoire,
		notice.POP_FLAGS,
		"REFMEM",
	);
	notice.POP_FLAGS = await checkValidRef(
		notice.REFPAL,
		Palissy,
		notice.POP_FLAGS,
		"REFPAL",
	);
	notice.POP_FLAGS = await checkValidRef(
		notice.REFMER,
		Merimee,
		notice.POP_FLAGS,
		"REFMER",
	);

	return notice;
}

async function transformBeforeUpdate(notice) {
	notice.DMAJ = formattedNow();
	await transformBeforeCreateOrUpdate(notice);
}

async function transformBeforeCreate(notice) {
	notice.DMAJ = notice.DMIS = formattedNow();
	await transformBeforeCreateOrUpdate(notice);
}

async function transformBeforeCreateOrUpdate(notice) {
	notice.POP_FLAGS = [];

	if (notice.PHOTO !== undefined) {
		notice.CONTIENT_IMAGE = notice.PHOTO ? "oui" : "non";
	}

	//Si la notice contient des coordonnées, contient geolocalisation devient oui
	let lat = "";
	let lon = "";
	const coordonnees = { lat: 0, lon: 0 };

	if (notice["POP_COORDONNEES.lat"] || notice["POP_COORDONNEES.lon"]) {
		lat = String(notice["POP_COORDONNEES.lat"]);
		lon = String(notice["POP_COORDONNEES.lon"]);
	} else if (
		notice.POP_COORDONNEES &&
		(notice.POP_COORDONNEES.lat || notice.POP_COORDONNEES.lon)
	) {
		lat = String(notice.POP_COORDONNEES.lat);
		lon = String(notice.POP_COORDONNEES.lon);
	}

	if (lat || lon) {
		if (lat) {
			coordonnees.lat = Number.parseFloat(lat.replace(",", "."));
		}
		if (lon) {
			coordonnees.lon = Number.parseFloat(lon.replace(",", "."));
		}
		//Si lat et lon, alors POP_CONTIENT_GEOLOCALISATION est oui
		if (
			coordonnees.lat !== 0 &&
			!Number.isNaN(coordonnees.lat) &&
			coordonnees.lon !== 0 &&
			!Number.isNaN(coordonnees.lon)
		) {
			// Vérification de la cohérence des coordonnées
			if (
				!hasCorrectCoordinates({
					POP_COORDONNEES: {
						lat: coordonnees.lat,
						lon: coordonnees.lon,
					},
				})
			) {
				notice.POP_FLAGS.push("POP_COORDONNEES_NOT_RIGHT");
				coordonnees.lat = 0;
				coordonnees.lon = 0;
				notice.POP_CONTIENT_GEOLOCALISATION = "non";
			} else {
				notice.POP_CONTIENT_GEOLOCALISATION = "oui";
			}
		} else {
			notice.POP_CONTIENT_GEOLOCALISATION = "non";
		}
	} else {
		notice.POP_CONTIENT_GEOLOCALISATION = "non";
	}

	if (notice["POP_COORDONNEES.lat"] || notice["POP_COORDONNEES.lon"]) {
		notice["POP_COORDONNEES.lat"] = coordonnees.lat;
		notice["POP_COORDONNEES.lon"] = coordonnees.lon;
	} else {
		notice.POP_COORDONNEES = coordonnees;
	}

	//Attribution producteur
	const noticeProducteur = await identifyProducteur(
		"museo",
		notice.REF,
		"",
		"",
	);
	if (noticeProducteur) {
		notice.PRODUCTEUR = noticeProducteur;
	} else {
		notice.PRODUCTEUR = "";
	}

	notice = await withFlags(notice);
}

async function updateJocondeNotices(notice) {
	const { CONTACT_GENERIQUE, REGION, DPT, VILLE_M, NOMOFF } = notice;
	const obj = {};
	if (CONTACT_GENERIQUE !== undefined) {
		obj.CONTACT = CONTACT_GENERIQUE;
	}
	if (REGION !== undefined) {
		obj.REGION = REGION;
	}
	if (DPT !== undefined) {
		obj.DPT = DPT;
	}
	if (VILLE_M !== undefined) {
		obj.VILLE_M = VILLE_M;
	}
	if (NOMOFF !== undefined) {
		obj.NOMOFF = NOMOFF;
	}

	if (!Object.keys(obj).length) {
		return;
	}

	//update only needed
	const q = { $and: [{ MUSEO: notice.REF }] };
	for (let i = 0; i < Object.keys(obj).length; i++) {
		const key = Object.keys(obj)[i];
		q.$and.push({ [key]: { $ne: obj[key] } });
	}

	Joconde.find(q)
		.cursor()
		.eachAsync(async (model) => {
			await model.update(obj);
			await model.index();
		});
}

// Get one notice.
router.get("/:ref", async (req, res) => {
	/* 	
    #swagger.tags = ['Museo']
    #swagger.path = '/museo/{ref}'
    #swagger.description = 'Retourne les informations de la notice Museo' 
    #swagger.parameters['ref'] = { 
      in: 'path', 
      description: 'Référence de la notice Museo',
      type: 'string' 
    }
    #swagger.responses[200] = { 
      schema: { 
        "$ref": '#/definitions/GetMuseo'
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
	const museo = await Museo.findOne({ REF: req.params.ref });
	if (museo) {
		return res.status(200).send(museo);
	}
	return res.status(404).send({ success: false, msg: "Notice introuvable." });
});

// Update a notice.
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	upload.any(),
	async (req, res) => {
		/* 	
    #swagger.tags = ['Museo']
    #swagger.path = '/museo'
    #swagger.description = 'Création de la notice Museo' 
  */
		const notice = JSON.parse(req.body.notice);

		if (!notice || !notice.REF) {
			return res.status(400).json({
				success: false,
				msg: "Objet museo ou référence absente",
			});
		}

		// Update IMPORT ID (this code is unclear…)
		if (notice.POP_IMPORT.length) {
			const id = notice.POP_IMPORT[0];
			// biome-ignore lint/performance/noDelete: Need to really remove the POP_IMPORT field
			delete notice.POP_IMPORT;
			notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
		}

		await transformBeforeCreate(notice);

		const promises = [];
		try {
			if (notice.REFMEM && notice.REFMEM.length > 0) {
				promises.push(
					populateBaseFromMuseo(notice, notice.REFMEM, Memoire),
				);
			}
			if (notice.REFMER && notice.REFMER.length > 0) {
				promises.push(
					populateBaseFromMuseo(notice, notice.REFMER, Merimee),
				);
			}
			if (notice.REFPAL && notice.REFPAL.length > 0) {
				promises.push(
					populateBaseFromMuseo(notice, notice.REFPAL, Palissy),
				);
			}

			promises.push(updateJocondeNotices(notice));
			const oaiObj = {
				REF: notice.REF,
				BASE: "museo",
				DMAJ: notice.DMAJ,
			};
			const doc = new Museo(notice);
			const obj2 = new NoticesOAI(oaiObj);
			promises.push(doc.save());
			promises.push(obj2.save());
			checkESIndex(doc);

			// Upload images.
			for (let i = 0; i < req.files.length; i++) {
				const f = req.files[i];
				if (!fileAuthorized.includes(f.mimetype)) {
					throw new Error("le type fichier n'est pas accepté");
				}
				const path = `museo/${filenamify(notice.REF)}/${filenamify(
					f.originalname,
				)}`;
				promises.push(uploadFile(path, f));
			}

			await Promise.all(promises);

			res.status(200).send({ success: true, msg: "OK" });
		} catch (e) {
			capture(e);
			res.status(500).send({ success: false, error: JSON.stringify(e) });
		}
	},
);

// Update a notice.
router.put(
	"/:ref",
	passport.authenticate("jwt", { session: false }),
	upload.any(),
	async (req, res) => {
		/* 	
    #swagger.tags = ['Museo']
    #swagger.path = '/museo/[ref}'
    #swagger.description = 'Modification de la notice Museo' 
  */
		const notice = JSON.parse(req.body.notice);
		const updateMode = req.body.updateMode;
		const user = req.user;
		if (!notice || !notice.REF) {
			return res.status(400).json({
				success: false,
				msg: "Objet museo ou référence absente",
			});
		}

		// Check authorisation.
		const prevNotice = await Museo.findOne({ REF: notice.REF });
		if (!(await canUpdateMuseo(req.user, prevNotice, notice))) {
			return res.status(401).send({
				success: false,
				msg: "Autorisation nécessaire pour mettre à jour cette ressource.",
			});
		}
		const promises = [];

		// Upload images.
		for (let i = 0; i < req.files.length; i++) {
			const f = req.files[i];
			if (!fileAuthorized.includes(f.mimetype)) {
				throw new Error("le type fichier n'est pas accepté");
			}
			const path = `museo/${filenamify(notice.REF)}/${filenamify(
				f.originalname,
			)}`;
			promises.push(uploadFile(path, f));
		}

		// Update IMPORT ID (this code is unclear…)
		if (notice.POP_IMPORT.length) {
			const id = notice.POP_IMPORT[0];
			// biome-ignore lint/performance/noDelete: Need to really remove the POP_IMPORT field
			delete notice.POP_IMPORT;
			notice.$push = { POP_IMPORT: mongoose.Types.ObjectId(id) };
		}

		// Contrôle présence des coordonnées si la mise à jour concerne un import
		if ("import" === updateMode) {
			// Les coordonnées ne sont pas fournies, alors il faut reprendre les coordonnées déjà enregistrées
			if (
				typeof notice["POP_COORDONNEES.lon"] === "undefined" &&
				typeof notice["POP_COORDONNEES.lat"] === "undefined"
			) {
				notice.POP_COORDONNEES = {
					lat: prevNotice.POP_COORDONNEES.lat,
					lon: prevNotice.POP_COORDONNEES.lon,
				};
				notice["POP_COORDONNEES.lat"] = undefined;
				notice["POP_COORDONNEES.lon"] = undefined;
			} else if (
				notice["POP_COORDONNEES.lon"] === "" &&
				notice["POP_COORDONNEES.lat"] === ""
			) {
				// Les coordonnées sont vidées
				notice.POP_COORDONNEES = {
					lat: 0,
					lon: 0,
				};
				notice["POP_COORDONNEES.lat"] = undefined;
				notice["POP_COORDONNEES.lon"] = undefined;
			}
		}

		await transformBeforeUpdate(notice);

		const timeZone = "Europe/Paris";
		//Ajout de l'historique de la notice
		const today = moment
			.tz(new Date(), timeZone)
			.format("YYYY-MM-DD HH:mm");

		const HISTORIQUE = prevNotice.HISTORIQUE || [];
		const newHistorique = {
			nom: user.nom,
			prenom: user.prenom,
			email: user.email,
			date: today,
			updateMode: updateMode,
		};

		HISTORIQUE.push(newHistorique);
		notice.HISTORIQUE = HISTORIQUE;

		if (notice.REFMEM && notice.REFMEM.length > 0) {
			promises.push(
				populateBaseFromMuseo(notice, notice.REFMEM, Memoire),
			);
		}
		if (notice.REFMER && notice.REFMER.length > 0) {
			promises.push(
				populateBaseFromMuseo(notice, notice.REFMER, Merimee),
			);
		}
		if (notice.REFPAL && notice.REFPAL.length > 0) {
			promises.push(
				populateBaseFromMuseo(notice, notice.REFPAL, Palissy),
			);
		}

		promises.push(updateJocondeNotices(notice));
		const oaiObj = {
			REF: notice.REF,
			BASE: "museo",
			DMAJ: notice.DMAJ,
		};
		promises.push(
			Museo.findOneAndUpdate({ REF: notice.REF }, notice, { new: true }),
		);
		promises.push(updateOaiNotice(NoticesOAI, notice.REF, oaiObj));

		try {
			await Promise.all(promises);
			//Maj index elasticsearch
			const obj = new Museo(notice);
			checkESIndex(obj);

			res.status(200).send({ success: true, msg: "Notice mise à jour." });
		} catch (e) {
			capture(e);
			res.status(500).send({ success: false, error: e });
		}
	},
);

// Delete a notice by its ref.
router.delete(
	"/:ref",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		/* 	
    #swagger.tags = ['Museo']
    #swagger.path = '/museo/[ref}'
    #swagger.description = 'Suppression de la notice Museo' 
  */
		try {
			const ref = req.params.ref;
			const doc = await Museo.findOne({ REF: ref });
			const docOai = await NoticesOAI.findOne({ REF: ref });

			if (!doc) {
				return res.status(404).send({
					success: false,
					msg: `Impossible de trouver la notice museo ${ref} à supprimer.`,
				});
			}
			if (!(await canDeleteMuseo(req.user, doc))) {
				return res.status(401).send({
					success: false,
					msg: "Autorisation nécessaire pour supprimer cette ressource.",
				});
			}
			if (doc.PHOTO) {
				deleteFile(doc.PHOTO, "museo");
			}
			await doc.remove();
			await docOai.remove();
			return res
				.status(200)
				.send({ success: true, msg: "La notice à été supprimée." });
		} catch (error) {
			capture(error);
			return res.status(500).send({ success: false, error });
		}
	},
);

async function populateBaseFromMuseo(notice, refList, baseToPopulate) {
	try {
		if (!Array.isArray(refList)) {
			resolve();
			return;
		}
		const promises = [];
		const noticesToPopulate = await baseToPopulate.find({
			REFMUS: notice.REF,
		});

		for (let i = 0; i < noticesToPopulate.length; i++) {
			// If the object is removed from notice, then remove it from palissy
			if (!refList.includes(noticesToPopulate[i].REF)) {
				noticesToPopulate[i].REFMUS = noticesToPopulate[
					i
				].REFMUS.filter((e) => e !== notice.REF);
				promises.push(noticesToPopulate[i].save());
			}
		}

		let list = [];
		switch (baseToPopulate) {
			case Memoire:
				list = notice.REFMEM;
				break;
			case Merimee:
				list = notice.REFMER;
				break;
			case Palissy:
				list = notice.REFPAL;
				break;
		}

		for (let i = 0; i < list.length; i++) {
			if (!noticesToPopulate.find((e) => e.REF === list[i])) {
				const obj = await baseToPopulate.findOne({ REF: list[i] });
				if (
					obj &&
					Array.isArray(obj.REFMUS) &&
					!obj.REFMUS.includes(notice.REF)
				) {
					obj.REFMUS.push(notice.REF);
					promises.push(obj.save());
				}
			}
		}

		await Promise.all(promises);
	} catch (error) {
		capture(error);
	}
}

module.exports = router;
