const express = require("express");
const router = express.Router();
const { esUrl, esPort } = require("../config.js");
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
  const opts = { host: esUrl, port: esPort, path, body, method: "POST", headers };
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
    port: esPort, 
    path: req.originalUrl.replace("/search", ""),
    body: req.body,
    method: "POST",
    headers: { "Content-Type": "Application/x-ndjson" }
  };
  aws4.sign(opts);
  http
    .request(opts, res1 => {
      res1.pipe(res);
    })
    .end(opts.body || "");
});

module.exports = router;
