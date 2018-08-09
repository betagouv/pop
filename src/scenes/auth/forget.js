import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import api from '../../services/api';

export default class ForgotPassword extends Component {
  state = { mail: '', error: '', done: false }

  forgetPassword() {

  }

  render() {
    if (this.state.done) {
      return (
        <Container className="forgot">
          <div className="block">
            <p className="message">Click on the URL provided in the email and enter a new password</p>
          </div>
        </Container>
      );
    }

    return (
      <Container className="forgot">
        <div className="block">
          <span>{this.state.error}</span>
          <p className="forgot-text">Entrez votre email. Nous allons vous renvoyer un mot de passe temporaire</p>
          <input
            className="input-field"
            placeholder="Email"
            value={this.state.mail}
            onChange={(e) => this.setState({ mail: e.target.value })}
          />
          <Button onClick={this.forgetPassword.bind(this)} className="submit-button">Réinitialiser le mot de passe</Button>
        </div>
      </Container>
    );
  }
}

