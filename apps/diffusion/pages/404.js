import React from "react";
import Layout from "../src/components/Layout";
import Sentry from "../src/services/sentry";
import { Container, Row, Col } from "reactstrap";
import Head from "next/head";

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

  componentDidMount() {
    const { statusCode } = this.props;
    if (statusCode && statusCode > 200 && statusCode !== 404) {
      notifySentry(new BrowserException(statusCode));
    }
  }

  render() { console.log(this.props.statusCode)
    if (this.props.statusCode && this.props.statusCode === 404) {
      return (
        <Layout>
          <Container fluid>
            <div className="not-found">
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
            </div>
          </Container>
          <style jsx>{`
            .not-found {
              text-align: center;
              padding-top: 35vh;
              display: flex;
              padding: 60px;
            }
            .not-found img {
              width: 400px;
            }
            .not-found .not-found-right {
              flex: 1;
            }
            .not-found .not-found-left {
              padding-left: 25px;
              padding-right: 25px;
              padding-top: 50px;
              flex: 1;
            }
          `}</style>
        </Layout>
      );
    }
    return (
      <Layout>
        <Container>
          <div className="pop-error">
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
          </div>
        </Container>
        <style jsx>{`
          .pop-error {
            text-align: center;
            padding-top: 60px;
            padding-bottom: 60px;
          }
          .pop-error h1 {
            padding-top: 50px;
          }
          .pop-error img {
            max-width: 300px;
          }
        `}</style>
      </Layout>
    );
  }
}
