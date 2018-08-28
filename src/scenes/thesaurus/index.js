import React, { Component } from 'react';
import { Input, Container, Button, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

import Loader from '../../components/loader';
import api from '../../services/api';


import './index.css';

export default class ImportComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arc: '',
      done: false,
      loading: false,
      error: '',
    }
  }

  onUpdate() {
    this.setState({ loading: true })
    api.updateThesaurus(this.state.arc)
      .then((e) => {
        this.setState({ loading: false, done: true })
      })
      .catch(e => {
        console.log("CATCH", e)
        this.setState({ loading: false, done: false, error: 'error' })
      })
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='import-container'>
          <Loader />
        </div>
      );
    }

    if (this.state.done) {
      return (
        <div className='import-container'>
          <div>{this.state.loadingMessage}</div>
          <Link to='/'>Revenir a la page d'accueil</Link>
        </div>
      );
    }

    return (
      <Container className='thesaurus'>
        <div className='inputzone'>
          <Input
            onChange={(e) => this.setState({ arc: e.target.value })}
            value={this.state.arc}
            placeholder='http://data.culture.fr/thesaurus/resource/ark:/67717/T96'
          />
          <Button color='primary' onClick={this.onUpdate.bind(this)}>Update</Button>
        </div>
        <div>{this.state.error}</div>
      </Container >
    );
  }
}
