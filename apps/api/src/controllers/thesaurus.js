const express = require("express");
const axios = require("axios");
const passport = require("passport");
const X2JS = require("x2js");
require("../passport")(passport);
const Thesaurus = require("../models/thesaurus");
const { capture } = require("../sentry.js");
const x2js = new X2JS();
const router = express.Router();
const moment = require("moment-timezone");
const { logger } = require("../logger");
const timeZone = "Europe/Paris";

function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
const THESAURUSES = [
	// Joconde
	"th305",
	"th291",
	"th294",
	"th306",
	"th284",
	"th290",
	"th304",
	"th287",
	"th295",
	"th298",

	//Merimée & Palissy
	"th369",

	// Mérimée
	"th368",
	"th371",
	"th366",
	"th375",
	"th380",
	"th384",
	"th383",
	"th378",

	// Palissy
	"th361",
];

router.get(
	"/search",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/search'
      #swagger.description = 'Retourne les informations de la notice Thesaurus en fonction des paramètres' 
  */
		const id = req.query.id;
		const value = escapeRegExp(req.query.value);
		const q = Thesaurus.find({
			arc: id,
			value: { $regex: new RegExp(`^${value}`) },
		}).limit(10);
		q.exec((e, values) => {
			res.send(values);
		});
	},
);

router.get(
	"/autocompleteThesaurus",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/autocompleteThesaurus'
      #swagger.description = 'Retourne les thésaurus en fonction de son identifiant et correspondant à la valeur (autocompletion)' 
  */
		const id = req.query.id;
		const value = escapeRegExp(req.query.value);
		const q = Thesaurus.find({
			idThesaurus: id,
			value: { $regex: new RegExp(`^${value}`) },
		});
		q.exec((e, values) => {
			const body = values.map((element) => {
				return {
					_id: element._id,
					idThesaurus: element.idThesaurus,
					arc: element.arc,
					label: element.value,
					isAltLabel: element.altLabel,
				};
			});
			res.send({ statusCode: 202, body: JSON.stringify(body) });
		});
	},
);

router.get(
	"/validate",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/validate'
      #swagger.description = 'Retourne les thésaurus en fonction de son identifiant et correspondant à la valeur' 
  */
		const id = req.query.id;
		const value = escapeRegExp(req.query.value);
		const query = {
			idThesaurus: id,
			$text: {
				$search: `${req.query.value}`,
				$caseSensitive: false,
				$diacriticSensitive: false,
			},
		};

		Thesaurus.find(query, (e, values) => {
			const body = values.map((element) => {
				return {
					_id: element._id,
					idThesaurus: element.idThesaurus,
					arc: element.arc,
					label: element.value,
					isAltLabel: element.altLabel,
				};
			});
			res.send({ statusCode: 200, body: JSON.stringify(body) });
		});
	},
);

router.get(
	"/getTopConceptsByThesaurusId",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/getTopConceptsByThesaurusId'
      #swagger.description = 'Retourne les informations de la notice Thesaurus en fonction des paramètres' 
    */
		try {
			const thesaurusId = req.query.id;
			getTopConceptsByThesaurusId(thesaurusId).then((arr) => {
				res.status(200).send(arr);
			});
		} catch (e) {
			capture(e);
			res.status(500).send({ success: false, msg: JSON.stringify(e) });
		}
	},
);

router.get(
	"/getAllChildrenConcept",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/getAllChildrenConcept'
      #swagger.description = 'Retourne les informations de la notice Thesaurus en fonction des paramètres' 
    */
		try {
			const topconcepts = req.query.id;
			const arr = [];
			getAllChildrenConcept(topconcepts, arr).then(() => {
				res.status(200).send(arr);
			});
		} catch (e) {
			capture(e);
			res.status(500).send({ success: false, msg: JSON.stringify(e) });
		}
	},
);

router.get(
	"/getPreferredTermByConceptId",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/getPreferredTermByConceptId'
      #swagger.description = 'Retourne les informations de la notice Thesaurus en fonction des paramètres' 
    */
		try {
			const conceptId = req.query.id;
			const allTerms = [];
			getPreferredTermByConceptId(conceptId).then((r) => {
				for (let j = 0; j < r.length; j++) {
					if (r[j].languageId === "fr-FR") {
						allTerms.push(r[j].lexicalValue);
					}
				}
				res.status(200).send(allTerms);
			});
		} catch (e) {
			capture(e);
			res.status(500).send({ success: false, msg: JSON.stringify(e) });
		}
	},
);

