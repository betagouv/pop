import React, { Component } from 'react';
import { Row, Col, Table, Button, Container, Collapse, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import DropZone from './dropZone'
import Loader from '../../components/loader';
import api from '../../services/api'

import { diff } from './utils.js'

import './index.css';

const COLUMNSTODISPLAY = ['REF', 'TICO', 'DENO'];

export default class ImportComponent extends Component {
  state = {
    displaySummary: false,
    unChanged: [],
    created: [],
    updated: [],
    message: '',
    done: false,
    loading: false
  }

  async onImportFinish(importedNotices) {
    const existingNotices = []
    for (var i = 0; i < importedNotices.length; i++) {
      this.setState({ loading: true, message: `Récuperation des notices existantes ... ${i}/${importedNotices.length}` });
      const notice = await (api.getNotice(importedNotices[i].REF));
      existingNotices.push(notice);
    }
    this.setState({ message: 'Calcule des differences....' })
    const { unChanged, created, updated } = diff(importedNotices, existingNotices);
    this.setState({ displaySummary: true, calculating: false, unChanged, created, updated, loading: false, message: '' });
  }

  async onSave() {
    for (var i = 0; i < this.state.updated.length; i++) {
      this.setState({ loading: true, message: `Mise à jour des notices ... ${i}/${this.state.updated.length}` });
      const id = this.state.updated[i].existingNotice._id;
      const collection = 'merimee';
      const data = {};
      for (var j = 0; j < this.state.updated[i].differences.length; j++) {
        const key = this.state.updated[i].differences[j];
        data[key] = this.state.updated[i].importedNotice[key];
      }
      await api.update(id, collection, data);
    }
    this.setState({ loading: false, done: true, message: `Import effectué avec succès` });
  }

  renderSummary() {
    if (!this.state.displaySummary) {
      return <div />
    }

    return (
      <div className='import'>
        <UpdatedTableComponent dataSource={this.state.updated} title='Ces notices seront mises à jour' />
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
        <div className='import-messages'>
          <Loader />
          <div>{this.state.message}</div>
        </div>
      );
    }

    if (this.state.done) {
      return (
        <div className='import-messages'>
          <div>{this.state.message}</div>
          <Link to='/'>Revenir a la page d'accueil</Link>
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


class UpdatedTableComponent extends React.Component {

  state = {
    expandedRef: null,
    activePage: 1,
  }

  render() {
    const { dataSource, title } = this.props;
    if (!dataSource.length) { return <div /> }

    const columnsJSX = [];
    columnsJSX.push(<Col className='col' md='2' key='1'><b>REF</b></Col>)
    columnsJSX.push(<Col className='col' md='7' key='2'><b>TICO</b></Col>)
    columnsJSX.push(<Col className='col' md='2' key='3'><b>DENO</b></Col>)

    const data = [];

    for (var i = (this.state.activePage - 1) * 10; i < (this.state.activePage * 10) && i < dataSource.length; i++) {
      //Affichage notices modifiées.
      const r = [];
      r.push(<Col className='col' md='2' key='1'>{dataSource[i].existingNotice.REF}</Col>)
      r.push(<Col className='col' md='7' key='2'>{dataSource[i].existingNotice.TICO}</Col>)
      r.push(<Col className='col' md='2' key='3'>{dataSource[i].existingNotice.DENO}</Col>)

      r.push(<Col md='1' className='visu col' key='visu' ><Badge color="danger" id={dataSource[i].existingNotice.REF} >{dataSource[i].differences.length}</Badge></Col>)

      data.push(<Row key={i} onClick={() => { this.setState({ expandedRef: dataSource[i].existingNotice.REF }) }} >{r}</Row>)

      //Affichage des modifications des champs des notices modifiées
      const modifs = dataSource[i].differences.map(key => <div key={key} >Le champs <b>{key}</b> à évolué de "<b>{dataSource[i].existingNotice[key]}</b>" à "<b>{dataSource[i].importedNotice[key]}</b>"</div>)
      data.push(
        <Collapse key={dataSource[i].existingNotice.REF} isOpen={this.state.expandedRef === dataSource[i].existingNotice.REF}>
          <div className='col content' >
            {modifs}
          </div>
        </Collapse>
      )
    }
    // });

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


