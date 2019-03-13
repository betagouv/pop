import React from "react";
import { Row } from "reactstrap";
import Viewer from "react-viewer";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-viewer/dist/index.css";
import amplitudeService from "../services/amplitude";
import "./FieldImages.css";
import Router from "next/router";

class FieldImages extends React.Component {
  state = {
    images: [],
    selected: -1
  };

  componentWillMount() {
    this.setState({ images: this.props.images });
  }

  renderImages() {
    if (!this.state.images.length) {
      return null;
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
          <span onClick={() => Router.push(e.link)} href={e.link}>
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
        showThumbnails={images.length > 1}
        defaultImage="/static/noimage.png"
        onClick={i => {
          if (i.target.src) {
            amplitudeService.logEvent("notice_image_open", {
              base: this.props.base || "base inconnue",
              notice: this.props.reference || "référence inconnue",
              value: i.target.src
            });
            const selected = this.state.images.findIndex(e => e.source === i.target.src);
            this.setState({ selected });
          }
        }}
        items={images}
      />
    );
  }

  renderModal() {
    if (this.state.selected === -1) {
      return null;
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
        onChange={e => {
          amplitudeService.logEvent("notice_image_open", {
            base: this.props.base || "base inconnue",
            notice: this.props.reference || "référence inconnue",
            value: e.src
          });
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

export default FieldImages;
