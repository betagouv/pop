import React from "react";
import Viewer from "react-viewer";
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
    const arr = this.props.images.map((e, i) => {
      return (
        <div key={i}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <img src={e.src} alt={e.alt} onClick={() => this.setState({ selected: i })} />
            {e.footer ? e.footer : <div />}
          </div>
        </div>
      );
    });

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
            background-color: transparent;
            cursor: pointer;
            height: 100%;
            min-height: 200px;
            width: 100%;
            object-fit: contain;
          }

          .slick-next:before,
          .slick-prev:before {
            color: #785d59;
          }
        `}</style>
      </div>
    );
  }
}

export default FieldImages;
