import React from "react";
import Layout from "../src/components/Layout";
import Sentry from "../src/services/sentry";
import { Container, Row, Col } from "reactstrap";
import Head from "next/head";
import "./_error.css";

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
    if (statusCode && statusCode > 200 && statusCode !== 404) {
      notifySentry(new BrowserException(statusCode));
    }
  }

  render() {
    if (this.props.statusCode && this.props.statusCode === 404) {
      return (
        <Layout>
          <Container className="not-found" fluid>
            <Head>
              <title>Page introuvable - POP - Plateforme Ouverte du Patrimoine</title>
            </Head>
            <div className="not-found-left">
              <h1>POPSI !</h1>
              <p>
                La page que vous recherchez est introuvable...
                <br />
                <br />
                Ne désespérez pas, nos archéobogues sont sur le coup !<br />
                Vous pouvez <a href="/">essayer une nouvelle recherche</a>
              </p>
            </div>
            <div className="not-found-right">
              <img src="/static/courbet.jpeg" alt="Gustave courbet, le désespéré" />
              <br />
              Gustave courbet, le désespéré
            </div>
          </Container>
        </Layout>
      );
    }
    return (
      <Layout>
        <Container className="pop-error">
          <Head>
            <title>POP - Plateforme Ouverte du Patrimoine</title>
          </Head>
          <Row>
            <Col>
              <h1>Oups !</h1>
              <p>
                On a entendu comme un petit BOUM dans POP.
                <br />
                L'équipe est dessus, revenez dans quelques instants.
              </p>
            </Col>
            <Col>
              <img src="/static/roy-lichtenstein.jpg" alt="I...I'm sorry, Roy Lichtenstein" />
              <br />
              I...I'm sorry, Roy Lichtenstein
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}
