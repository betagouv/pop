const Sentry = require("@sentry/node");
const config = require("./config");

if (config.sentryDSN) {
	Sentry.init({
		dsn: config.sentryDSN,
		environment: config.sentryEnv,
		release: `pop-api:${config.commitHash}`,
		attachStacktrace: true,
		tracesSampleRate: 1.0,
	});
}

const app = require("./app");
const { PORT } = require("./config.js");

app.listen(PORT, () =>
	console.log(`Listening on port ${PORT} at ${new Date().toGMTString()}`),
);
