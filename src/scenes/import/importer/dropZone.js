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
    this.props.onFinish(files);   
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