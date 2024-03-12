const express = require("express");
const path = require("path");
const hsts = require("hsts");
require("dotenv").config();
function forceHttps(res, req, next) {
  console.log(req.get("Host"));
  console.log(req.hostname);
  const isProdDomain = (req.get("Host") || "").match(/production\.pop\.culture\.gouv\.fr/);
  if (!req.secure && req.get("x-forwarded-proto") !== "https" && isProdDomain) {
    return res.redirect(302, "https://production.pop.culture.gouv.fr" + req.url);
  }
  next();
}

// function setSecurityHeaders(req, res, next) {
//   res.header('Content-Security-Policy', `default-src 'self'; script-src 'self' https://cdn.ravenjs.com https://cdn.amplitude.com 'unsafe-inline' ; style-src 'self' http://cdnjs.cloudflare.com 'unsafe-inline';font-src 'self' http://at.alicdn.com data:; connect-src 'self' ${process.env.API_URL ? process.env.API_URL : "http://localhost:3000"} https://api.pop.culture.gouv.fr https://o1104995.ingest.sentry.io; img-src 'self' *.amazonaws.com data: blob:;`);
//   next();
// }

console.log("START", new Date());

const app = express();
app.set('trust proxy', true);
const port = 8081;
app.use(forceHttps);

// app.use(setSecurityHeaders);
app.disable('x-powered-by');

app.use(hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));
app.use(express.static(path.join(__dirname, "/../../build")));
app.route("*").all((req, res) => {
  res.sendFile(path.join(__dirname, "/../../build/index.html"));
});
app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
