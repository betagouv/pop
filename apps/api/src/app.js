const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./passport")(passport);
require("./mongo");

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger_ui.json');

app.enable("trust proxy");

app.use(bodyParser.json({ limit: "50mb" }));

// Parse the ndjson as text for ES proxy
app.use(bodyParser.text({ type: "application/x-ndjson" }));

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());


function setSecurityHeaders(req, res, next) {
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');
  res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
}

app.use(setSecurityHeaders);

app.get("/", (_req, res) => {
  res.send("POP API listening.");
});

app.use("/auth", require("./controllers/auth"));
app.use("/users", require("./controllers/users"));
app.use("/producteur", require("./controllers/producteurs"));
app.use("/groups", require("./controllers/groups"));
app.use("/import", require("./controllers/import"));

// Notices
app.use("/merimee", require("./controllers/merimee"));
app.use("/joconde", require("./controllers/joconde"));
app.use("/mnr", require("./controllers/mnr"));
app.use("/palissy", require("./controllers/palissy"));
app.use("/memoire", require("./controllers/memoire"));
app.use("/enluminures", require("./controllers/enluminures"));
app.use("/museo", require("./controllers/museo"));
app.use("/autor", require("./controllers/autor"));
app.use("/deleteHistorique", require("./controllers/deleteHistorique"));

// Gallery
app.use("/gallery", require("./controllers/gallery"));

// Reporting.
app.use("/reporting", require("./controllers/reporting"));

// Proxy to GINCO API
app.use("/thesaurus", bodyParser.json(), require("./controllers/thesaurus"));

// Proxy to ES
app.use("/search", require("./controllers/search"));

// Entrepot OAI
app.use("/oai", require("./controllers/oai"));

// Swagger DOC
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Swagger DOC
app.use('/api-docs', function(req, res, next){ 
  
  res.setHeader(
    'Content-Security-Policy',
 //   "default-src 'self'; font-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self'; style-src-attr 'self';  frame-src 'self';"
    "default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' 'unsafe-inline';"
  );
  //swaggerDocument.host = req.get('host');
  //req.swaggerDoc = swaggerDocument;
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/mapbox', require("./controllers/mapbox"));

// Maintenance
app.use('/maintenance', require("./controllers/maintenance"));

module.exports = app;
