const express = require("express");
const router = express.Router();
const { esUrl, esPort, ID_PROD_APP, ovh } = require("../config.js");
const http = require("http");
const aws4 = require("aws4");
const { ndjsonToJsonText } = require("ndjson-to-json-text")
const es = require("../elasticsearch.js")()

/**
 * 
 * @param {*} results 
 * @returns 
 */
function getResultInElasticSearch6CompatibilityMode(results) {
  const responsesWithTotalModified = results.responses.map(resultItem => {
    resultItem.hits.total = resultItem.hits.total.value;
    return resultItem;
  });
  return {
    responses: responsesWithTotalModified,
  }
}


// Scroll API (required for full exports)
// https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html#search-request-scroll
router.post("/scroll", (req, res) => {
  let path, body;
  // First request with a full query, next with a scroll_id.
  if (req.query.scroll_id) {
    path = "/_search/scroll";
    body = JSON.stringify({ scroll: "1m", scroll_id: req.query.scroll_id });
  } else if (req.query.index && req.query.index.match(/^[a-z]+$/)) {
    path = `/${req.query.index}/_search?scroll=1m`;
    body = req.body;
  } else {
    return res.status(400).send({ success: false, msg: "Impossible de parser la requête." });
  }
  const headers = { "Content-Type": "Application/json" };
  const opts = { host: esUrl, path, body, method: "POST", headers };
  if (esPort !== "80") {
    opts.port = esPort;
  }
  aws4.sign(opts);
  http
    .request(opts, res1 => {
      res1.pipe(res);
    })
    .end(opts.body || "");
});

router.use("/:indices/_msearch", async (req, res) => {
  if (ovh) {
    let opts = {
      host: esUrl,
      path: req.originalUrl.replace("/search", ""),
      body: req.body
    };

    // Ajout du port sur l'environnement de dev
    if (esPort !== "80") {
      opts.port = esPort;
    }

    console.log("opts", opts);
    console.log("paths", req.params.indices)

    // Si la requête ne provient pas de l'application production
    if (!req.headers.application || req.headers.application !== ID_PROD_APP) {
      opts = addFilterFields(req, opts);
    }


    // Convert NdJson to json object
    const jsonText = ndjsonToJsonText(opts.body)
    const jsonQueryBody = JSON.parse(jsonText);

    try {
      // const results = await es.msearch({ body: jsonQueryBody, index: ['joconde', 'palissy', 'merimee', 'memoire', 'mnr', 'museo', 'enluminures', 'autor'] })
      const results = await es.msearch({ body: jsonQueryBody, index: req.params.indices.split(',') })
      return res.json(getResultInElasticSearch6CompatibilityMode(results.body));
    } catch (e) {
      console.error(e);
      return res.status(500).send({ success: false, msg: "Erreur lors de la requête." });
    }

  } else {
    let opts = {
      host: esUrl,
      path: req.originalUrl.replace("/search", ""),
      body: req.body,
      method: "POST",
      headers: { "Content-Type": "Application/x-ndjson" }
    };

    // Ajout du port sur l'environnement de dev
    if (esPort !== "80") {
      opts.port = esPort;
    }

    // Si la requête ne provient pas de l'application production
    if (!req.headers.application || req.headers.application !== ID_PROD_APP) {
      opts = addFilterFields(req, opts);
    }

    aws4.sign(opts);

    http
      .request(opts, res1 => {
        const routedResponse = res1.pipe(res);
        routedResponse.setHeader("Content-Type", "application/json");
      })
      .end(opts.body || "");
  }
});

function addFilterFields(req, opts) {
  let transformData = false;
  let reqFilter = opts.body.split('\n').filter(val => val !== "").map((val) => {
    let obj = JSON.parse(val);

    if (Object.keys(obj).includes('query')) {
      const listeNonDiffusable = [...listeNonDiffusablePalissy(), ...listeNonDiffusableMNR()];
      obj._source = {
        "excludes": listeNonDiffusable
      }
      transformData = true;
    }

    if (!ovh) { // semble ne pas être supporté par opensearch
      // Mantis 46413 - Les notices ayant le CONTIENT_IMAGE égales à "oui" doivent être affichées en premier
      obj.sort = [{
        "CONTIENT_IMAGE.keyword": { "order": "desc" }
      }]
    }

    return JSON.stringify(obj);
  }).join('\n');

  if (transformData) {
    opts.body = reqFilter + '\n';
  }

  return opts;
}

/**
 * Retourne les champs non diffusable pour Palissy
 * @returns array
 */
function listeNonDiffusablePalissy() {
  return ['ADRS2', 'COM2', 'EDIF2', 'EMPL2', 'INSEE2', 'LBASE2'];
}

/**
 * Retourne les champs non diffusable pour MNR
 * @returns array
 */
function listeNonDiffusableMNR() {
  return ['SALLES', 'RCL', 'NET', 'CARTELS'];
}


module.exports = router;
