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
    calculating: false,
    displaySummary: false,
    unChanged: [],
    created: [],
    updated: [],
    preview: false
  }

  onImportFinish(importedNotices) {
    let dataclean = true;
    const refs = importedNotices.map(e => e.REF);
    api.getNoticesByRef(refs).then((currentNotices) => {
      var currentNoticesUpdated = currentNotices.map((e) => {
        delete e.__v;
        delete e._id;
        return e;
      })

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
    console.log('unChanged', unChanged, 'created', created, 'updated', updated)
    this.setState({ displaySummary: true, calculating: false, unChanged, created, updated });
  }

  renderCreated() {
    if (!this.state.created.length) {
      return <div />
    }
    return (
      <Row className='rowResult' type="flex" gutter={16} justify="center">
        <h3 style={{ marginBottom: 16 }}>Seront créées ({this.state.created.length})</h3>
        <TableComponent
          columns={COLUMNSTODISPLAY}
          dataSource={this.state.created.map((e, i) => { return { ...e, ...{ key: i } } })}
        />
      </Row>)
  }

  renderUnChanged() {
    if (!this.state.unChanged.length) {
      return <div />
    }
    return (
      <Row className='rowResult' type="flex" gutter={16} justify="center">
        <h3 style={{ marginBottom: 16 }}>Resteront inchangées ({this.state.unChanged.length})</h3>
        <TableComponent
          columns={COLUMNSTODISPLAY}
          dataSource={this.state.unChanged.map((e, i) => { return { ...e, ...{ key: i } } })}
        />
      </Row>)
  }


  renderUpdated() {
    if (!this.state.updated.length) {
      return <div />
    }
    return (
      <Row className='rowResult' type="flex" gutter={16} justify="center">
        <h3 style={{ marginBottom: 16 }}>Seront mises à jour ({this.state.updated.length})</h3>
        <TableComponent
          columns={COLUMNSTODISPLAY}
          dataSource={this.state.updated.map((e, i) => { return { ...e, ...{ key: i } } })}
        />
      </Row>)
  }


  renderSummary() {
    if (!this.state.displaySummary) {
      return <div />
    }

    return (
      <div className='import'>
        {this.renderUpdated()}
        {this.renderCreated()}
        {this.renderUnChanged()}
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

  rendrModal() {
    return (
      <Modal >
        <div>hey</div>
      </Modal>
    )

  }

  render() {
    if (this.state.calculating) {
      return <LoadingWidget />
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
        {this.rendrModal()}
        {this.renderSummary()}
      </Container >
    );
  }
}


const TableComponent = ({ dataSource, columns }) => {
  const columnsJSX = columns.map((e, i) => <th key={i}>{e}</th>)
  const data = dataSource.map((c, i) => {
    const r = columns.map((d, j) => { return <td key={j}>{c[d]}</td> })
    r.push(<td key='visu' ><img onClick={() => {console.log('HEY') }} src={require('../../assets/view.png')} /></td>)
    return (<tr key={i}>{r}</tr>)
  })
  return (
    <Table bordered>
      <thead><tr>{columnsJSX}</tr></thead>
      <tbody>{data}</tbody>
    </Table>
  )
}


