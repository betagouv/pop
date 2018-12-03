import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";

import "./home.css";

export default class Search extends React.Component {
  renderTiles(tiles) {
    return tiles.map(({ url, name, image }, i) => {
      return (
        <Col xl="2" lg="4" md="4" className="box text-center" key={i}>
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

  render() {
    return (
      <Container fluid>
        <div className="home-search">
          <div className="subtitle">Je souhaite consulter la base</div>
          <Row>
            {this.renderTiles([
              {
                url: "/recherche/joconde",
                name: "Joconde",
                image: require("../../assets/joconde.jpg")
              },
              {
                url: "/recherche/merimee",
                name: "Mérimée",
                image: require("../../assets/merimee.jpg")
              },
              {
                url: "/recherche/palissy",
                name: "Palissy",
                image: require("../../assets/palissy.jpg")
              },
              {
                url: "/recherche/memoire",
                name: "Mémoire",
                image: require("../../assets/memoire.jpg")
              },
              {
                url: "/recherche/mnr",
                name: "MNR",
                image: require("../../assets/MNR.jpg")
              }
            ])}
          </Row>
        </div>
      </Container>
    );
  }
}
