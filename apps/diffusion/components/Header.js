import React from "react";
import { Container } from "reactstrap";
import Title from "./Title.js";
import Logo from "./Logo.js";
import Head from "next/head";
import "./Header.css";


export default () => (
  <div className="header">
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha256-azvvU9xKluwHFJ0Cpgtf0CYzK7zgtOznnzxV4924X1w="
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <link
        href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/0.50.0/mapbox-gl.js" />
      <script src="/static/driftt.js" />
      <script src="/static/piwik.js" />
    </Head>
    <Container className="NavContainer">
      <Logo />
      <div className="right-container">
        <div>
          <a
            href="https://fier2.typeform.com/to/Qyz3xv"
            className="btn btn-outline-danger d-none d-sm-block"
            target="_blank"
          >
            Votre avis est utile
          </a>
        </div>

        <Title />
        <div id="beta">
          <div>
            <span>BETA</span>
          </div>
        </div>
      </div>
    </Container>
  </div>
);
