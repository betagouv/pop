import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Loader from '../../components/loader';

export default class updatePassword extends Component {
  state = {
    ppwd: "",
    ppwd1: "",
    ppwd2: "",
    loading: false,
    done: false,
    error: ""
  }

  updatePassword() {
    const { ppwd, ppwd1, ppwd2 } = this.state;
    this.setState({ loading: true })
    api.updatePassword(ppwd, ppwd1, ppwd2)
      .then(() => {
        this.setState({ loading: false, done: false })
      })
      .catch((e) => {
        this.setState({ error: e, loading: false, done: false })
      })
  }

  render() {

    if (this.state.loading) {
      return <Loader />
    }

    if (this.state.done) {
      <Container className="signin">
        <div className="block">
          Votre Mot de passe à été changé. Vous allez être deconnecté
        </div>
      </Container>
    }

    return (
      <Container className="signin">
        <div className="block">
          <h1>Changer mon mot de passe</h1>
          <input
            className="input-field"
            placeholder="Ancien Mot de passe"
            type="password"
            value={this.state.ppwd}
            onChange={(e) => this.setState({ ppwd: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Nouveau Mot de passe"
            type="password"
            value={this.state.ppwd1}
            onChange={(e) => this.setState({ ppwd1: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Nouveau Mot de passe (confirmation)"
            type="password"
            value={this.state.ppwd2}
            onChange={(e) => this.setState({ ppwd2: e.target.value })}
          />
          <Button className="submit-button" onClick={this.updatePassword.bind(this)}>Mettre à jour mon mot de passe</Button>
        </div>
      </Container>
    );
  }
}