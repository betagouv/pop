import * as Sentry from "@sentry/browser";

if (typeof window !== "undefined"  && process.env.SENTRY_DSN ) {
  Sentry.init({ 
    dsn: `${ process.env.SENTRY_DSN }`,
    release: "pop-consultation@" + require("../../package.json").version,
    environment: `${ process.env.NODE_ENV }`
  });
}

export default Sentry;
