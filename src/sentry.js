const Sentry = require("@sentry/node");

if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: "https://9cca185065d74dbd9e05987036f2d16d@sentry.data.gouv.fr/21",
    release: "pop-api@" + require("../package.json").version,
    environment: process.env.NODE_ENV
  });
}

function capture(err) {
  console.log("New Error : ", err);
  if (Sentry) {
    Sentry.captureException(JSON.stringify(err));
  }
}

module.exports = {
  capture
};
