import React from "react";
import App, { Container } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import "./_app.css";

export default class MyApp extends App {

  componentDidMount() {
    NProgress.configure({ showSpinner: false });
    Router.events.on("routeChangeStart", url => {
      NProgress.start();
      if (window && window._paq) {
        window._paq.push(["setCustomUrl", url]);
        window._paq.push(["setDocumentTitle", document.title]);
        window._paq.push(["trackPageView"]);
      }
    });
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
