const express = require("express");
const path = require("path");
const hsts = require("hsts");

console.log("START", new Date());

const app = express();
const port = 8081;

function forceHttps(res, req, next) {
  const isProdDomain = (req.hostname || "").match(/production\.pop\.culture\.gouv\.fr/);
  if (!req.secure && req.get("x-forwarded-proto") !== "https" && isProdDomain) {
    return res.redirect(302, "https://production.pop.culture.gouv.fr" + req.url);
  }
  next();
}

app.use(forceHttps);
app.use(hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));
app.use(express.static(path.join(__dirname, "/../../build")));
app.route("*").all((req, res) => {
  res.sendFile(path.join(__dirname, "/../../build/index.html"));
});
app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
