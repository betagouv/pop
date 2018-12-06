import React from "react";
import { Row, Col } from "reactstrap";
import FieldImages from "./fieldImages";
import Map from "./map";
import { toFieldImages, hasCoordinates } from "../utils";

class Header extends React.Component {
  render() {
    const images = toFieldImages(this.props.images);
    const showMap = hasCoordinates(this.props.notice.POP_COORDONNEES);
    const showImages = images.length;
    const cols = [];
    if (!showMap && !showImages) {
      return <div />;
    }
    if (showImages) {
      cols.push(
        <Col key="fieldImages" className="image" sm={showMap ? 6 : 12}>
          <FieldImages
            images={images}
            disabled
            name={this.props.notice.TICO}
            external={this.props.externalImages}
          />
        </Col>
      );
    }
    if (showMap) {
      cols.push(
        <Col key="Map" className="image" sm={showImages ? 6 : 12}>
          <Map notice={this.props.notice} />
        </Col>
      );
    }
    return <Row>{cols}</Row>;
  }
}

export default Header;