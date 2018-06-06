import React, { Component } from 'react';
import { Row, Col, Button, Container, Collapse, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import DropZone from './dropZone'
import Loader from '../../components/loader';
import api from '../../services/api'

import { diff } from './utils.js'
import TableComponent from './table';

import MappingMerimee from './mapping/merimee.json'

import './index.css';

const COLUMNSTODISPLAY = ['REF', 'TICO', 'DENO'];

export default class ImportComponent extends Component {
  state = {
    unChanged: [],
    created: [],
    updated: [],
    errors: [],
    displaySummary: false,
    done: false,
    loading: false,
    loadingMessage: '',
  }

  async onImportFinish(importedNotices) {

    //check if there are not more fields
    const errors = [];
    if (importedNotices.length) {
      for (let key in importedNotices[0]) {
        if (!MappingMerimee[key]) {
          errors.push(`La colonne ${key} est inconnue`)
        }
      }
    }
    this.setState({ errors })
    if (errors.length) {
      return;
    }

    const existingNotices = []
    for (var i = 0; i < importedNotices.length; i++) {
      this.setState({ loading: true, loadingMessage: `Récuperation des notices existantes ... ${i}/${importedNotices.length}` });
      const notice = await (api.getNotice('merimee', importedNotices[i].REF));
      if (notice) {
        existingNotices.push(notice);
      }
    }
    this.setState({ loadingMessage: 'Calcul des differences....' })
    const { unChanged, created, updated } = diff(importedNotices, existingNotices);
    this.setState({ displaySummary: true, calculating: false, unChanged, created, updated, loading: false, loadingMessage: '' });
  }

  async onSave() {

    //Update notice
    for (var i = 0; i < this.state.updated.length; i++) {
      this.setState({ loading: true, loadingMessage: `Mise à jour des notices ... ${i}/${this.state.updated.length}` });
      const ref = this.state.updated[i].notice.REF;
      const collection = 'merimee';
      await api.updateNotice(ref, collection, this.state.updated[i].notice);
    }

    //Create notice
    for (var i = 0; i < this.state.created.length; i++) {
      this.setState({ loadingMessage: `Creation des notices ... ${i}/${this.state.created.length}` });
      const collection = 'merimee';
      console.log('Create', this.state.created[i].notice)
      await api.createNotice(collection, this.state.updated[i].notice);
    }

    this.setState({ loading: false, done: true, loadingMessage: `Import effectué avec succès` });
  }

  renderSummary() {
    if (!this.state.displaySummary) {
      return <div />
    }
    return (
      <div className='import'>
        <TableComponent dataSource={this.state.updated} title='Ces notices seront mises à jour' />
        <TableComponent dataSource={this.state.created} title='Ces notices seront créées ' />
        <TableComponent dataSource={this.state.unChanged} title='Ces notices resteront inchangées' />
        <div className='buttons'>
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

    if (this.state.errors.length) {
      const errors = this.state.errors.map((e, i) => <div key={i}>{e}</div>)
      return (
        <div className='import-container'>
          <h2>Impossible d'importer le fichier car des erreurs ont été detectées :</h2>
          <div>{errors}</div>
        </div>
      );
    }


    return (
      <Container>
        <Row className='import' type="flex" gutter={16} justify="center">
          <DropZone
            onFinish={this.onImportFinish.bind(this)}
            storeId={this.props.storeId}
            visible={!this.state.displaySummary}
          />
        </Row>
        {this.renderSummary()}
      </Container >
    );
  }
}



/*
class TableComponent extends React.Component {

  state = {
    expandedRef: null,
    activePage: 1,
  }

  render() {
    const { dataSource, title } = this.props;
    if (!dataSource.length) { return <div /> }

    const columnsJSX = [];
    columnsJSX.push(<Col className='col' md='2' key='1'><b>REF</b></Col>)
    columnsJSX.push(<Col className='col' md='8' key='2'><b>TICO</b></Col>)
    columnsJSX.push(<Col className='col' md='2' key='3'><b>DENO</b></Col>)

    const data = [];

    for (var i = (this.state.activePage - 1) * 10; i < (this.state.activePage * 10) && i < dataSource.length; i++) {

      const r = [];
      r.push(<Col className='col' md='2' key='1'>{dataSource[i].REF}</Col>)
      r.push(<Col className='col' md='8' key='2'>{dataSource[i].TICO}</Col>)
      r.push(<Col className='col' md='2' key='3'>{dataSource[i].DENO}</Col>)

      data.push(<Row key={dataSource[i].REF}>{r}</Row>)
    }

    return (
      <div className='section'>
        <h3 style={{ marginBottom: 16 }}>{title} ({dataSource.length})</h3>
        <div className='table'>
          <Row>{columnsJSX}</Row>
          {data}
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={dataSource.length}
          pageRangeDisplayed={5}
          onChange={(p) => { this.setState({ activePage: p }) }}
        />
      </div >
    )
  }
}


*/