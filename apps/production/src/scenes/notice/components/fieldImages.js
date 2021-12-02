import React from "react";
import { Field } from "redux-form";
import Dropzone from "react-dropzone";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
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
    this.props.filesToUpload(imageFiles);
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

    // If not file just uploaded.
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
    // If not an array
    if (!Array.isArray(this.props.input.value)) {
      if (!this.props.input.value) {
        return [];
      }
      return [this.getFile(this.props.input.value)];
    }
    // Convert FILE to local url
    return this.props.input.value.map(e => {
      return this.getFile(e);
    });
  }

  updateOrder(from, to) {
    const arr = [...this.props.input.value];
    arrayMove(arr, from, to);
    this.props.input.onChange(arr);
  }

  deleteImage(name) {
    const confirmText = `Vous êtes sur le point de supprimer une image. La suppression sera effective après avoir cliqué sur "sauvegarder" en bas de la page. Souhaitez-vous continuer ?`;
    const toastrConfirmOptions = {
      onOk: () => {
        // If only One Image.
        if (!Array.isArray(this.props.input.value)) {
          this.props.input.onChange("");
          this.props.filesToUpload([]);
          this.setState({ imageFiles: [] });
          return;
        }

        // Update Image path
        const arr = this.props.input.value.filter(e => e !== name);
        this.props.input.onChange(arr);

        // Update Image file if needed
        const imageFiles = this.state.imageFiles.filter(e => e.name != name);
        this.props.filesToUpload(imageFiles);
        this.setState({ imageFiles });
      }
    };
    toastr.confirm(confirmText, toastrConfirmOptions);
  }

  renderImages() {
    const images = this.getImages();
    const arr = images.map(({ source, name }, i) => {
      const options = (
        <UncontrolledDropdown color="danger">
          <DropdownToggle caret>Action</DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              disabled={!this.props.canEdit}
              onClick={() => {
                this.deleteImage(name);
              }}
            >
              Supprimer
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              disabled={!this.props.canOrder || images.length < 2}
              onClick={() => {
                this.updateOrder(i, 0);
              }}
            >
              Mettre l'image en première position
            </DropdownItem>
            <DropdownItem
              disabled={!this.props.canOrder || images.length < 2}
              onClick={() => {
                this.updateOrder(i, i - 1);
              }}
            >
              Monter l'image
            </DropdownItem>
            <DropdownItem
              disabled={!this.props.canOrder || images.length < 2}
              onClick={() => {
                this.updateOrder(i, i + 1);
              }}
            >
              Descendre l'image
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );

      return (
        <Col className="image" key={name}>
          <div className="image-container">
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
            {options}
            {this.props.footer ? this.props.footer(name) : <div />}
          </div>
        </Col>
      );
    });

    const hideButton =
      this.props.disabled || this.props.hideButton || (!Array.isArray(this.props.input.value) && this.props.input.value || this.props.input.name == 'MEMOIRE');

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

function arrayMove(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

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
