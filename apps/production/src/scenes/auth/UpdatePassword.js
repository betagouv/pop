import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import api from "../../services/api";
import Loader from "../../components/Loader";

import authAction from "../../redux/auth/actions";
import { message_info_password } from "../../config";

const { logout } = authAction;

class UpdatePassword extends Component {
  state = {
    pwd: "",
    pwd1: "",
    pwd2: "",
    loading: false,
    done: false,
    error: ""
  };

  updatePassword() {
    const { pwd, pwd1, pwd2 } = this.state;
    this.setState({ loading: true });
    api

      .updatePassword({ email: this.props.email, pwd, pwd1, pwd2 })
      .then(() => {
        this.setState({ loading: false, done: true });
        setTimeout(() => {
          this.props.logout();
        }, 5000);
      })
      .catch(e => {
        this.setState({ error: e.msg, loading: false, done: false });
      });
  }

  resetPasswordMessage() {
    if (this.props.hasResetPassword) {
      return <div />;
    }
    return (
      <p>
        Vous n'avez pas encore changé votre mot de passe. Pour votre sécurité, vous devez le changer
        avant de continuer.
      </p>
    );
  }

  passwordSecurity(){
    if (this.props.hasResetPassword) {
      return <div />;
    }
    return (
      <p>
        { message_info_password }
      </p>
    );
  }

  lastConnectedAt() {
    if (!this.props.lastConnectedAt) {
      return <div />;
    }
    return (
      <p className="lastConnectedAt">
        <em>
          Date de dernière connection:{" "}
          {new Date(this.props.lastConnectedAt).toLocaleString("fr-FR")}
        </em>
      </p>
    );
  }

  renderError() {
    const error = this.state.error !== ""  ? this.state.error.split("\n").map( el  => { return (<p>{ el }</p>) }) : this.state.error;

    return (
      <div className="renderError">{ error }</div>
    );
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    if (this.state.done) {
      return (
        <Container className="signin">
          <div>
            Votre mot de passe à été changé. <br />
            Vous allez être deconnecté·e dans 5 secondes ...{" "}
          </div>
        </Container>
      );
    }

    // If the user is not logged in, she should not have access to the page.
    // It's a restricted page.
    if (!this.props.email) {
      return <Redirect to={{ pathname: "/auth/signin", state: { from: this.props.location } }} />;
    }

    return (
      <Container className="signin">
        <div className="block">
          <h1>Changer mon mot de passe</h1>
          {this.resetPasswordMessage()}
          {this.passwordSecurity()}
          <div className="error">{this.renderError()}</div>
          <input
            className="input-field"
            placeholder="Mot de passe actuel"
            type="password"
            value={this.state.pwd}
            onChange={e => this.setState({ pwd: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Nouveau Mot de passe"
            type="password"
            value={this.state.pwd1}
            onChange={e => this.setState({ pwd1: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Nouveau Mot de passe (confirmation)"
            type="password"
            value={this.state.pwd2}
            onChange={e => this.setState({ pwd2: e.target.value })}
          />
          <Button className="submit-button" onClick={this.updatePassword.bind(this)}>
            Mettre à jour mon mot de passe
          </Button>
          {this.lastConnectedAt()}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  return {
    email: Auth.user ? Auth.user.email : "",
    hasResetPassword: !!Auth.user && Auth.user.hasResetPassword,
    lastConnectedAt: !!Auth.user && Auth.user.lastConnectedAt
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(UpdatePassword);
