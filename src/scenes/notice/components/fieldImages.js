import React from 'react';
import { Field } from 'redux-form'
import Dropzone from 'react-dropzone';
import { Row, Col, Modal } from 'reactstrap';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

import { bucket_url } from '../../../config';

import './fieldImages.css';

class FieldImages extends React.Component {

    state = {
        images: [],
        selected: -1,
    }

    onDrop(files) {
        this.props.input.onChange(this.props.input.value.concat(...files))
    }

    renderImages() {
        if (!this.props.input.value) {
            return <div />
        }

        const arr = this.props.input.value.map((e, i) => {
            let source = this.props.external ? `${e}` : `${bucket_url}${e}`;
            let key = e;
            if (e instanceof File) {
                source = e.preview;
                key = e.name;
            }
            return (
                <Col key={key}>
                    <img onClick={() => this.setState({ selected: i })} src={source} alt={e} className="img-fluid w-100" />
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
    renderModal() {
        if (this.state.selected === -1) {
            return <div />
        }
        const images = this.props.input.value.map((e, i) => {
            if (e instanceof File) {
                return { src: e.preview, alt: e.name }
            } else {
                return { src: this.props.external ? `${e}` : `${bucket_url}${e}`, alt: e }
            }
        });

        return (
            <Viewer
                visible
                onClose={() => { this.setState({ selected: -1 }); }}
                images={images}
                activeIndex={this.state.selected}
            />
        )
    }

    render() {


        return (
            <div className='fieldImages'>
                {this.renderModal()}
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