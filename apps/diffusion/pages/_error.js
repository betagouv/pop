import React from "react";
import Layout from "../src/components/Layout";
import NotFound from "../src/components/NotFound";
import ErrorBoundary from "../src/components/ErrorBoundary";
import Sentry from "../src/services/sentry";

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
