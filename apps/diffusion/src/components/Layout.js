import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Container } from "reactstrap";

import "./Layout.css";

export default class Layout extends React.Component {

  render() {
    const { children } = this.props;
    return (
      <div>
        <div className="header">
          <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
            <meta
              name="google-site-verification"
              content="AwpDhFkuFQsZzA8EKSQ6nI4OYbCkAvHKKFf4dYVdytU"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/css/bootstrap.min.css"
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
            <link rel="manifest" href="/manifest.json" />
            <link rel="shortcut icon" href="/favicon.ico" />

            <script src="/static/driftt.js" />
            <script src="/static/piwik.js" />
            <script src="/static/amplitude.js" />
          </Head>
          <Container className="NavContainer">
            <Link prefetch href="/">
              <a className="logo">
                <img src="/static/logo.png" alt="Logo" className="md" />
                <h1>Ministère de la Culture</h1>
              </a>
            </Link>
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

              <div className="company-title">
                <span>Plateforme</span>
                <span>Ouverte du</span>
                <span>Patrimoine</span>
              </div>
              <div id="beta">
                <div>
                  <span>BETA</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        {children}
        <div className="footer">
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="https://beta.gouv.fr/startup/pop.html" target="_blank">
                À propos
              </a>
            </li>
            <li className="list-inline-item">
              <Link href="/opendata" prefetch>
                <a>Télécharger les bases</a>
              </Link>
            </li>
            <li className="list-inline-item">
              <a href={`mailto:pop.reseaux@gmail.com`} target="_blank">
                Nous contacter
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
