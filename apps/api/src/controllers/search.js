const assert = require("assert");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
	esUrl,
	esPort,
	ID_PROD_APP,
	ovh,
	esUsername,
	esPassword,
} = require("../config.js");
const http = require("http");
const aws4 = require("aws4");
const { ndjsonToJsonText } = require("ndjson-to-json-text");
const _ = require("lodash");
const es = require("../elasticsearch.js")();
const { logger } = require("../logger");

/**
 *
 * @param {*} results
 * @returns
 */
function getResultInElasticSearch6CompatibilityMode(results) {
	const responsesWithTotalModified = results.responses.map((resultItem) => {
		resultItem.hits.total = resultItem.hits?.total.value ?? 0;
		return resultItem;
	});
	return {
		responses: responsesWithTotalModified,
	};
}

/**
 * Remove `should_not` from the object, will check recursively.
 */
function removeShouldNot(obj) {
	const { should_not, ...rest } = obj;

	for (const [key, value] of Object.entries(rest)) {
		console.log(key, value);
		if (_.isArray(value) && typeof value !== "string") {
			for (const [index, item] of Object.entries(value)) {
				if (_.isPlainObject(item)) {
					rest[key][index] = removeShouldNot(item);
				}
			}
		} else if (_.isPlainObject(value)) {
			rest[key] = removeShouldNot(value);
		}
	}

	return rest;
}

/**
 * Will insert some fields to make the query we get compatible with OpenSearch.
 * */
function insertOpenSearchFields(body) {
	assert(Array.isArray(body), "body must be an array");

	return body.map((item) => {
		// If the item is a query
		if ("query" in item) {
			return {
				track_total_hits: true, // this get the total number of hits. By default on OpenSearch it's set to 10000
				...removeShouldNot(item),
			};
		}

		return removeShouldNot(item);
	});
}

// Scroll API (required for full exports)
// https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html#search-request-scroll
router.post("/scroll", async (req, res) => {
	let path;
	let body;

	// First request with a full query, next with a scroll_id.
	if (req.query.scroll_id) {
		path = "/_search/scroll";
		body = JSON.stringify({ scroll: "1m", scroll_id: req.query.scroll_id });
	} else if (req.query.index?.match(/^[a-z]+$/)) {
		path = `/${req.query.index}/_search?scroll=1m`;
		body = req.body;
	} else {
		return res
			.status(400)
			.send({ success: false, msg: "Impossible de parser la requête." });
	}

	const opts = {
		host: esUrl,
		path,
		body,
		method: ovh ? "GET" : "POST",
		headers: { "content-type": "application/json" },
	};

	if (esPort !== "80") {
		opts.host += `:${esPort}`;
	}

	if (ovh) {
		const auth = Buffer.from(`${esUsername}:${esPassword}`).toString(
			"base64",
		);
		opts.headers.Authorization = `Basic ${auth}`;
		logger.debug({ esUrl: opts.host, path: opts.path });
		try {
			const { data } = await axios.request({
				url: opts.host + opts.path,
				method: opts.method,
				headers: opts.headers,
				data: opts.body,
			});
			return res.status(200).send(data);
		} catch (err) {
			logger.error(err);
			return res.status(500).send({ success: false, msg: err.message });
		}
	} else {
		aws4.sign(opts);
		logger.debug({ opts });

		http.request(opts, (res1) => {
			res1.pipe(res);
		}).end(opts.body || "");
	}
});

router.use("/:indices/_msearch", async (req, res) => {
	if (ovh) {
		let body = req.body;

		// Si la requête ne provient pas de l'application production
		if (
			!req.headers.application ||
			req.headers.application !== ID_PROD_APP
		) {
			body = addFilterFieldsBody(req.body);
		}

		// Convert NdJson to json object
		const jsonText = ndjsonToJsonText(body);
		let jsonQueryBody = JSON.parse(jsonText);

		// hacky insert of needed fields for OpenSearch compatibility
		jsonQueryBody = insertOpenSearchFields(jsonQueryBody);
		logger.debug(jsonQueryBody);

		try {
			const results = await es.msearch({
				body: jsonQueryBody,
				index: req.params.indices.split(","),
			});

			return res.json(
				getResultInElasticSearch6CompatibilityMode(results.body),
			);
		} catch (e) {
			logger.error(e);
			return res
				.status(500)
				.send({ success: false, msg: "Erreur lors de la requête." });
		}
	} else {
		const opts = {
			host: esUrl,
			path: req.originalUrl.replace("/search", ""),
			body: req.body,
			method: "POST",
			headers: { "Content-Type": "Application/x-ndjson" },
		};

		// Ajout du port sur l'environnement de dev
		if (esPort !== "80") {
			opts.port = esPort;
		}

		// Si la requête ne provient pas de l'application production
		if (
			!req.headers.application ||
			req.headers.application !== ID_PROD_APP
		) {
			opts.body = addFilterFieldsBody(req.body);
		}

		aws4.sign(opts);

		http.request(opts, (res1) => {
			const routedResponse = res1.pipe(res);
			routedResponse.setHeader("Content-Type", "application/json");
		}).end(opts.body || "");
	}
});

function addFilterFieldsBody(body) {
	let transformData = false;
	const reqFilter = body
		.split("\n")
		.filter((val) => val !== "")
		.map((val) => {
			const obj = JSON.parse(val);

			if (Object.keys(obj).includes("query")) {
				const listeNonDiffusable = [
					...listeNonDiffusablePalissy(),
					...listeNonDiffusableMNR(),
				];
				obj._source = {
					excludes: listeNonDiffusable,
				};
				transformData = true;
			}

			if (!ovh) {
				// semble ne pas être supporté par opensearch
				// Mantis 46413 - Les notices ayant le CONTIENT_IMAGE égales à "oui" doivent être affichées en premier
				obj.sort = [
					{
						"CONTIENT_IMAGE.keyword": { order: "desc" },
					},
				];
			}

			return JSON.stringify(obj);
		})
		.join("\n");

	if (transformData) {
		return `${reqFilter}\n`;
	}

	return body;
}

function addFilterFields(req, opts) {
	let transformData = false;
	const reqFilter = opts.body
		.split("\n")
		.filter((val) => val !== "")
		.map((val) => {
			const obj = JSON.parse(val);

			if (Object.keys(obj).includes("query")) {
				const listeNonDiffusable = [
					...listeNonDiffusablePalissy(),
					...listeNonDiffusableMNR(),
				];
				obj._source = {
					excludes: listeNonDiffusable,
				};
				transformData = true;
			}

			if (!ovh) {
				// semble ne pas être supporté par opensearch
				// Mantis 46413 - Les notices ayant le CONTIENT_IMAGE égales à "oui" doivent être affichées en premier
				obj.sort = [
					{
						"CONTIENT_IMAGE.keyword": { order: "desc" },
					},
				];
			}

			return JSON.stringify(obj);
		})
		.join("\n");

	if (transformData) {
		opts.body = `${reqFilter}\n`;
	}

	return opts;
}

/**
 * Retourne les champs non diffusable pour Palissy
 * @returns array
 */
function listeNonDiffusablePalissy() {
	return ["ADRS2", "COM2", "EDIF2", "EMPL2", "INSEE2", "LBASE2"];
}

/**
 * Retourne les champs non diffusable pour MNR
 * @returns array
 */
function listeNonDiffusableMNR() {
	return ["SALLES", "RCL", "NET", "CARTELS"];
}

module.exports = router;
