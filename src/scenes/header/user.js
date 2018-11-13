import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Avatar from "../../components/avatar";

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

  renderPicto() {
    if (!this.props.account) {
      return <div />;
    }
    return (
      <Dropdown isOpen={true} className="DropDownCont" toggle={() => {}}>
        <DropdownToggle className="UserImageContainer">
          <Avatar
            email={this.props.account.email}
            toggle={() =>
              this.setState({ dropdownOpen: !this.state.dropdownOpen })
            }
            isOpen={this.state.dropdownOpen}
          />
        </DropdownToggle>
        <DropdownMenu className="DropDown">
          <DropdownItem
            className="dropdown-item"
            onClick={() => history.push("/auth/updateprofile")}
          >
            Modifier mes informations
          </DropdownItem>
          <DropdownItem
            className="dropdown-item"
            onClick={() => history.push("/thesaurus")}
          >
            Mettre à jour le thesaurus
          </DropdownItem>
          <DropdownItem
            className="dropdown-item"
            onClick={this.logout.bind(this)}
          >
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
  return { account: Auth.user };
};

export default connect(
  mapStateToProps,
  { logout }
)(User);
