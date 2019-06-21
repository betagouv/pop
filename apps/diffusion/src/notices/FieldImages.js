import React from "react";
import Viewer from "react-viewer";
import ImageGalleryStyle from "react-image-gallery/styles/css/image-gallery.css";
import ViewerStyle from "react-viewer/dist/index.css";
import Slider from "react-slick";

class FieldImages extends React.Component {
  state = {
    selected: -1,
    current: 0
  };

  renderImages() {
    if (!this.props.images.length) {
      return <div />;
    }
    const arr = this.props.images
      .map((e, i) => {
        return (
          <div key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "400px"
              }}
            >
              <img src={e.src} alt={e.alt} onClick={() => this.setState({ selected: i })} />
              {e.footer ? e.footer : <div />}
            </div>
          </div>
        );
      })
      .filter((e, i) => (i < 20 ? true : false));

    var settings = {
      lazyLoad: true,
      slidesToShow: 1,
      speed: 0
    };
    return (
      <div>
        {this.props.images.length > 1 ? (
          <div style={{ width: "100%", textAlign: "end", fontSize: "11px" }}>{`${this.state
            .current + 1}/${this.props.images.length}`}</div>
        ) : (
          <span />
        )}
        <Slider
          {...settings}
          beforeChange={(c, n) => {
            this.setState({ current: n });
          }}
        >
          {arr}
        </Slider>
      </div>
    );
  }

  renderModal() {
    if (this.state.selected === -1) {
      return <div />;
    }

    return (
      <Viewer
        visible
        onClose={() => {
          document.body.style.overflow = "auto";
          this.setState({ selected: -1 });
        }}
        images={this.props.images}
        activeIndex={this.state.selected}
      />
    );
  }

  render() {
    return (
      <div className="fieldImages">
        {this.renderModal()}
        {this.renderImages()}
        <style jsx global>
          {ImageGalleryStyle}
        </style>
        <style jsx global>
          {ViewerStyle}
        </style>
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
          .fieldImages img {
            max-height: 220px;
            background-color: transparent;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
}

export default FieldImages;
