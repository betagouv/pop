import * as Sentry from "@sentry/browser";

const SENTRY_PUBLIC_DSN = "https://9cca185065d74dbd9e05987036f2d16d@sentry.data.gouv.fr/21";

if (typeof window !== "undefined") {
  Sentry.init({ dsn: SENTRY_PUBLIC_DSN });
}

export default Sentry;
