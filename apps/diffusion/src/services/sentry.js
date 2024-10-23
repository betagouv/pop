import * as Sentry from "@sentry/nextjs";
import {
	sentryDsn,
	sentryEnv,
	sentryTracesSampleRate,
	commitHash,
} from "../config";

export const sentryConfig = {
	dsn: sentryDsn,
	release: `pop-diffusion:${commitHash}`,
	environment: sentryEnv,
	enabled: process.env.NODE_ENV !== "local",
	tracesSampleRate: sentryTracesSampleRate,
};

export default Sentry;
