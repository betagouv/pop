import React from "react";
import { Row } from "reactstrap";
import Viewer from "react-viewer";
import ImageGallery from "react-image-gallery";
import ImageGalleryStyle from "react-image-gallery/styles/css/image-gallery.css";
import ViewerStyle from "react-viewer/dist/index.css";
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
        <style jsx global>{ImageGalleryStyle}</style>
        <style jsx global>{ViewerStyle}</style>
        <style jsx global>{`
          .fieldImages {
            width: 100%;
            max-width: 500px;
            margin: auto;
            margin-bottom: 15px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .fieldImages :global(.item) {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .fieldImages .item p {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            text-align: center;
          }

          .fieldImages .image-gallery span {
            font-size: 10px;
            color: #808d9e;
            font-weight: 500;
            margin-bottom: 5px;
          }

          .fieldImages img {
            max-height: 380px;
            background-color: transparent;
          }

          .fieldImages .image-gallery {
            width: 100%;
          }

          .fieldImages .image-gallery-thumbnail-label {
            position: relative;
            padding: 0px;
            transform: none;
            text-shadow: none;
          }

          .fieldImages .image-gallery-thumbnail-label a {
            font-size: 12px;
            color: grey;
          }

          .image-gallery {
            padding: 15px 10px;
            border-radius: 5px;
          }

          .image-gallery-image {
            height: 360px;
            text-align: center;
          }

          .image-gallery-slide .image-gallery-image > img {
            width: auto;
            max-width: 100%;
          }

          .image-gallery-slide {
            background-color: transparent;
          }
        `}</style>
      </div>
    );
  }
}

export default FieldImages;
