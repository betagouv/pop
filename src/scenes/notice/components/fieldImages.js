import React from "react";
import { Row } from "reactstrap";
import Viewer from "react-viewer";
import "react-viewer/dist/index.css";
import ImageGallery from "react-image-gallery";
import { history } from "../../../redux/store";
import { bucket_url } from "../../../config";

import "./fieldImages.css";
import "react-image-gallery/styles/css/image-gallery.css";

export default class FieldImages extends React.Component {
  state = {
    images: [],
    selected: -1
  };

  componentWillMount() {
    let images = this.props.images.map(e => {
      let source = e;
      let key = e;
      let link = "";

      if (e instanceof Object) {
        source = e.url;
        key = e.ref;
        link = `/notice/memoire/${e.ref}`;
      }

      if (!source.match(/^http/)) {
        source = `${bucket_url}${source}`;
      }
      return { source, key, link };
    });

    images = images.filter(e => e.source);
    this.setState({ images });
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
