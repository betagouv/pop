import React, { Component } from "react";
import { Container, Button } from "reactstrap";

import api from "../../services/api";

export default class ForgotPassword extends Component {
  state = { mail: "", error: "", done: false };

  forgetPassword() {
    const { mail } = this.state;
    this.setState({ loading: true });
    api
      .forgetPassword(mail)
      .then(() => {
        this.setState({ loading: false, done: true });
      })
      .catch(e => {
        this.setState({ error: e, loading: false, done: false });
      });
  }

  render() {
    if (this.state.done) {
      return (
        <Container className="forgot">
          <div className="block">
            <p className="message">{`Un email vous a été envoyé sur ${
              this.state.mail
            }`}</p>
          </div>
        </Container>
      );
    }

    return (
      <Container className="forgot">
        <div className="block">
          <span>{this.state.error}</span>
          <p className="forgot-text">
            Entrez votre email. Nous allons vous renvoyer un mot de passe
            temporaire.
          </p>
          <input
            className="input-field"
            placeholder="Email"
            value={this.state.mail}
            onChange={e => this.setState({ mail: e.target.value })}
          />
          <Button
            onClick={this.forgetPassword.bind(this)}
            className="submit-button"
          >
            Réinitialiser le mot de passe
          </Button>
        </div>
      </Container>
    );
  }
}
