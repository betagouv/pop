import React, { Component } from 'react';
import Parse from 'csv-parse';
import { Row, Col } from 'reactstrap';
import Dropzone from 'react-dropzone';

export default class ImportDropComponent extends Component {

  state = {
    progress: 0,
    error: '',
  }

  onDrop(files) {
    files.forEach(file => {
      const extension = file.name.split('.').pop();
      const reader = new FileReader();
      if (extension === 'csv') {
        reader.onload = () => { 
          console.log('res',reader.result)
          this.parseCSVFile(reader.result) 
        
        };
        // } else if (extension === 'xlsx') {
        //   reader.onload = () => { this.parseXLSXFile(reader.result) };
      } else {
        this.setState({ error: `Extension ${extension} is not supported` })
        return;
      }
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.readAsText(file);
    });
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
        })

        console.log('DSDDS', obj.ADRS)
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
      <div>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
        <Row style={{ ...rowstyle, justifyContent: 'center', alignItems: 'center' }} type="flex" gutter={16} justify="center">
          <Col md={4} sm={4} xs={24} >
            {this.state.error ? <div>{this.state.error}</div> : <div />}
          </Col>
        </Row>
      </div>
    );
  }
}