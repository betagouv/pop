import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

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
          <p className="forgot-text">Enter your email address. we will send you a password reset link in your email.</p>
          <input
            className="input-field"
            placeholder="Email"
            value={this.state.mail}
            onChange={(e) => this.setState({ mail: e.target.value })}
          />
          <button onClick={this.forgetPassword.bind(this)} className="submit-button">Send password</button>
        </div>
      </Container>
    );
  }
}

class Email extends Component {
  state = { mail: '' }

  saveEmail() {
    // firebase.loginWithEmail(this.state.mail, this.state.password).then(() => {
    //     this.props.onDone();
    // }).catch((e) => {
    //     this.setState({ error: "Cant connect with mail : ", e })
    // })
  }

  onSocialLogin() {
    this.props.onDone();
  }

  render() {
    return (
      <Container className="signin">
        <div className="block">
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
          <div className="link" onClick={() => { this.props.goTo("forgotpassword") }}>Forgot password ?</div>
          <button className="submit-button" onClick={this.loginWithEmail.bind(this)}>Sign in</button>
          <div className="signup-text">Don"t have an account? <div className="link" onClick={() => { this.props.goTo("signup") }}>Sign Up here</div></div>
        </div>
      </Container>
    );
  }
}

class Signin extends Component {

  state = { mail: "", password: "", error: "" }

  loginWithEmail() {
    // firebase.loginWithEmail(this.state.mail, this.state.password).then(() => {
    //   this.props.onDone();
    // }).catch((e) => {
    //   this.setState({ error: e.message })
    // })
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
          <div className="link" onClick={() => { this.props.goTo("forgotpassword") }}>Forgot password ?</div>
          <button className="submit-button" onClick={this.loginWithEmail.bind(this)}>Sign in</button>
          <div className="signup-text">Don"t have an account? <div className="link" onClick={() => { this.props.goTo("signup") }}>Sign Up here</div></div>
        </div>
      </Container>
    );
  }
}
