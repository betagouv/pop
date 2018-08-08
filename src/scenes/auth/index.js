import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { history } from '../../redux/store';

import './index.css';

export default class Auth extends Component {

  state = {
    step: 'signin',
  }

  componentWillMount() {
    this.setState({ step: this.props.match.params.step });
  }

  onDone() {
    history.goBack();
  }

  renderStep() {
    if (this.state.step === 'forgotpassword') {
      return <ForgotPassword onDone={this.onDone.bind(this)} goTo={(step) => { this.setState({ step }) }} />
    } else {
      return <Signin onDone={this.onDone.bind(this)} goTo={(step) => { this.setState({ step }) }} />
    }
  }
  render() {
    return (
      <div className="auth">
        {this.renderStep()}
      </div>
    );
  }
}


class ForgotPassword extends Component {
  state = { mail: '', error: '', done: false }

  forgetPassword() {
    firebase.forgotPassword(this.state.mail).then((c) => {
      this.setState({ done: true });
    }).catch((e) => {
      this.setState({ error: e.message, loading: false })
    })
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

class Signin extends Component {

  state = { mail: "", password: "", error: "" }

  loginWithEmail() {
    api.signin(this.state.mail, this.state.password).then(() => {
      this.props.onDone();
    }).catch((e) => {
      this.setState({ error: "Impossible de se connecter : ", e })
    })
  }

  render() {
    return (
      <Container className="signin">
        <div className="block">
          <h1>Se connecter à POP</h1>
          <span>{this.state.error}</span>
          <input
            className="input-field"
            placeholder="Email"
            value={this.state.mail}
            onChange={(e) => this.setState({ mail: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <div className="link" onClick={() => { this.props.goTo("forgotpassword") }}>Mot de passe oublié ?</div>
          <Button className="submit-button" onClick={this.loginWithEmail.bind(this)}>Se connecter</Button>
        </div>
      </Container>
    );
  }
}
