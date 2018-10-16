const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const { PORT } = require("./config.js");
const Mailer = require("./mailer");
const { esUrl } = require("./config.js");
const { capture } = require("./sentry.js");

require("./passport")(passport);
require("./mongo");

const app = express();

const aws4 = require("aws4");

// /* Here we proxy all the requests from reactivesearch to our backend */

app.use(bodyParser.json({ limit: "50mb" }));
// /* Parse the ndjson as text for ES proxy*/
app.use(bodyParser.text({ type: "application/x-ndjson" }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Hello World");
});

app.use("/auth", require("./controllers/auth"));
app.use("/users", require("./controllers/users"));
app.use("/merimee", require("./controllers/merimee"));
app.use("/joconde", require("./controllers/joconde"));
app.use("/mnr", require("./controllers/mnr"));
app.use("/palissy", require("./controllers/palissy"));
app.use("/memoire", require("./controllers/memoire"));
app.use("/thesaurus", require("./controllers/thesaurus"));

const http = require("http");
app.use("/search/*/_msearch", (req, res) => {
  var opts = {
    host: esUrl,
    path: req.originalUrl.replace("/search", ""),
    body: req.body,
    method: "POST",
    headers: { "Content-Type": "Application/x-ndjson" }
  };
  aws4.sign(opts);
  http
    .request(opts, res1 => {
      res1.pipe(res);
    })
    .end(opts.body || "");
});

app.post(
  "/mail",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("RECEIVE MAIL TO SEND");
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

app.listen(PORT, () => console.log("Listening on port " + PORT));
