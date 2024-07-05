const Sentry = require("@sentry/node");
const config = require("./config");
const { logger } = require("./logger");

if (config.sentryDSN) {
  Sentry.init({
    dsn: config.sentryDSN,
    environment: process.env.NODE_ENV,
    attachStacktrace: true,
  });
}

function capture(err) {
  if (process.env.NODE_ENV !== "test") {
    logger.error(err);
  }
  if (Sentry) {
    Sentry.captureException(JSON.stringify(err));
  }
}

module.exports = {
  capture,
};
