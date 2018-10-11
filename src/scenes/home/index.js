import React from "react";
import { Col, Container, Alert } from "reactstrap";
import { Link } from "react-router-dom";

import "./index.css";

export default class Home extends React.Component {
  state = {
    alert: process.env.NODE_ENV !== "production"
  };
  renderTiles(tiles) {
    return tiles.map(({ url, name, image }, i) => {
      return (
        <Col md="2" className="box text-center" key={i}>
          <Link style={{ textDecoration: "none" }} to={url}>
            <div className="tile">
              <img src={image} alt="dummy image" className="img-fluid" />
              <div className="caption">
                <div className="name">{name}</div>
              </div>
            </div>
          </Link>
        </Col>
      );
    });
  }

  renderAlert() {
    return (
      <Container style={{ paddingTop: "20px" }}>
        <Alert
          color="danger"
          isOpen={this.state.alert}
          toggle={() => this.setState({ alert: false })}
        >
          Les notices que vous versez sur cette plateforme de test ne seront pas
          publiées en diffusion. Si vous souhaitez publier vos données sur notre
          site pop.culture.gouv.fr, connectez-vous sur la plateforme de
          production :
          <a
            href="http://pop-production.eu-west-3.elasticbeanstalk.com/auth/signin"
            className="alert-link"
          >
            Lien vers la production
          </a>
        </Alert>
      </Container>
    );
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <Container className="home">
          <div className="title">
            Bienvenue dans l'outil d'administration des bases du Ministère de la
            Culture !
          </div>
          <div className="subtitle">
            <p>
              Depuis cet espace, et en fonction des droits qui vous auront été
              attribués, vous pouvez&nbsp;:
            </p>
            <ul>
              <li>
                consulter l'ensemble des données publiques et confidentielles
                déjà importées dans les bases,
              </li>
              <li>
                importer des données pour alimenter les bases en nouvelles
                création ou pour remplacer intégralement des notices existantes.
              </li>
            </ul>
          </div>
        </Container>
      </div>
    );
  }
}
