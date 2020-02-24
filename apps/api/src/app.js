const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./passport")(passport);
require("./mongo");

const app = express();

app.enable("trust proxy");

app.use(bodyParser.json({ limit: "50mb" }));

// Parse the ndjson as text for ES proxy
app.use(bodyParser.text({ type: "application/x-ndjson" }));

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());

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

// Gallery
app.use("/gallery", require("./controllers/gallery"));

// Reporting.
app.use("/reporting", require("./controllers/reporting"));

// Proxy to GINCO API
app.use("/thesaurus", bodyParser.json(), require("./controllers/thesaurus"));

// Proxy to ES
app.use("/search", require("./controllers/search"));

module.exports = app;
