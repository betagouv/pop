import React from "react";
import App, { Container } from "next/app";
import NProgress from "next-nprogress/component";
import Router from "next/router";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  componentDidMount() {
    Router.events.on("routeChangeStart", url => {
      if (window && window._paq) {
        window._paq.push(["setCustomUrl", url]);
        window._paq.push(["setDocumentTitle", document.title]);
        window._paq.push(["trackPageView"]);
      }
    });
    Router.events.on("routeChangeComplete", () => {
      if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "staging") {
        const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
        const timestamp = new Date().valueOf();
        els[0].href = "/_next/static/css/styles.chunk.css?v=" + timestamp;
      }
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <NProgress />
        <Component {...pageProps} />
      </Container>
    );
  }
}
