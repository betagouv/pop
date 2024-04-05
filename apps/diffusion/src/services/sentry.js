import * as Sentry from "@sentry/browser";
import { sentryDsn } from "../config";

if (typeof window !== "undefined") {
	Sentry.init({
		dsn: sentryDsn,
		release: "pop-consultation@" + require("../../package.json").version,
		environment: process.env.NODE_ENV,
		enabled: process.env.NODE_ENV === "production",
	});
}

export default Sentry;
