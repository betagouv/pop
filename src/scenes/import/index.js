import React, { Component } from 'react';
import { Row, Col, Table, Button } from 'reactstrap';
import DropZone from './dropZone'
import Loader from '../../components/loader';
import api from '../../services/api'

import './index.css';

const COLUMNSTODISPLAY = ['REF', 'TICO', 'DENO'];

export default class ImportComponent extends Component {
  state = {
    dropVisible: true,
    calculating: false,
    displaySummary: false,
    uploading: false,
    uploadingProgress: 0,
    uploadingMessage: '',
    unChanged: [],
    created: [],
    updated: [],
    removed: [],
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
          console.log('Compare ', importedNotice, existingNotice)
          if (!compareObjects(importedNotice, existingNotice)) {
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


    console.log('unChanged', unChanged,
      'created', created,
      'updated', updated)

    this.setState({
      displaySummary: true,
      calculating: false,
      unChanged,
      created,
      updated
    });
  }


  // if (!dataclean) { return; }

  // this.setState({ dropVisible: false, calculating: true })
  // }

  // async onSave() {

  //   this.setState({ uploading: true, displaySummary: false })

  //   const total = this.state.created.length + this.state.updated.length + this.state.removed.length;
  //   let current = 0;
  //   const storeObj = this.props.storeObj;

  //   // Create
  //   for (var i = 0; i < this.state.created.length; i++) {
  //     const e = this.state.created[i];

  //     //picture: e.image || e.picture || '',

  //     const obj = {
  //       country: storeObj.country,
  //       store_id: this.props.storeId,
  //       store_name: storeObj.name,
  //       currency: getCurrency(storeObj.country),
  //       created_at: Date.now(),
  //       updated_at: Date.now(),
  //       retail_price: e.retail_price,
  //       trading_price: e.trading_price,
  //       wholesale_price: e.wholesale_price,
  //       stock: e.stock || 0,
  //       sku: e.sku,
  //       reviewed: false,
  //       available: false,
  //       enable: storeObj.enable || false,
  //       volume: e.volume || '',
  //       year: e.year || '',
  //       metaData: e
  //     }
  //     //await firebase.createProduct(obj);
  //     this.setState({ uploadingProgress: parseInt((100 * current++) / total) });
  //   }
  //   // Update
  //   for (var i = 0; i < this.state.updated.length; i++) {
  //     const e = this.state.updated[i];
  //     const obj = { reviewed: true };
  //     this.setState({ uploadingProgress: parseInt((100 * current++) / total) });
  //   }


  //   // Remove
  //   for (var i = 0; i < this.state.removed.length; i++) {
  //     const e = this.state.removed[i];
  //     //await firebase.deleteProduct(e.id);
  //     this.setState({ uploadingProgress: parseInt((100 * current++) / total) });
  //   }

  //   let uploadingMessage = [<span key={1}>Note you have to wait few seconds to severals minutes to see your product updated in the real time database</span>];
  //   if (this.state.created.length) {
  //     uploadingMessage.push(<span key={2}>There are some products to review , please go review them through the tab above</span>);
  //   }

  //   this.setState({
  //     uploadingProgress: 100,
  //     uploadingMessage
  //   });

  // }





  renderCreated() {
    return (
      <Row className='rowResult' type="flex" gutter={16} justify="center">
        <h3 style={{ marginBottom: 16 }}>Créés ({this.state.created.length})</h3>
        <TableComponent
          columns={COLUMNSTODISPLAY}
          dataSource={this.state.created.map((e, i) => { return { ...e, ...{ key: i } } })}
        />
      </Row>)
  }

  renderUnChanged() {
    return (
      <Row className='rowResult' type="flex" gutter={16} justify="center">
        <h3 style={{ marginBottom: 16 }}>Inchangés ({this.state.unChanged.length})</h3>
        <TableComponent
          columns={COLUMNSTODISPLAY}
          dataSource={this.state.unChanged.map((e, i) => { return { ...e, ...{ key: i } } })}
        />
      </Row>)
  }


  renderUpdated() {
    return (
      <Row className='rowResult' type="flex" gutter={16} justify="center">
        <h3 style={{ marginBottom: 16 }}>Mis à jour ({this.state.updated.length})</h3>
        <TableComponent
          columns={COLUMNSTODISPLAY}
          dataSource={this.state.updated.map((e, i) => { return { ...e, ...{ key: i } } })}
        />
      </Row>)

  }


  renderUploading() {

    // if (!this.state.uploading) {
    return <div />
    // }

    // return (<Row className='rowResult' type="flex" gutter={16} justify="center">
    //   <Col md={4} sm={4} xs={24} >
    //     <Progress percent={this.state.uploadingProgress} />
    //   </Col>
    //   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>{this.state.uploadingMessage}</div>
    // </Row>)
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
        <Row type="flex" gutter={16} justify="center">
          <Button
            type="primary"
            onClick={() => this.onSave()}
            disabled={!(this.state.updated.length || this.state.removed.length || this.state.created.length)}
          >
            Proceed
            </Button>
        </Row>
      </div>
    )
  }

  render() {

    if (this.state.calculating) {
      return <LoadingWidget />
    }

    return (
      <div>
        <Row className='rowResult' type="flex" gutter={16} justify="center">
          <DropZone
            onFinish={this.onImportFinish.bind(this)}
            storeId={this.props.storeId}
            visible={!this.state.displaySummary}
          />
        </Row>
        {this.renderUploading()}
        {this.renderSummary()}
      </div >
    );
  }
}


const TableComponent = ({ dataSource, columns }) => {
  const columnsJSX = columns.map((e, i) => <th key={i}>{e}</th>)

  const data = dataSource.map((c, i) => {
    const r = columns.map((d, j) => {
      return <td key={j}>{c[d]}</td>
    })

    r.push(<td key='visu' ><img src={require('../../assets/view.png')} /></td>)
    return (<tr key={i}>{r}</tr>)
  })


  return (
    <Table bordered>
      <thead><tr>{columnsJSX}</tr></thead>
      <tbody>{data}</tbody>
    </Table>
  )
}


function compareObjects(x, y) {
  if (x === y) return true;
  // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) {
    // console.log('false1', y, p)
    return false;
  }
  // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) {
    // console.log('false2', y, p)
    return false;
  }
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (var p in x) {

    if (!x.hasOwnProperty(p)) continue;
    // other properties were tested using x.constructor === y.constructor

    if (!y.hasOwnProperty(p)) {
      // console.log('false3', y, p)
      return false;
    }
    // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue;
    // if they have the same strict value or identity then they are equal

    if (!x[p] && (!y[p] || (Array.isArray(y[p]) && !y[p].length))) continue;


    console.log('!x[p]', !x[p])
    console.log('!y[p]', !y[p])

    console.log('COMPARE ', x[p], 'with', y[p])
    return false;

    //if (typeof (x[p]) !== "object") return false;
    // Numbers, Strings, Functions, Booleans must be strictly equal

    // if (!compareObjects(x[p], y[p])) return false;
    // Objects and Arrays must be tested recursively
  }

  return true;
}