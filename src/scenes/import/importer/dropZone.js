import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Dropzone from 'react-dropzone';
import JSZip from 'jszip';

export default class ImportDropComponent extends Component {

  state = {
    progress: 0,
    error: ''
  }

  onDrop(files) {
    if (files.length === 1 && getExtension(files[0].name) === 'zip') {
      const new_zip = new JSZip();
      new_zip.loadAsync(files[0]).then((zip) => {
        const arr = [];
        zip.forEach((path, obj) => {
          arr.push(convertToFile(obj));
        })
        Promise.all(arr).then((unzipFiles) => {
          this.props.onFinish(unzipFiles);
        })
      })
    } else {
      this.props.onFinish(files);
    }
  }

  render() {
    if (!this.props.visible) {
      return <div />
    }
    const rowstyle = {
      paddingTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      paddingRight: '50px',
      paddingLeft: '50px'
    }
    return (
      <div className='dropzone'>
        <Dropzone className='container' onDrop={this.onDrop.bind(this)}>
          <img src={require('../../../assets/upload.png')} />
          <p>Déposez des fichiers d'import ici</p>
        </Dropzone>
        <Row style={{ ...rowstyle, justifyContent: 'center', alignItems: 'center' }} type="flex" gutter={16} justify="center">
          {this.state.error ? <div>{this.state.error}</div> : <div />}
        </Row>
      </div>
    );
  }
}

function getExtension(name) {
  return ('' + name.split('.').pop()).toLowerCase();
}

function convertToFile(obj) {
  return new Promise((resolve, reject) => {
    const ext = getExtension(obj.name);
    if (ext === 'txt' || ext === 'csv') {

      obj.async("string").then((str) => {
        resolve(new File(["\ufeff" + str], obj.name, { encoding: "UTF-8", type: "text/plain;charset=UTF-8" }));
      })
    } else {
      obj.async("blob").then((data) => {
        resolve(new File([data], obj.name, { type: 'image/jpeg' }));
      })
    }
  })
}


