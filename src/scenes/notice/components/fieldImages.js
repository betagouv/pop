import React from 'react';
import { Field } from 'redux-form'
import Dropzone from 'react-dropzone';
import { Row, Col, Modal } from 'reactstrap';

import { bucket_url } from '../../../config';

import './fieldImages.css';

class FieldImages extends React.Component {

    state = {
        images: [],
        selected: null,
    }

    onDrop(files) {
        console.log('DROPED', files);
        this.props.input.onChange(this.props.input.value.concat(...files))
    }

    toggleModal() {
        this.setState({ selected: null })
    }

    renderImages() {
        const arr = this.props.input.value.map(e => {
            let source = `${bucket_url}/${e}`;
            let key = e;
            if (e instanceof File) {
                source = e.preview;
                key = e.name;
            }
            return (
                <Col md="6" key={key}>
                    <img onClick={() => this.setState({ selected: source })} src={source} alt={e} className="img-fluid w-100" />
                </Col>
            )
        });

        if (!this.props.disabled) {
            arr.push(
                <Col className='item' md="6" key='dropzone'>
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                        <p>Ajouter une nouvelle image</p>
                    </Dropzone>
                </Col>
            );
        }

        return arr;
    }

    render() {
        return (
            <div className='fieldImages'>
                <Modal centered={true} isOpen={this.state.selected !== null} toggle={this.toggleModal.bind(this)} >
                    <div>
                        <img src={`${this.state.selected}`} alt={this.state.selected} className="img-fluid w-100" />
                    </div>
                </Modal>
                <Row >
                    {this.renderImages()}
                </Row>
            </div>
        );
    }
}

export default ({ title, ...rest }) => {
    return (
        <div style={styles.container}>
            {title && <div style={styles.title} >{title}</div>}
            <Field component={FieldImages} {...rest} />
        </div>
    )
};


const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
    },
    title: {
        paddingRight: '15px',
        minWidth: '100px',
        color: '#5a5a5a',
        fontStyle: 'italic'
    }
}