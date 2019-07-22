const express = require("express");
const path = require("path");
const hsts = require("hsts");

function forceHttps(res, req, next) {
  console.log(req.get("Host"));
  console.log(req.hostname);
  const isProdDomain = (req.get("Host") || "").match(/production\.pop\.culture\.gouv\.fr/);
  if (!req.secure && req.get("x-forwarded-proto") !== "https" && isProdDomain) {
    return res.redirect(302, "https://production.pop.culture.gouv.fr" + req.url);
  }
  next();
}

function forceHttp(res, req, next) {
  const isProdDomain = (req.get("Host") || "").match(/production\.pop\.culture\.gouv\.fr/);
  if (!req.secure && req.get("x-forwarded-proto") === "https" && isProdDomain) {
    return res.redirect(302, "http://production.pop.culture.gouv.fr" + req.url);
  }
  next();
}

console.log("START", new Date());

const app = express();
app.set("trust proxy", true);
const port = 8081;
app.use(forceHttp);
// app.use(hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));
app.use(express.static(path.join(__dirname, "/../../build")));
app.route("*").all((req, res) => {
  res.sendFile(path.join(__dirname, "/../../build/index.html"));
});
app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