router.get(
	"/deleteAllThesaurus",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/deleteAllThesaurus'
      #swagger.description = 'Suppression de tous les Thesaurus' 
  */
		try {
			const thesaurusId = req.query.id;
			Thesaurus.remove({ arc: thesaurusId }, () =>
				res.status(200).send({
					success: true,
					msg: "Tous les thésaurus ont été supprimés.",
				}),
			);
		} catch (e) {
			capture(e);
			res.status(500).send({ success: false, msg: JSON.stringify(e) });
		}
	},
);

router.post(
	"/createThesaurus",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/deleteAllThesaurus'
      #swagger.description = 'Création d'un Thesaurus' 
  */
		try {
			const thesaurusId = req.query.id;
			const terms = req.body.terms;
			// Create all existing terms.
			const arr = terms.map(
				(e) => new Thesaurus({ arc: thesaurusId, value: e }),
			);
			Thesaurus.insertMany(arr, (err, docs) => {
				if (err) {
					capture(err);
				}
				res.status(200).send({ success: true, msg: "OK" });
			});
		} catch (e) {
			capture(e);
			res.status(500).send({ success: false, msg: JSON.stringify(e) });
		}
	},
);

router.get(
	"/getThesaurusById",
	/*passport.authenticate("jwt", { session: false }),*/ (req, res) => {
		/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/getThesaurusById'
      #swagger.description = 'Retourne la liste des Thesaurus en fonction de l'identifiant' 
  */
		const thesaurusId = req.query.id;

		if (!thesaurusId) {
			return res.status(400).send({
				success: false,
				msg: `L'identifiant "${thesaurusId}" est invalide`,
			});
		}

		return axios
			.get(
				`https://opentheso.huma-num.fr/opentheso/api/all/theso?id=${thesaurusId}&format=jsonld`,
			)
			.then((response) => {
				if (
					response &&
					(response.status === 200 || response.status === 202) &&
					response.data.length > 0
				) {
					updateThesaurus(thesaurusId, response.data);
					res.status(200).send(response.data);
				} else {
					res.status(401).send(
						`Aucun thésaurus trouvé pour l'identifiant ${thesaurusId}`,
					);
				}
			})
			.catch((error) => {
				capture(error);
				res.status(400).send({ success: false, msg: error });
			});
	},
);

router.post("/refreshThesaurus", async (req, res) => {
	/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/refreshThesaurus'
      #swagger.description = "Rafraichissement des thesaurus"
  */

	res.status(200).send({ success: true, msg: "Thesaurus refreshing" });

	const operations = [];

	for (let i = 0; i < THESAURUSES.length; i++) {
		const thesoId = THESAURUSES[i];
		console.log(`Fetching thesaurus ${thesoId}`);
		try {
			const thesoRes = await axios.get(
				"https://opentheso.huma-num.fr/opentheso/api/all/theso",
				{
					params: {
						id: thesoId,
						format: "jsonld",
					},
				},
			);

			if (thesoRes.data != null && thesoRes.data.length > 0) {
				const operationsToAdd = createThesaurusOperation(
					thesoId,
					thesoRes.data,
				);
				operations.push(...operationsToAdd);
				console.log(
					`Thesaurus ${thesoId} fetched. ${operationsToAdd.length} operations added`,
				);
			}
		} catch (err) {
			console.error(`Error fetching thesaurus ${thesoId}: ${err}`);
		}
	}

	await Thesaurus.bulkWrite(
		THESAURUSES.map((thesoId) => ({
			deleteMany: {
				filter: { idThesaurus: thesoId },
			},
		})),
	);

	try {
		console.log(`Bulk writing ${operations.length} to thesaurus`);
		await Thesaurus.bulkWrite(operations);
		console.log("Thesaurus refreshed");
	} catch (err) {
		console.error(`Error bulk writing thesaurus: ${err}`);
	}
});

async function updateThesaurus(idThesaurus, respData) {
	const data = respData;

	Thesaurus.deleteMany({ idThesaurus: idThesaurus }, () => {
		createThesaurus(idThesaurus, data);
	});
}

