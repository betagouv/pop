import React, { Component } from "react";
import { Container, Button } from "reactstrap";

import api from "../../services/api";

export default class ForgotPassword extends Component {
  state = { mail: "", error: "", done: false };

  async forgetPassword() {
    const { mail } = this.state;
    this.setState({ loading: true });
    try {
      await api.forgetPassword(mail);
      this.setState({ loading: false, done: true, error: "" });
    } catch (e) {
      this.setState({ error: e.msg, loading: false, done: false });
    }
  }

  render() {
    if (this.state.done) {
      return (
        <Container className="forgot">
          <div className="block">
            <p className="message">{`Un email vous a été envoyé sur ${this.state.mail}`}</p>
          </div>
        </Container>
      );
    }

    return (
      <Container className="forgot">
        <div className="block">
          <div className="error text-center">{this.state.error}</div>
          <p className="forgot-text">
            Entrez votre email. Nous allons vous renvoyer un mot de passe temporaire.
          </p>
          <input
            className="input-field"
            placeholder="Email"
            value={this.state.mail}
            onChange={e => this.setState({ mail: e.target.value })}
          />
          <Button onClick={this.forgetPassword.bind(this)} className="submit-button">
            Réinitialiser le mot de passe
          </Button>
        </div>
      </Container>
    );
  }
}
