import React from "react";
import App, { Container } from "next/app";
import NProgress from "next-nprogress/component";
import Router from "next/router";
import "./_app.css";

export default class MyApp extends App {

  componentDidMount() {
    Router.events.on("routeChangeStart", url => {
      if (window && window._paq) {
        window._paq.push(["setCustomUrl", url]);
        window._paq.push(["setDocumentTitle", document.title]);
        window._paq.push(["trackPageView"]);
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
