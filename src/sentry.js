if (process.env.NODE_ENV !== "development") {
  var Raven = require("raven");
  console.log("RUN RAVEN");
  Raven.config(
    "https://9cca185065d74dbd9e05987036f2d16d@sentry.data.gouv.fr/21",
    {
      release: "pop-api-" + require("../package.json").version
    }
  ).install();
}

function capture(err) {
  console.log("New Error : ", err);
  if (Raven) {
    Raven.captureException(JSON.stringify(err));
  }
}

module.exports = {
  capture
};
