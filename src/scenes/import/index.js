import React, { Component } from 'react';
import { Row, Col, Table, Button, Container, Modal } from 'reactstrap';
import DropZone from './dropZone'
import Loader from '../../components/loader';
import api from '../../services/api'

import Compare from './compare.js'

import './index.css';

const COLUMNSTODISPLAY = ['REF', 'TICO', 'DENO'];

export default class ImportComponent extends Component {
  state = {
    displaySummary: false,
    unChanged: [],
    created: [],
    updated: [],
    preview: false,
    message: ''
  }

  onImportFinish(importedNotices) {
    let dataclean = true;
    const refs = importedNotices.map(e => e.REF);
    this.setState({ message: 'Recuperation des notices existantes...' })
    api.getNoticesByRef(refs).then((currentNotices) => {
      var currentNoticesUpdated = currentNotices.map((e) => {
        delete e.__v;
        delete e._id;
        return e;
      })
      this.setState({ message: 'Calcule des differences....' })
      this.diff(importedNotices, currentNoticesUpdated)
    });
  }

  diff(importedNotices, existingNotices) {
    const unChanged = [];
    const updated = [];
    const created = [];

    for (var i = 0; i < importedNotices.length; i++) {
      let importedNotice = importedNotices[i];
      let found = false;
      for (var j = 0; j < existingNotices.length; j++) {
        const existingNotice = existingNotices[j];
        if (importedNotice.REF === existingNotice.REF) {
          if (!Compare(importedNotice, existingNotice)) {
            updated.push(existingNotice)
          } else {
            unChanged.push(existingNotice)
          }
          found = true;
        }
      }
      if (!found) {
        created.push(importedNotice);
      }
    }
    this.setState({ displaySummary: true, calculating: false, unChanged, created, updated, message: '' });
  }


  renderSummary() {
    if (!this.state.displaySummary) {
      return <div />
    }

    return (
      <div className='import'>
        <TableComponent dataSource={this.state.updated} title='Seront mises à jour' />
        <TableComponent dataSource={this.state.created} title='Seront créées ' />
        <TableComponent dataSource={this.state.unChanged} title='Resteront inchangées' />
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

  renderModal() {
    return (
      <Modal >
        <div>hey</div>
      </Modal>
    )
  }

  render() {
    if (this.state.message) {
      return (
        <div className='import-loader'>
          <Loader />
          <div>{this.state.message}</div>
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
        {this.renderModal()}
        {this.renderSummary()}
      </Container >
    );
  }
}


const TableComponent = ({ dataSource, title }) => {
  if (!dataSource.length) {
    return <div />
  }
  const columnsJSX = COLUMNSTODISPLAY.map((e, i) => <th key={i}>{e}</th>)
  const data = dataSource.map((c, i) => {
    const r = COLUMNSTODISPLAY.map((d, j) => { return <td key={j}>{c[d]}</td> })
    r.push(<td key='visu' ><img
      onClick={() => {
        console.log('HEY')
      }}
      src={require('../../assets/view.png')}
    />
    </td>)
    return (<tr key={i}>{r}</tr>)
  })
  return (
    <Row className='rowResult' type="flex" gutter={16} justify="center">
      <h3 style={{ marginBottom: 16 }}>{title} ({dataSource.length})</h3>
      <Table bordered>
        <thead><tr>{columnsJSX}</tr></thead>
        <tbody>{data}</tbody>
      </Table>
    </Row>
  )
}