function createThesaurusOperation(idThesaurus, parseData) {
	const operations = [];
	const propId = "@id";
	const propAltLabel = "http://www.w3.org/2004/02/skos/core#altLabel";
	const propPrefLabel = "http://www.w3.org/2004/02/skos/core#prefLabel";
	const today = moment.tz(new Date(), timeZone).format("YYYY-MM-DD");

	for (const el of parseData) {
		if (el[propAltLabel]) {
			for (const element of el[propAltLabel]) {
				const theso = {
					idThesaurus: idThesaurus,
					arc: el[propId],
					value: element["@value"],
					altLabel: true,
					updatedAt: today,
				};

				operations.push({
					updateOne: {
						filter: { idThesaurus, value: element["@value"] },
						update: { $set: theso },
						upsert: true,
					},
				});
			}
		}

		if (el[propPrefLabel]) {
			for (const element of el[propPrefLabel]) {
				const theso = {
					idThesaurus: idThesaurus,
					arc: el[propId],
					value: element["@value"],
					altLabel: false,
					updatedAt: today,
				};

				operations.push({
					updateOne: {
						filter: { idThesaurus, value: element["@value"] },
						update: { $set: theso },
						upsert: true,
					},
				});
			}
		}
	}

	return operations;
}

async function createThesaurus(idThesaurus, parseData) {
	const promises = [];
	//  const parseData = JSON.parse(data);
	const propId = "@id";
	const propAltLabel = "http://www.w3.org/2004/02/skos/core#altLabel";
	const propPrefLabel = "http://www.w3.org/2004/02/skos/core#prefLabel";
	const today = moment.tz(new Date(), timeZone).format("YYYY-MM-DD");

	for (const el of parseData) {
		if (el[propAltLabel]) {
			for (const element of el[propAltLabel]) {
				const theso = new Thesaurus({
					idThesaurus: idThesaurus,
					arc: parseData[i][propId],
					value: element["@value"],
					altLabel: true,
					updatedAt: today,
				});
				promises.push(theso.save());
			}
		}

		if (el[propPrefLabel]) {
			for (const element of el[propPrefLabel]) {
				const theso = new Thesaurus({
					idThesaurus: idThesaurus,
					arc: parseData[i][propId],
					value: element["@value"],
					altLabel: false,
					updatedAt: today,
				});
				promises.push(theso.save());
			}
		}
	}

	await Promise.all(promises);
}

router.get(
	"/autocompleteByIdthesaurusAndValue",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/autocompleteByIdthesaurusAndValue'
      #swagger.description = 'Recherche de l'autocomplétion de la valeur par rapport à l'identifiant du thesaurus dans le référentiel thesaurus' 
  */
		const thesaurusId = req.query.id;
		const value = req.query.value;

		return axios
			.get(
				`https://opentheso.huma-num.fr/opentheso/api/autocomplete?theso=${thesaurusId}&value=${value}&format=full`,
			)
			.then((response) => {
				if (
					response &&
					(response.status === 200 || response.status === 202) &&
					response.data.length > 0
				) {
					res.status(200).send(response.data);
				} else {
					res.status(404).send("Aucun résultat");
				}
			})
			.catch((error) => {
				capture(error);
				res.status(400).send({ success: false, msg: error });
			});
	},
);

router.get("/getAllThesaurusById", (req, res) => {
	/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/getAllThesaurusById'
      #swagger.description = "Retourne la liste des Thesaurus en fonction de l'identifiant"
  */
	const thesaurusId = req.query.id;

	Thesaurus.find({ idThesaurus: thesaurusId }, (e, values) => {
		const results = values.map((element) => {
			return {
				_id: element._id,
				idThesaurus: element.idThesaurus,
				arc: element.arc,
				label: element.value,
				isAltLabel: element.altLabel,
			};
		});
		res.status(202).send(results);
	});
});

