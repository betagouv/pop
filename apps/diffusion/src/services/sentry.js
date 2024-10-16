import * as Sentry from "@sentry/browser";
import { sentryDsn, sentryEnv, commitHash } from "../config";

if (typeof window !== "undefined") {
	Sentry.init({
		dsn: sentryDsn,
		release: `pop-consultation:${commitHash}`,
		environment: sentryEnv,
		enabled: process.env.NODE_ENV !== "local",
		tracesSampleRate: 0.3,
	});
}

export default Sentry;
