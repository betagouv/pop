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
    protocol: 'https'
  })
);

app.use(express.static(path.resolve("build")));

app.get("/*", require("./ssr.js"));

// Sitemap redirection
app.get("/sitemap/*", (req, res) => {
  const url = req.url.replace("/sitemap/", "");
  res.redirect(301, `https://s3.eu-west-3.amazonaws.com/pop-sitemap/${url}`);
});

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