router.get(
	"/getPrefLabelByIdArk",
	/* passport.authenticate("jwt", { session: false }),*/ (req, res) => {
		/* 	
      #swagger.tags = ['Thesaurus']
      #swagger.path = '/thesaurus/getPrefLabelByIdArk'
      #swagger.description = 'Recherche le prefLabel par rapport à l'identifiant Ark' 
  */
		const arkId = req.query.id;

		return axios
			.get(
				`https://opentheso.huma-num.fr/opentheso/api/preflabel.fr/${arkId}.json`,
			)
			.then((response) => {
				if (
					response &&
					(response.status === 200 || response.status === 202) &&
					response.data
				) {
					res.status(200).send(response.data);
				} else {
					res.status(404).send("Aucun résultat");
				}
			})
			.catch((error) => {
				capture(error);
				res.status(400).send({ success: false, msg: error });
			});
	},
);

async function getAllChildrenConcept(conceptId, arr) {
	try {
		arr.push(conceptId);
		const childs = getChildrenByConceptId(conceptId);
		const ArrP = [];
		if (childs) {
			for (let i = 0; i < childs.length; i++) {
				ArrP.push(getAllChildrenConcept(childs[i], arr));
			}
		}
		await Promise.all(ArrP);
	} catch (e) {
		capture(e);
	}
}

function getChildrenByConceptId(conceptId) {
	const body = `<soap:getChildrenByConceptId> 
          <conceptId>${conceptId}</conceptId> 
         </soap:getChildrenByConceptId>`;
	return post(body, "thesaurusConcept");
}

function getPreferredTermByConceptId(conceptId) {
	const body = `<soap:getPreferredTermByConceptId> 
            <conceptId>${conceptId}</conceptId> 
        </soap:getPreferredTermByConceptId>`;
	return post(body, "thesaurusConcept");
}

function getTopConceptsByThesaurusId(thesaurusId) {
	const body = `<soap:getTopConceptsByThesaurusId> 
            <thesaurusId>${thesaurusId}</thesaurusId> 
        </soap:getTopConceptsByThesaurusId>`;
	return post(body, "thesaurusConcept");
}

function post(req, service) {
	const envelopedBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://soap.ginco.mcc.fr/"> 
    <soapenv:Header/> 
    <soapenv:Body>${req}</soapenv:Body> 
    </soapenv:Envelope>`;

	axios
		.post(
			`https://ginco.culture.fr/ginco-webservices/services/${service}`,
			{ body: envelopedBody },
			{ headers: { "Content-Type": "text/xml;charset=UTF-8" } },
		)
		.then((response) => {
			if (response.status === 200) {
				try {
					const bodyjson = x2js.xml2js(body);
					const key = Object.keys(bodyjson.Envelope.Body)[0];
					const resp = bodyjson.Envelope.Body[key].return;
					return resp && !Array.isArray(resp) ? [resp] : resp;
				} catch (e) {
					return new Error("Response malformed");
				}
			} else {
				capture(resp);
				return resp;
			}
		})
		.catch((error) => {
			capture(error);
			return error;
		});

	/*
return new Promise((resolve, reject) => {
  request.post(
    {
      url: `https://ginco.culture.fr/ginco-webservices/services/${service}`,
      body: envelopedBody,
      headers: { "Content-Type": "text/xml;charset=UTF-8" }
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        try {
          const bodyjson = x2js.xml2js(body);
          const key = Object.keys(bodyjson.Envelope.Body)[0];
          const resp = bodyjson.Envelope.Body[key].return;
          if (resp && !Array.isArray(resp)) {
            resolve([resp]);
          } else {
            resolve(resp);
          }
        } catch (e) {
          reject(new Error("Response malformed"));
        }
      } else {
        capture(error);
        reject(error);
      }
    }
  );
});*/
}

router.get(
	"/last-update",
	passport.authenticate("jwt", { session: false }),
	async (_req, res) => {
		try {
			const someThesaurus = await Thesaurus.find({
				idThesaurus: { $exists: true },
				updatedAt: { $exists: true },
			})
				.limit(1)
				.exec();

			if (someThesaurus.length <= 0) {
				return res.status(404).json({ message: "Pas de thesaurus" });
			}

			logger.debug({ thesaurus: someThesaurus[0] });

			return res
				.status(200)
				.json({ lastUpdate: someThesaurus[0].updatedAt });
		} catch (err) {
			logger.error(err);
			capture(err);
			return res.status(500).json({
				message:
					"impossible de récupéré la dernière date de mise à jour",
			});
		}
	},
);

module.exports = router;
