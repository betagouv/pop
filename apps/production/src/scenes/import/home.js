import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";

import "./home.css";

class Import extends React.Component {
  renderTiles(tiles) {
    return tiles.map(({ url, name, image }, i) => {
      return (
        <Col xl="4" lg="4" md="3" className="box text-center" key={i}>
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
    const image = require("../../assets/outbox.png");
    return (
      <Container fluid>
        <div className="home-import">
          <div className="subtitle">Je souhaite importer</div>
          <Row>
            {this.renderTiles([
              {
                url: "/import/joconde",
                name: "Joconde",
                image
              },
              {
                url: "/import/mnr",
                name: "MNR",
                image
              },
              {
                url: "/import/inv",
                name: "Inventaire",
                image
              },
              {
                url: "/import/mh",
                name: "Monuments historiques",
                image
              },
              {
                url: "/import/memoire",
                name: "MAP (Service Archives Photos)",
                image
              }
            ])}
          </Row>
          <Row>
            <Col className="m-4 text-center">
            {this.props.group === "admin" ? (
              <Link to="/import/list">Consultez les anciens imports</Link>
            ) : (
              <div />
            )}
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  const { group } = Auth.user;
  return { group };
};

export default connect(
  mapStateToProps,
  {}
)(Import);
