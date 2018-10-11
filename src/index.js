const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const proxy = require("http-proxy-middleware");
const { PORT } = require("./config.js");
const Mailer = require("./mailer");
const { esUrl } = require("./config.js");
const { capture } = require("./sentry.js");

require("./passport")(passport);
require("./mongo");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
/* Parse the ndjson as text for ES proxy*/
app.use(bodyParser.text({ type: "application/x-ndjson" }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());

app.get("/", (req, res) => {
  capture("Hello");
  res.send("Hello World!");
});

app.use("/auth", require("./controllers/auth"));

app.use("/merimee", require("./controllers/merimee"));
app.use("/joconde", require("./controllers/joconde"));
app.use("/mnr", require("./controllers/mnr"));
app.use("/palissy", require("./controllers/palissy"));
app.use("/memoire", require("./controllers/memoire"));
app.use("/thesaurus", require("./controllers/thesaurus"));

app.post(
  "/mail",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { subject, to, body } = req.body;
    if (!subject || !to || !body) {
      capture("Mail information incomplete");
      res.status(500).send("Information incomplete");
      return;
    }
    Mailer.send(subject, to, body).then(e => {
      return res.status(200).send({ success: true, msg: "OK" });
    });
  }
);

//START ELASTIC SEARCH PROXY
const options = {
  target: esUrl,
  changeOrigin: true,
  pathRewrite: {
    "^/search/": "/" //remove base path
  },
  onProxyReq: (proxyReq, req) => {
    const { body } = req;
    if (body) {
      if (typeof body === "object") {
        proxyReq.write(JSON.stringify(body));
      } else {
        proxyReq.write(body);
      }
    }
  }
};

// /* Here we proxy all the requests from reactivesearch to our backend */
app.use("/search/*/_msearch", proxy(options));

app.listen(PORT, () => console.log("Listening on port " + PORT));
