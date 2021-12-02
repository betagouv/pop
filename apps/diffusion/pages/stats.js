import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import { Container, Row, Col } from "reactstrap";
import Layout from "../src/components/Layout";
import API from "../src/services/api";
import https from "https";

export default class extends React.Component {
  static async getInitialProps() {
    // Mise en place du custom agent pour éviter l'erreur "reason: certificate has expired"
    // TODO supprimer l'agent dès que la version de nodejs sera mise à jour
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const matomoReponse = await fetch(
      "https://stats.data.gouv.fr/index.php?module=API&method=VisitsSummary.getVisits&idSite=63&period=range&date=previous30&format=JSON&token_auth=anonymous", 
      { agent }
    );
    const usersCount = (await matomoReponse.json()).value;
    const importsCount = await API.getImportCount();
    return { usersCount, importsCount };
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>Statistiques - POP</title>
          <meta
            name="description"
            content="Statistiques de la Plateforme Ouverte du Patrimoine POP."
          />
        </Head>
        <Container>
          <h1 style={{ color: "#19414c", fontWeight: 500, marginTop: "30px", fontSize: "28px" }}>
            Statistiques d'usage
          </h1>
          <div className="stats">
            <Row>
              <Col md="6">
                <div class="card mt-4 mb-4">
                  <div class="card-body text-center">
                    <p />
                    <h3>{this.props.usersCount}</h3>
                    <p>visites sur les 30 derniers jours</p>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div class="card mt-4 mb-4">
                  <div class="card-body text-center">
                    <p />
                    <h3>{this.props.importsCount}</h3>
                    <p>imports réalisés</p>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div class="card mt-4 mb-4">
                  <div class="card-body text-center">
                    <p />
                    <h3>8</h3>
                    <p>bases indexées</p>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div class="card mt-4 mb-4">
                  <div class="card-body text-center">
                    <p />
                    <h3>{">"} 3 millions</h3>
                    <p>notices disponibles</p>
                  </div>
                </div>
              </Col>
            </Row>
            <div class="text-center">
              Les{" "}
              <a href="https://stats.data.gouv.fr/index.php?module=CoreHome&action=index&idSite=63&period=range&date=previous30&updated=1#?idSite=63&period=range&date=previous30&category=Dashboard_Dashboard&subcategory=1">
                statistiques d'usage
              </a>{" "}
              de POP sont publiques.
            </div>
          </div>
        </Container>
      </Layout>
    );
  }
}
