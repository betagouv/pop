import React from 'react';
import { Field } from 'redux-form'
import Dropzone from 'react-dropzone';
import { Row, Col } from 'reactstrap';
import Viewer from 'react-viewer';
import { Link } from 'react-router-dom';
import 'react-viewer/dist/index.css';

import { bucket_url } from '../../../config';

import './fieldImages.css';

class FieldImages extends React.Component {

    state = {
        images: [],
        selected: -1,
    }
    componentWillMount() {
        this.loadImages();

    }
    onDrop(files) {
        this.props.input.onChange(this.props.input.value.concat(...files))
    }


    loadImages() {
        const images = this.props.input.value.map((e, i) => {

            let source = "";
            let key = "";
            let link = "";

            if (e instanceof Object) {            //If its a MEMOIRE STYLE 
                source = e.url.indexOf("www") === -1 ? `${bucket_url}${e.url}` : e.url;
                key = e.ref
                link = `/notice/memoire/${e.ref}`
            } else if (e instanceof File) {
                source = e.preview
                key = e.name
            } else {
                source = e.indexOf("www") === -1 ? `${bucket_url}${e}` : e;
                key = e;
            }

            // if (source.indexOf("memoire") !== -1) {

            // }

            return { source, key, link }
        });
        this.setState({ images })
    }

    renderImages() {
        if (!this.props.input.value) {
            return <div />
        }

        const arr = this.state.images.map(({ source, key, link }, i) => {
            return (
                <Col className="image" key={key}>
                    {source ? <img onClick={() => this.setState({ selected: i })} src={source} alt={key} className="img-fluid w-100" /> : <div className="no-image">No Image</div>}
                    {link ? <Link to={`/notice/memoire/${key}`}>{key}</Link> : <div />}
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
        const images = this.state.images.map(e => ({ src: e.source, alt: e.key }));
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
