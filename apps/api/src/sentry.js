const Sentry = require("@sentry/node");
const logger = require("./logger");

if (process.env.SENTRY_DSN) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		release: `pop-api@${require("../package.json").version}`,
		environment: process.env.NODE_ENV,
		attachStacktrace: true,
	});
}

function capture(err) {
	if (process.env.NODE_ENV !== "test") {
		logger.error({ message: `New Error : ${err}` });
	}
	if (Sentry) {
		Sentry.captureException(JSON.stringify(err));
	}
}

module.exports = {
	capture,
};
