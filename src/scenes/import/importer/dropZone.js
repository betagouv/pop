import React, { Component } from 'react';
import Parse from 'csv-parse';
import { Row, Col } from 'reactstrap';
import Dropzone from 'react-dropzone';

export default class ImportDropComponent extends Component {

  state = {
    progress: 0,
    error: ''
  }

  onDrop(files) {
    this.props.onFinish(filesS);
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
        <Row style={{ ...rowstyle, justifyContent: 'center', alignItems: 'center' }} type="flex" gutter={16} justify="center">
          {this.state.error ? <div>{this.state.error}</div> : <div />}
        </Row>
      </div>
    );
  }
}