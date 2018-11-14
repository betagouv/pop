const express = require("express");
const path = require("path");
const hsts = require("hsts");

const app = express();
const port = 8081;

console.log("START", new Date());

app.use(express.static(path.join(__dirname, "/../../build")));
app.use(express.static(path.join(__dirname, "/../../sitemap")));

app.route("*").all((req, res) => {
  let status = 404;
  if (
    (/\/notice\/(merimee|palissy|mnr|joconde|memoire)\/\w+/.test(req.url)) ||
    (/\/search\/(list|map|mosaique)/.test(req.url)) || 
    (/\/opendata/.test(req.url))
  ) {
    status = 200;
  }
  res.status(status).sendFile(path.join(__dirname, "/../../build/index.html"));
});

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
