const express = require("express");
const path = require("path");
const forceDomain = require("forcedomain");

const app = express();
const port = 8081;

console.log("START", new Date());

app.use(
  forceDomain({
    hostname: "www.pop.culture.gouv.fr",
    excludeRule: /elasticbeanstalk\.com|pop-staging\.culture\.gouv\.fr/i,
    protocol: "https"
  })
);

app.use(express.static(path.resolve("build")));

// Sitemap redirection
app.get("/sitemap/*", (req, res) => {
  const url = req.url.replace("/sitemap/", "");
  res.redirect(301, `https://s3.eu-west-3.amazonaws.com/pop-sitemap/${url}`);
});

app.route("*").all((req, res) => {
  let status = 404;
  if (
    req.url === "" ||
    req.url === "/" ||
    /\/notice\/(merimee|palissy|mnr|joconde|memoire)\/\w+/.test(req.url) ||
    /\/search\/(list|map|mosaique)/.test(req.url) ||
    /\/opendata/.test(req.url)
  ) {
    status = 200;
  }
  res
    .status(status)
    .sendFile(path.join(__dirname, "/../build/index-template.html"));
});

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
