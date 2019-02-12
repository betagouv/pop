import React from "react";
import { Field } from "redux-form";
import Dropzone from "react-dropzone";
import { Row, Col, Button } from "reactstrap";
import Viewer from "react-viewer";
import { toastr } from "react-redux-toastr";
import "react-viewer/dist/index.css";

import "./fieldImages.css";

class FieldImages extends React.Component {
  state = {
    selected: -1,
    imageFiles: []
  };

  onDrop(files) {
    const imageFiles = [...this.state.imageFiles.concat(...files)];
    this.props.updateFiles(imageFiles);
    this.setState({ imageFiles });

    const urls = files.map(e => this.props.createUrlFromName(e.name));

    if (!Array.isArray(this.props.input.value)) {
      this.props.input.onChange(urls[0]);
    } else {
      this.props.input.onChange([...this.props.input.value.concat(...urls)]);
    }
  }

  getFile(e) {
    // If image file is the image
    const index = this.state.imageFiles.findIndex(f => e.indexOf(`/${f.name}`) !== -1);

    //if not file just uploaded
    if (index == -1) {
      return {
        source: this.props.getAbsoluteUrl ? this.props.getAbsoluteUrl(e) : e,
        name: e
      };
    } else {
      return {
        source: this.state.imageFiles[index].preview,
        name: this.props.createUrlFromName(this.state.imageFiles[index].name)
      };
    }
  }

  getImages() {
    //if not an array
    if (!Array.isArray(this.props.input.value)) {
      if (!this.props.input.value) {
        return [];
      }
      return [this.getFile(this.props.input.value)];
    }
    //convert FILE to local url
    return this.props.input.value.map(e => {
      return this.getFile(e);
    });
  }

  renderImages() {
    const images = this.getImages();
    const arr = images.map(({ source, name }, i) => {
      const button = !this.props.disabled ? (
        <Button
          color="danger"
          onClick={() => {
            const confirmText = `Vous êtes sur le point de supprimer une image. La suppression sera effective après avoir cliqué sur "sauvegarder" en bas de la page. Souhaitez-vous continuer ?`;
            const toastrConfirmOptions = {
              onOk: () => {
                //If only One Image
                if (!Array.isArray(this.props.input.value)) {
                  this.props.input.onChange("");
                  this.props.updateFiles([]);
                  this.setState({ imageFiles: [] });
                  return;
                }

                // Update Image path
                const arr = this.props.input.value.filter(e => e !== name);
                this.props.input.onChange(arr);

                // Update Image file if needed
                const imageFiles = this.state.imageFiles.filter(e => e.name != name);
                this.props.updateFiles(imageFiles);
                this.setState({ imageFiles });
              }
            };
            toastr.confirm(confirmText, toastrConfirmOptions);
          }}
        >
          Supprimer
        </Button>
      ) : (
        <div />
      );

      return (
        <Col className="image" key={name}>
          {source ? (
            <img
              onClick={() => this.setState({ selected: i })}
              src={source}
              alt={name}
              className="img-fluid"
            />
          ) : (
            <div className="no-image">Image absente</div>
          )}
          {button}
          {this.props.footer ? this.props.footer(name) : <div />}
        </Col>
      );
    });

    const hideButton =
      this.props.disabled || (!Array.isArray(this.props.input.value) && this.props.input.value);

    if (!hideButton) {
      arr.push(
        <Col className="item" md={arr.length ? 6 : 12} key="dropzone">
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

    const images = this.getImages().map(({ source, name }) => ({
      src: source,
      alt: name
    }));

    return (
      <Viewer
        visible
        onClose={() => {
          try {
            document.body.style.overflow = null;
          } catch (e) {
            console.log(e);
          }
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
