import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";

import "./Home.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    const tiles = [];
    tiles.push({
      url: "/recherche/joconde",
      name: "Joconde",
      image: require("../../../assets/joconde.jpg")
    });
    tiles.push({
      url: "/recherche/mnr",
      name: "MNR",
      image: require("../../../assets/MNR.jpg")
    });
    tiles.push({
      url: "/recherche/merimee",
      name: "Mérimée",
      image: require("../../../assets/merimee.jpg")
    });
    tiles.push({
      url: "/recherche/palissy",
      name: "Palissy",
      image: require("../../../assets/palissy.jpg")
    });
    tiles.push({
      url: "/recherche/memoire",
      name: "Mémoire",
      image: require("../../../assets/memoire.jpg")
    });

    if (this.props.group === "admin") {
      tiles.push({
        url: "/recherche/museo",
        name: "Museo",
        image: require("../../../assets/museo.jpg")
      });
    }

    this.state = {
      tiles
    };
  }

  renderTiles() {
    return this.state.tiles.map(({ url, name, image }, i) => {
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
          <Row>{this.renderTiles()}</Row>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  const { group } = Auth.user;

  console.log("GROUP", group);
  return {
    group
  };
};

export default connect(
  mapStateToProps,
  {}
)(Search);
