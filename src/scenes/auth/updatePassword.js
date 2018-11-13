import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import api from "../../services/api";
import Loader from "../../components/loader";

import authAction from "../../redux/auth/actions";
const { logout } = authAction;

class UpdatePassword extends Component {
  state = {
    ppwd: "",
    ppwd1: "",
    ppwd2: "",
    loading: false,
    done: false,
    error: ""
  };

  updatePassword() {
    const { ppwd, ppwd1, ppwd2 } = this.state;
    this.setState({ loading: true });
    api
      .updatePassword(this.props.email, ppwd, ppwd1, ppwd2)
      .then(() => {
        this.setState({ loading: false, done: true });
        setTimeout(() => {
          this.props.logout();
        }, 5000);
      })
      .catch(e => {
        this.setState({ error: e, loading: false, done: false });
      });
  }

  resetPasswordMessage() {
    if (this.props.hasResetPassword) {
      return <div />;
    }
    return (
      <p>
        Vous n'avez pas encore changé votre mot de passe. Pour votre sécurité,
        vous devez le changer avant de continuer.
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

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    if (this.state.done) {
      return (
        <Container className="signin">
          <div>
            Votre mot de passe à été changé. <br />
            Vous allez être deconnecté dans 5 secondes ...{" "}
          </div>
        </Container>
      );
    }

    //If the user is not login, he shouldnt have access to the page. Its a restricted page
    if (!this.props.email) {
      return (
        <Redirect
          to={{
            pathname: "/auth/signin",
            state: { from: this.props.location }
          }}
        />
      );
    }

    return (
      <Container className="signin">
        <div className="block">
          <h1>Changer mon mot de passe</h1>
          {this.resetPasswordMessage()}
          <div>{this.state.error}</div>
          <input
            className="input-field"
            placeholder="Mot de passe actuel"
            type="password"
            value={this.state.ppwd}
            onChange={e => this.setState({ ppwd: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Nouveau Mot de passe"
            type="password"
            value={this.state.ppwd1}
            onChange={e => this.setState({ ppwd1: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Nouveau Mot de passe (confirmation)"
            type="password"
            value={this.state.ppwd2}
            onChange={e => this.setState({ ppwd2: e.target.value })}
          />
          <Button
            className="submit-button"
            onClick={this.updatePassword.bind(this)}
          >
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
