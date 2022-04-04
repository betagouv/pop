import * as Sentry from "@sentry/browser";

const SENTRY_PUBLIC_DSN = process.env.SENTRY_DSN | "";

if (typeof window !== "undefined") {
  Sentry.init({ dsn: SENTRY_PUBLIC_DSN });
}

export default Sentry;
