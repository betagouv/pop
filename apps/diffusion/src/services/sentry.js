import * as Sentry from "@sentry/browser";

// const SENTRY_PUBLIC_DSN = "https://9cca185065d74dbd9e05987036f2d16d@sentry.data.gouv.fr/21";
const SENTRY_PUBLIC_DSN = "https://e38c3de154d443fa86bcbcc815a3c8ea@o1104995.ingest.sentry.io/6164479";

if (typeof window !== "undefined") {
  Sentry.init({ dsn: SENTRY_PUBLIC_DSN });
}

export default Sentry;
