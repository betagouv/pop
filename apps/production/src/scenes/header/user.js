import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Avatar from "../../components/Avatar";

import authAction from "./../../redux/auth/actions";
const { logout } = authAction;

import { history } from "../../redux/store";

import "./user.css";

class User extends Component {
  state = {
    dropdownOpen: false
  };

  logout() {
    this.props.logout();
  }

  renderSigninSignup() {
    if (this.props.account) {
      return <div />;
    }
    return <Link to="/auth/signin">Se connecter</Link>;
  }

  renderImportList() {
    if (this.props.account.role !== "administrateur") {
      return <div />;
    }
    return (
      <DropdownItem className="dropdown-item" onClick={() => history.push("/import/list")}>
        Accéder à l'historique des imports
      </DropdownItem>
    );
  }

  renderPicto() {
    if (!this.props.account) {
      return <div />;
    }
    return (
      <Dropdown
        toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })}
        isOpen={this.state.dropdownOpen}
        className="DropDownCont"
      >
        <DropdownToggle className="UserImageContainer">
          <Avatar email={this.props.account.email} />
        </DropdownToggle>
        <DropdownMenu className="DropDown">
          <DropdownItem
            className="dropdown-item"
            onClick={() => history.push("/auth/updateprofile")}
          >
            Modifier mes informations
          </DropdownItem>
          {this.renderImportList()}
          <DropdownItem className="dropdown-item" onClick={() => history.push("/thesaurus")}>
            Mettre à jour le thesaurus
          </DropdownItem>
          <DropdownItem className="dropdown-item" onClick={this.logout.bind(this)}>
            Se déconnecter
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    return (
      <div className="User">
        {this.renderSigninSignup()}
        {this.renderPicto()}
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  console.log("Auth", Auth);
  return { account: Auth.user };
};

export default connect(
  mapStateToProps,
  { logout }
)(User);
