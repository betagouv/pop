import * as Sentry from "@sentry/nextjs";
import { sentryDsn, sentryEnv, commitHash } from "../config";

export const sentryConfig = {
	dsn: sentryDsn,
	release: `pop-consultation:${commitHash}`,
	environment: sentryEnv,
	enabled: process.env.NODE_ENV !== "local",
	tracesSampleRate: 0.3,
};

export default Sentry;
