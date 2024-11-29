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
const { z } = require("zod");

/**
 *
 * @param {*} results
 * @returns
 */
function getResultInElasticSearch6CompatibilityMode(results) {
	const responsesWithTotalModified = results.responses.map((resultItem) => {
		if (resultItem.hits == null) {
			resultItem.hits = {};
		}

		resultItem.hits.total = resultItem.hits?.total?.value ?? 0;
		return resultItem;
	});
	return {
		responses: responsesWithTotalModified,
	};
}

const shapeReplaceShould = z.object({
	should: z
		.array(
			z.object({
				bool: z.object({
					must_not: z.array().min(1),
				}),
			}),
		)
		.min(2),
});

/**
 * Remove `should_not` from the object, will check recursively.
 * Replace should with must, as it doesn't work for multi-value search field
 */
function updateOpenSearchQuery(obj) {
	const { should_not, filter, ...rest } = obj;

	for (const [key, value] of Object.entries(rest)) {
		if (_.isArray(value) && typeof value !== "string") {
			for (const [index, item] of Object.entries(value)) {
				if (_.isPlainObject(item)) {
					rest[key][index] = updateOpenSearchQuery(item);
				}
			}
		} else if (_.isPlainObject(value)) {
			rest[key] = updateOpenSearchQuery(value);
		}
	}

	// Merge should with must, depending on wether should and must are objects or arrays
	if (shapeReplaceShould.safeParse(rest).success) {
		if ("must" in rest) {
			if (Array.isArray(rest.must)) {
				rest.must = [...rest.must, rest.should];
			} else {
				rest.must = [rest.must, ...rest.should];
			}
			rest.should = [];
		} else {
			rest.must = rest.should;
			// biome-ignore lint/performance/noDelete: OK
			delete rest.should;
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
				// Mantis 46413 - Les notices ayant le CONTIENT_IMAGE égales à "oui" doivent être affichées en premier
				sort: {
					"CONTIENT_IMAGE.keyword": { order: "desc" },
				},
				...updateOpenSearchQuery(item),
			};
		}

		return updateOpenSearchQuery(item);
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

		const jsonText = ndjsonToJsonText(opts.body);
		let jsonQueryBody = JSON.parse(jsonText);
		jsonQueryBody = insertOpenSearchFields(jsonQueryBody);

		try {
			const { data } = await axios.request({
				url: opts.host + opts.path,
				method: opts.method,
				headers: opts.headers,
				data: jsonQueryBody[0],
			});
			return res.status(200).send(data);
		} catch (err) {
			req.log.error(err);
			return res.status(500).send({ success: false, msg: err.message });
		}
	} else {
		aws4.sign(opts);

		http.request(opts, (res1) => {
			res1.pipe(res);
		}).end(opts.body || "");
	}
});

router.use("/:indices/_msearch", async (req, res) => {
	let body = req.body;

	// Si la requête ne provient pas de l'application production
	if (!req.headers.application || req.headers.application !== ID_PROD_APP) {
		body = addFilterFieldsBody(req.body);
	}

	// Convert NdJson to json object
	const jsonText = ndjsonToJsonText(body);
	let jsonQueryBody = JSON.parse(jsonText);

	// hacky insert of needed fields for OpenSearch compatibility
	jsonQueryBody = insertOpenSearchFields(jsonQueryBody);
	req.log.debug({ msg: "jsonQueryBody", jsonQueryBody });

	try {
		const results = await es.msearch({
			body: jsonQueryBody,
			index: req.params.indices.split(","),
		});

		return res.json(
			getResultInElasticSearch6CompatibilityMode(results.body),
		);
	} catch (e) {
		req.log.error(e);
		return res
			.status(500)
			.send({ success: false, msg: "Erreur lors de la requête." });
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
