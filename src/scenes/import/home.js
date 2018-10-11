import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

import "./home.css";

export default class Import extends React.Component {
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

  render() {
    return (
      <div className="home-import">
        <div className="subtitle">Je souhaite importer</div>
        <Row>
          {this.renderTiles([
            {
              url: "/import/joconde",
              name: "Joconde",
              image: require("../../assets/outbox.png")
            },
            {
              url: "/import/mnr",
              name: "MNR",
              image: require("../../assets/outbox.png")
            },
            {
              url: "/import/inv",
              name: "Inventaire",
              image: require("../../assets/outbox.png")
            },
            {
              url: "/import/mh",
              name: "Monuments historiques",
              image: require("../../assets/outbox.png")
            },
            {
              url: "/import/memoire",
              name: "Mémoire",
              image: require("../../assets/outbox.png")
            }
          ])}
        </Row>
      </div>
    );
  }
}
