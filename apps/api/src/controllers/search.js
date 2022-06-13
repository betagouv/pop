const express = require("express");
const router = express.Router();
const { esUrl, esPort, ID_PROD_APP } = require("../config.js");
const http = require("http");
const aws4 = require("aws4");

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
  if(esPort !== "80"){
    opts.port = esPort;
  }
  aws4.sign(opts);
  http
    .request(opts, res1 => {
      res1.pipe(res);
    })
    .end(opts.body || "");
});

router.use("/*/_msearch", (req, res) => {

  let opts = {
    host: esUrl,
    path: req.originalUrl.replace("/search", ""),
    body: req.body,
    method: "POST",
    headers: { "Content-Type": "Application/x-ndjson" }
  };

  // Ajout du port sur l'environnement de dev
  if(esPort !== "80"){
    opts.port = esPort;
  }

  // Si la requête ne provient pas de l'application productiion
  if(!req.headers.application || req.headers.application !== ID_PROD_APP){
    opts = addFilterFields(req, opts);
  }
  
  aws4.sign(opts);

  http
    .request(opts, res1 => {
      const routedResponse = res1.pipe(res);
      routedResponse.setHeader("Content-Type", "application/json");
    })
    .end(opts.body || "");
});

function addFilterFields(req, opts){
  let transformData = false;
  let reqFilter = opts.body.split('\n').filter( val => val !== "").map((val) => {
    let obj = JSON.parse(val);

    if(Object.keys(obj).includes('query')){
      const listeNonDiffusable = [...listeNonDiffusablePalissy(), ...listeNonDiffusableMNR()];
      obj._source = {
        "excludes": listeNonDiffusable
      }
      transformData = true;
    }
    return JSON.stringify(obj);
  }).join('\n');

  if(transformData){
    opts.body = reqFilter + '\n';
  }

  return opts;
}

/**
 * Retourne les champs non diffusable pour Palissy
 * @returns array
 */
 function listeNonDiffusablePalissy(){
  return ['ADRS2','COM2', 'EDIF2', 'EMPL2', 'INSEE2', 'LBASE2'];
}

/**
 * Retourne les champs non diffusable pour MNR
 * @returns array
 */
 function listeNonDiffusableMNR(){
  return ['SALLES','RCL', 'NET', 'CARTELS'];
}


module.exports = router;
