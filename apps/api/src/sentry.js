const Sentry = require("@sentry/node");
const { logger } = require("./logger");

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
