import React from "react";
import { Row } from "reactstrap";
import Viewer from "react-viewer";
import "react-viewer/dist/index.css";
import ImageGallery from "react-image-gallery";
import { history } from "../../../redux/store";
import "./fieldImages.css";
import "react-image-gallery/styles/css/image-gallery.css";

export default class FieldImages extends React.Component {
  state = {
    images: [],
    selected: -1
  };

  componentWillMount() {
    this.setState({ images: this.props.images });
  }

  renderImages() {
    if (!this.state.images.length) {
      return <div />;
    }
    const images = this.state.images.map((e, i) => {
      let obj = {
        original: e.source,
        thumbnail: e.source,
        originalAlt: `${this.props.name}`,
        thumbnailAlt: `${this.props.name} vignette `
      };
      if (e.link) {
        obj.thumbnailLabel = (
          <span
            onClick={() => {
              history.push(e.link);
            }}
            href={e.link}
          >
            LIEN
          </span>
        );
      }
      return obj;
    });

    return (
      <ImageGallery
        showFullscreenButton={false}
        showPlayButton={false}
        onClick={i => {
          const selected = this.state.images.findIndex(
            e => e.source === i.target.src
          );
          this.setState({ selected });
        }}
        items={images}
      />
    );
  }

  renderModal() {
    if (this.state.selected === -1) {
      return <div />;
    }
    const images = this.state.images.map(e => {
      return { src: e.source, alt: e.key };
    });
    return (
      <Viewer
        visible
        onClose={() => {
          document.body.style.overflow = "auto";
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
