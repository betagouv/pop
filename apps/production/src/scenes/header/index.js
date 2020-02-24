import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "reactstrap";

import User from "./user.js";
import Logo from "./logo.js";

import "./index.css";

class NavComponent extends React.Component {
  renderLinks() {
    if (!this.props.connected) {
      return;
    }

    const hasAdminRole = this.props.role === "administrateur";
    const hasProductorRole = this.props.role === "producteur";
    const hasAdmingroup = this.props.group === "admin";

    const links = [
      <Link to="/" key="home">
        Accueil
      </Link>,
      <Link to="/recherche" key="search">
        Recherche
      </Link>,
      hasAdminRole || hasProductorRole ? (
        <Link to="/import" key="import">
          Import
        </Link>
      ) : null,
      hasAdminRole && hasAdmingroup ? (
        <Link to="/gallery" key="gallery">
          Galerie
        </Link>
      ) : null,
      hasAdminRole ? (
        <Link to="/admin" key="admin">
          Administration
        </Link>
      ) : null,
      hasAdminRole ? (
        <Link to="/producteur" key="producteur">
          Producteurs
        </Link>
      ) : null,hasAdminRole ? (
        <Link to="/groups" key="groups">
          Groupes
        </Link>
      ) : null
    ].filter(Boolean);

    return (
      <React.Fragment>
        {links}
        <User />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="header">
        <Container className="NavContainer">
          <Logo />
          {this.renderLinks()}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  return {
    role: Auth.user ? Auth.user.role : "",
    group: Auth.user ? Auth.user.group : "",
    connected: !!Auth.user
  };
};

export default connect(
  mapStateToProps,
  {}
)(NavComponent);
