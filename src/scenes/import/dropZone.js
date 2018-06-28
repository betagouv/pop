import React, { Component } from 'react';
import Parse from 'csv-parse';
import { Row, Col } from 'reactstrap';
import Dropzone from 'react-dropzone';

export default class ImportDropComponent extends Component {

  state = {
    progress: 0,
    error: '',
    encoding: 'UTF-8'
  }

  onDrop(files) {
    files.forEach(file => {
      const extension = file.name.split('.').pop();
      const reader = new FileReader();
      // if (extension === 'csv') {
      //   reader.onload = () => {
      //     this.parseCSVFile(reader.result)
      //   };
      // } else if (extension === 'txt') {
      //   reader.onload = () => {
      //     this.parseJocondeTxt(reader.result)
      //   };
      // } else if (extension === 'xml') {
      //   reader.onload = () => {
      //     this.parseGertrude(reader.result)
      //   };
      //   // } else if (extension === 'xlsx') {
      //   //   reader.onload = () => { this.parseXLSXFile(reader.result) };
      // } else {
      //   this.setState({ error: `Extension ${extension} is not supported` })
      //   return;
      // }
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.readAsText(file, this.state.encoding);
    });
  }
  parseGertrude(fileAsBinaryString) {
    var xmlDoc = new DOMParser().parseFromString(fileAsBinaryString, 'text/xml');
    console.log(xmlDoc);

  }

  parseJocondeTxt(fileAsBinaryString) {
    let str = fileAsBinaryString.replace(/\-\r\n/g, '');
    var lines = str.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks
    const arr = [];
    let obj = {};
    for (var i = 0; i < lines.length; i++) {
      if (lines[i] === '//') {
        arr.push(obj);
        obj = {};
      } else {
        obj[lines[i]] = lines[++i]
      }
    }

    this.props.onFinish(arr);
  }

  parseXLSXFile(fileAsBinaryString) {
    // const XLSX = require('xlsx');
    // var workbook = XLSX.read(fileAsBinaryString, { type: 'binary' });
    // workbook.SheetNames.forEach((sheetName) => { // Here is your object
    //   var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    //   var objs = XL_row_object.map((e, i) => {

    //     for (var key in e) {
    //       if (Number.isInteger(e[key])) { e[key] = parseFloat(e[key]) }
    //     }
    //     return { ...e, ...{ key: i } }
    //   })

    //   this.props.onFinish(objs);
    //   return;
    // })
  }

  parseCSVFile(fileAsBinaryString) {
    const parser = Parse({ delimiter: ',', from: 1 });
    const output = [];

    let record = null;
    let header = null;

    parser.on('readable', () => {
      let count = 0;
      while ((record = parser.read())) {
        if (!header) {
          header = [].concat(record);
          continue;
        }
        const obj = {};
        record.map((e, i) => {
          obj[header[i]] = e;
          //update data
          if (header[i] === 'REF') { obj[header[i]] = ('' + obj[header[i]]).toUpperCase(); }
        })
        output.push(obj);
      }
    });

    // Catch any error
    parser.on('error', (err) => {
      this.setState({ error: err.message })
      // notification.error({ message: 'Error parsing file', description: err.message });
    });

    // When we are done, test that the parsed output matched what expected
    parser.on('finish', () => {
      this.props.onFinish(output);
    });

    parser.write(fileAsBinaryString);
    parser.end();
  }


  render() {

    console.log(this.state.encoding)
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
          <p>Déposez des fichiers d'import ici</p>
        </Dropzone>
        <select value={this.state.encoding} onChange={(e) => this.setState({ encoding: e.target.value })}>
          <option value="UTF-8">UTF-8</option>
          <option value="ISO-8859-1">ISO-8859-1</option>
        </select>
        <Row style={{ ...rowstyle, justifyContent: 'center', alignItems: 'center' }} type="flex" gutter={16} justify="center">
          {this.state.error ? <div>{this.state.error}</div> : <div />}
        </Row>
      </div>
    );
  }
}