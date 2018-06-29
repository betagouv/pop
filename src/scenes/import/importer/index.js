import React, { Component } from 'react';
import { Row, Button, Container, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

import DropZone from './dropZone'
import Loader from '../../../components/loader';
import api from '../../../services/api'

import { diff, exportData } from './utils'
import checkThesaurus from './thesaurus'
import TableComponent from './table';

import './index.css';

export default class Importer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unChanged: [],
      created: [],
      updated: [],
      errors: null,
      displaySummary: false,
      done: false,
      loading: false,
      loadingMessage: ''
    }
  }

  async onFilesDropped(files) {    //check if there are not more fields*

    let importedNotices;

    try {
      //PARSE FILES
      importedNotices = await (this.props.parseFiles(files));
    } catch (e) {
      if (e) {
        this.setState({ errors: e })
        return;
      }
    }

    // //CONTROLE DE LA VALIDITE DES CHAMPS
    // for (var i = 0; i < importedNotices.length; i++) {
    //   importedNotices[i] = this.props.transform(importedNotices[i]);
    //   importedNotices[i].errors = {
    //     jsx: importedNotices[i].errors.map(e => <div><Badge color="danger">Erreur</Badge> {e}</div>),
    //     text: importedNotices[i].errors
    //   }
    // }

    //RECUPERATION DES NOTICES EXISTANTES
    const existingNotices = []
    for (var i = 0; i < importedNotices.length; i++) {
      this.setState({ loading: true, loadingMessage: `Récuperation des notices existantes ... ${i}/${importedNotices.length}` });
      const notice = await (api.getNotice(this.props.collection, importedNotices[i].notice.REF));
      if (notice) {
        existingNotices.push(notice);
      }
    }


    //CALCUL DE LA DIFF
    this.setState({ loadingMessage: 'Calcul des differences....' });
    importedNotices = diff(importedNotices, existingNotices);

    //CALCUL DU THESAURUS
    for (var i = 0; i < importedNotices.length; i++) {
      this.setState({ loading: true, loadingMessage: `Verification de la conformité thesaurus ... ${i}/${importedNotices.length}` });
      const warnings = await (checkThesaurus(importedNotices[i].notice, this.props.collection));
      importedNotices[i].warnings = warnings;
    }

    const unChanged = importedNotices.filter(e => e.status === 'unchanged');
    const created = importedNotices.filter(e => e.status === 'created');
    const updated = importedNotices.filter(e => e.status === 'updated');

    this.setState({ displaySummary: true, calculating: false, unChanged, created, updated, loading: false, loadingMessage: '' });
  }

  async onSave() {

    //Update notice
    for (var i = 0; i < this.state.updated.length; i++) {
      this.setState({ loading: true, loadingMessage: `Mise à jour des notices ... ${i}/${this.state.updated.length}` });
      const ref = this.state.updated[i].notice.REF;
      await api.updateNotice(ref, this.props.collection, this.state.updated[i].notice);
    }

    //Create notice
    for (var i = 0; i < this.state.created.length; i++) {
      this.setState({ loading: true, loadingMessage: `Creation des notices ... ${i}/${this.state.created.length}` });
      console.log('Create', this.state.created[i].notice)
      await api.createNotice(this.props.collection, this.state.created[i].notice);
    }

    this.setState({ loading: false, done: true, loadingMessage: `Import effectué avec succès` });
  }


  onExport() {
    const arr = [];
    for (var i = 0; i < this.state.updated.length; i++) {
      arr.push({ ...this.state.updated[i], type: 'MISE A JOUR' })
    }
    for (var i = 0; i < this.state.created.length; i++) {
      arr.push({ ...this.state.created[i], type: 'CREES' })
    }
    for (var i = 0; i < this.state.unChanged.length; i++) {
      arr.push({ ...this.state.unChanged[i], type: 'INCHANGEE' })
    }
    exportData(arr, 'export.csv')
  }

  renderSummary() {
    if (!this.state.displaySummary) {
      return <div />
    }
    return (
      <div className='import'>
        <TableComponent
          collection={this.props.collection}
          dataSource={this.state.updated}
          title='Ces notices seront mises à jour'
        />

        <TableComponent
          collection={this.props.collection}
          dataSource={this.state.created}
          title='Ces notices seront créées'
        />
        <TableComponent
          collection={this.props.collection}
          dataSource={this.state.unChanged}
          title='Ces notices resteront inchangées'
        />
        <div className='buttons'>
          <Button
            color="danger"
            onClick={() => this.setState({ displaySummary: false })}
          >
            Retour
          </Button>

          <Button
            color="secondary"
            onClick={() => this.onExport()}
            disabled={!(this.state.updated.length || this.state.created.length)}
          >
            Exporter
          </Button>
          <Button
            color="primary"
            onClick={() => this.onSave()}
            disabled={!(this.state.updated.length || this.state.created.length)}
          >
            Importer
          </Button>
        </div>
      </div>
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='import-container'>
          <Loader />
          <div>{this.state.loadingMessage}</div>
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

    if (this.state.errors) {
      return (
        <div className='import-container'>
          <h2>Impossible d'importer le fichier car des erreurs ont été detectées :</h2>
          <div>{this.state.errors.split('\n').map((e, i) => <div key={i}>{e}</div>)}</div>
        </div>
      );
    }


    return (
      <Container>
        <Row className='import' type="flex" gutter={16} justify="center">
          <DropZone
            onFinish={this.onFilesDropped.bind(this)}
            storeId={this.props.storeId}
            visible={!this.state.displaySummary}
          />
        </Row>
        {this.renderSummary()}
      </Container >
    );
  }
}
