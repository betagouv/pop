import React from "react";
import { Field } from "redux-form";
import Dropzone from "react-dropzone";
import { Row, Col } from "reactstrap";
import Viewer from "react-viewer";
import { Link } from "react-router-dom";
import "react-viewer/dist/index.css";

import { bucket_url } from "../../../config";

import "./fieldImages.css";

class FieldImages extends React.Component {
  state = {
    images: [],
    selected: -1
  };
  componentWillMount() {
    this.loadImages(this.props.input.value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input.value.length !== this.props.input.value.length) {
      this.loadImages(nextProps.input.value);
    }
  }

  onDrop(files) {
    this.props.input.onChange([...this.props.input.value.concat(...files)]);
  }

  loadImages(values) {
    const images = values.map(e => {
      let source = "";
      let key = "";
      let link = "";

      if (e instanceof File) {
        //If its a MEMOIRE STYLE
        source = e.preview;
        key = e.name;
      } else if (e instanceof Object) {
        if (e.url) {
          source =
            e.url.indexOf("www") === -1 && e.url.indexOf("http") === -1
              ? `${bucket_url}${e.url}`
              : e.url;
        }
        key = e.ref;
        link = `/notice/memoire/${e.ref}`;
      } else {
        source =
          e.indexOf("www") === -1 && e.indexOf("http") === -1
            ? `${bucket_url}${e}`
            : e;
        key = e;
      }
      return { source, key, link };
    });
    this.setState({ images });
  }

  renderImages() {
    if (!this.props.input.value) {
      return <div />;
    }

    const arr = this.state.images.map(({ source, key, link }, i) => {
      return (
        <Col className="image" key={key}>
          {source ? (
            <img
              onClick={() => this.setState({ selected: i })}
              src={source}
              alt={key}
              className="img-fluid"
            />
          ) : (
            <div className="no-image">Image absente</div>
          )}
          {link ? <Link to={`/notice/memoire/${key}`}>{key}</Link> : <div />}
        </Col>
      );
    });

    if (!this.props.disabled) {
      arr.push(
        <Col className="item" md="6" key="dropzone">
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
      return <div />;
    }
    const images = this.state.images.map(e => ({ src: e.source, alt: e.key }));
    return (
      <Viewer
        visible
        onClose={() => {
          this.setState({ selected: -1 });
        }}
        images={images}
        activeIndex={this.state.selected}
      />
    );
  }

  render() {
    return (
      <div className="fieldImages">
        {this.renderModal()}
        <Row>{this.renderImages()}</Row>
      </div>
    );
  }
}

export default ({ title, ...rest }) => {
  return (
    <div style={styles.container}>
      {title && <div style={styles.title}>{title}</div>}
      <Field component={FieldImages} {...rest} />
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start"
  },
  title: {
    paddingRight: "15px",
    minWidth: "100px",
    color: "#5a5a5a",
    fontStyle: "italic"
  }
};
