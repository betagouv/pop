import React from "react";
import Layout from "../components/Layout";
import NotFound from "../components/NotFound";
import ErrorBoundary from "../components/ErrorBoundary";
import * as Sentry from '@sentry/browser';

const SENTRY_PUBLIC_DSN = "https://9cca185065d74dbd9e05987036f2d16d@sentry.data.gouv.fr/21";

if (typeof window !== "undefined") {
  Sentry.init({ dsn: SENTRY_PUBLIC_DSN, debug: true });
}

const BrowserException = args => new Error(args);
const notifySentry = err => {
  if (typeof window === "undefined") {
    return;
  }
  Sentry.configureScope(scope => {
    scope.setTag(`ssr`, false);
  });
  Sentry.captureException(err);
};

export default class Error extends React.Component {
  static getInitialProps({ res, err, statusCode }) {
    statusCode = statusCode || (res ? res.statusCode : err ? err.statusCode : null);
    return { statusCode };
  }

  componentDidMount() {
    const { statusCode } = this.props;
    if (statusCode && statusCode > 200) {
      notifySentry(new BrowserException(statusCode));
    }
  }

  render() {
    if (this.props.statusCode && this.props.statusCode === 404) {
      return (
        <Layout>
          <NotFound />
        </Layout>
      );
    }
    return (
      <Layout>
        <ErrorBoundary />
      </Layout>
    );
  }
}
