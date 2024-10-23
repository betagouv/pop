import * as Sentry from "@sentry/react";
import { history } from "./redux/store";
import {
	sentry_env,
	sentry_dsn,
	sentry_tracesSampleRate,
	commitHash,
	api_url,
} from "./config";

Sentry.init({
	dsn: sentry_dsn,
	environment: sentry_env,
	release: `pop-edition:${commitHash}`,
	enabled: sentry_env !== "local",
	integrations: [
		// See docs for support of different versions of variation of react router
		// https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
		Sentry.reactRouterV5BrowserTracingIntegration({
			history,
		}),
		Sentry.replayIntegration(),
	],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for tracing.
	tracesSampleRate: sentry_tracesSampleRate,

	// Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
	tracePropagationTargets: ["localhost", api_url],

	// Capture Replay for 10% of all sessions,
	// plus for 100% of sessions with an error
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
});
