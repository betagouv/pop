import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
// import { Button, Row, Col, Progress, notification } from 'antd';
// import { Table } from 'antd';
import DropZone from './dropZone'
import Loader from '../../components/loader';

import './index.css';


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

  onImportFinish(importedProducts) {

    let dataclean = true;
    importedProducts.map((product, index) => {
      console.log('PRODUCT', product);
      // if (!product.sku) {
      //   //   if (importedProducts.indexOf(product) != index || !product.sku) {
      //   notification.error({ message: `SKU already exist or no sku on line ${index}` })
      //   dataclean = false;
    })
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



  // diff(importedProducts, existingProducts) {
  //   const unChanged = [];
  //   const updated = [];
  //   const created = [];

  //   let removed = {};
  //   for (var i = 0; i < existingProducts.length; i++) {
  //     removed[existingProducts[i].sku] = existingProducts[i];
  //   }

  //   for (var i = 0; i < importedProducts.length; i++) {

  //     let importedProduct = importedProducts[i];

  //     //Price stuffs
  //     const { retail_price, trading_price, wholesale_price } = this.getPrices(importedProduct);
  //     importedProduct.retail_price = retail_price;
  //     importedProduct.trading_price = trading_price;
  //     importedProduct.wholesale_price = wholesale_price;


  //     importedProduct.stock = parseInt(importedProduct.stock);
  //     let found = false;
  //     for (var j = 0; j < existingProducts.length; j++) {
  //       const existingProduct = existingProducts[j];
  //       if (importedProduct.sku === existingProduct.sku) {
  //         if (importedProduct.retail_price !== existingProduct.retail_price || importedProduct.trading_price !== existingProduct.trading_price || importedProduct.stock !== existingProduct.stock) {
  //           existingProduct.new_retail_price = importedProduct.retail_price;
  //           existingProduct.new_trading_price = importedProduct.trading_price;
  //           existingProduct.new_stock = importedProduct.stock;
  //           updated.push(existingProduct)
  //         } else {
  //           unChanged.push(existingProduct)
  //         }
  //         found = true;
  //       }
  //     }

  //     if (!found) {
  //       created.push(importedProduct);
  //     } else {
  //       delete removed[importedProduct.sku];
  //     }
  //   }

  //   const removeArr = [];
  //   for (const key in removed) {
  //     removeArr.push(removed[key])
  //   }

  //   this.setState({
  //     displaySummary: true,
  //     calculating: false,
  //     unChanged,
  //     created,
  //     updated,
  //     removed: removeArr
  //   });
  // }

  // renderCreated() {
  //   const columns = [
  //     { title: 'Sku', dataIndex: 'sku', key: 'sku' },
  //     { title: 'Stock', dataIndex: 'stock', key: 'stock' },
  //     { title: 'Retail Price', dataIndex: 'retail_price', key: 'retail_price' },
  //     { title: 'Trading price', dataIndex: 'trading_price', key: 'trading_price' },
  //     { title: 'Volume', dataIndex: 'volume', key: 'volume' },
  //     { title: 'Year', dataIndex: 'year', key: 'year' }];

  //   return (
  //     <Row className='rowResult' type="flex" gutter={16} justify="center">
  //       <h3 style={{ marginBottom: 16 }}>Created ({this.state.created.length})</h3>
  //       <Table
  //         columns={columns}
  //         dataSource={this.state.created.map((e, i) => { return { ...e, ...{ key: i } } })}
  //       />
  //     </Row>)
  // }

  // renderUnChanged() {
  //   const columns = [
  //     { title: 'Id', dataIndex: 'id', key: 'id' },
  //     { title: 'Stock', dataIndex: 'stock', key: 'stock' },
  //     { title: 'Retail Price', dataIndex: 'retail_price', key: 'retail_price' },
  //     { title: 'Trading price', dataIndex: 'trading_price', key: 'trading_price' },
  //     { title: 'Sku', dataIndex: 'sku', key: 'sku' },
  //     { title: 'Volume', dataIndex: 'volume', key: 'volume' },
  //     { title: 'Year', dataIndex: 'year', key: 'year' }];

  //   return (
  //     <Row className='rowResult' type="flex" gutter={16} justify="center">
  //       <h3 style={{ marginBottom: 16 }}>Unchanged ({this.state.unChanged.length})</h3>
  //       <Table
  //         columns={columns}
  //         dataSource={this.state.unChanged.map((e, i) => { return { ...e, ...{ key: i } } })}
  //       />
  //     </Row>)
  // }

  // renderRemoved() {
  //   const columns = [
  //     { title: 'Id', dataIndex: 'id', key: 'id' },
  //     { title: 'Stock', dataIndex: 'stock', key: 'stock' },
  //     { title: 'Retail Price', dataIndex: 'retail_price', key: 'retail_price' },
  //     { title: 'Trading price', dataIndex: 'trading_price', key: 'trading_price' },
  //     { title: 'Sku', dataIndex: 'sku', key: 'sku' },
  //     { title: 'Volume', dataIndex: 'volume', key: 'volume' },
  //     { title: 'Year', dataIndex: 'year', key: 'year' }];

  //   return (
  //     <Row className='rowResult' type="flex" gutter={16} justify="center">
  //       <h3 style={{ marginBottom: 16 }}>Removed ({this.state.removed.length})</h3>
  //       <Table
  //         columns={columns}
  //         dataSource={this.state.removed.map((e, i) => { return { ...e, ...{ key: i } } })}
  //       />
  //     </Row>)
  // }

  // renderUpdated() {

  //   const columns = [
  //     { title: 'Id', dataIndex: 'id', key: 'id' },
  //     { title: 'Previous Stock', dataIndex: 'stock', key: 'stock' },
  //     { title: 'New Stock', dataIndex: 'new_stock', key: 'new_stock' },
  //     { title: 'Previous Retail Price', dataIndex: 'retail_price', key: 'retail_price' },
  //     { title: 'New retail Price', dataIndex: 'new_retail_price', key: 'new_retail_price' },
  //     { title: 'Previous Trading price', dataIndex: 'trading_price', key: 'trading_price' },
  //     { title: 'New trading price', dataIndex: 'new_trading_price', key: 'new_trading_price' },
  //     { title: 'Sku', dataIndex: 'sku', key: 'sku' },
  //     { title: 'Volume', dataIndex: 'volume', key: 'volume' },
  //     { title: 'Year', dataIndex: 'year', key: 'year' }];

  //   return (
  //     <Row className='rowResult' type="flex" gutter={16} justify="center">
  //       <h3 style={{ marginBottom: 16 }}>Updated ({this.state.updated.length})</h3>
  //       <Table
  //         columns={columns}
  //         dataSource={this.state.updated.map((e, i) => { return { ...e, ...{ key: i } } })}
  //       />
  //     </Row>)

  // }


  // renderUploading() {

  //   if (!this.state.uploading) {
  //     return <div />
  //   }

  //   return (<Row className='rowResult' type="flex" gutter={16} justify="center">
  //     <Col md={4} sm={4} xs={24} >
  //       <Progress percent={this.state.uploadingProgress} />
  //     </Col>
  //     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>{this.state.uploadingMessage}</div>
  //   </Row>)
  // }

  // renderSummary() {
  //   if (!this.state.displaySummary) {
  //     return <div />
  //   }
  //   return (
  //     <div>
  //       {this.renderUpdated()}
  //       {this.renderCreated()}
  //       {this.renderRemoved()}
  //       {this.renderUnChanged()}
  //       <Row type="flex" gutter={16} justify="center">
  //         <Button
  //           type="primary"
  //           onClick={() => this.onSave()}
  //           disabled={!(this.state.updated.length || this.state.removed.length || this.state.created.length)}
  //         >
  //           Proceed
  //           </Button>
  //       </Row>
  //     </div>
  //   )
  // }

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
            visible={this.state.dropVisible}
          />
          Hey
        </Row>
        {/* {this.renderUploading()}
        {this.renderSummary()} */}
      </div >
    );
  }
}

