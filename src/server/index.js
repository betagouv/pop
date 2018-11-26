const express = require("express");
const path = require("path");
const forceDomain = require("forcedomain");

const app = express();
const port = 8081;

console.log("START", new Date());

app.use(
  forceDomain({
    hostname: "www.pop.culture.gouv.fr",
    excludeRule: /elasticbeanstalk\.com|pop-staging\.culture\.gouv\.fr/i
    // For later add: `protocol: 'https'`
  })
);

app.use(express.static(path.join(__dirname, "/../../build")));
app.use(express.static(path.join(__dirname, "/../../sitemap")));

// Sitemap redirection
app.get("/sitemap/*", (req, res) => {
  const url = req.url.replace("/sitemap/", "");
  res.redirect(301, `https://s3.eu-west-3.amazonaws.com/pop-sitemap/${url}`);
});

app.route("*").all((req, res) => {
  let status = 404;
  if (
    /\/notice\/(merimee|palissy|mnr|joconde|memoire)\/\w+/.test(req.url) ||
    /\/search\/(list|map|mosaique)/.test(req.url) ||
    /\/opendata/.test(req.url)
  ) {
    status = 200;
  }
  res.status(status).sendFile(path.join(__dirname, "/../../build/index.html"));
});

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
