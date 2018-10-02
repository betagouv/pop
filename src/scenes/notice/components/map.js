import React from "react";
import L from "leaflet";
import { Map, Marker, Popup, TileLayer, Polygon } from "react-leaflet";

import "./map.css";
//https://react-leaflet.js.org/docs/en/components.html#geojson

export default class MapComponent extends React.Component {
  state = {
    center: null
  };

  componentWillMount() {
    let center = null;

    const {
      POP_COORDINATES_POINT,
      POP_COORDINATES_POLYGON
    } = this.props.notice;

    if (
      POP_COORDINATES_POINT &&
      POP_COORDINATES_POINT.coordinates &&
      POP_COORDINATES_POINT.coordinates.length
    ) {
      center = POP_COORDINATES_POINT.coordinates;
    }

    if (
      POP_COORDINATES_POLYGON &&
      POP_COORDINATES_POLYGON.coordinates &&
      POP_COORDINATES_POLYGON.coordinates.length
    ) {
      center = POP_COORDINATES_POLYGON.coordinates[0];
    }

    this.setState({ center });
  }

  renderPoint() {
    return (
      <Marker
        position={this.state.center}
        icon={L.icon({
          iconUrl: require("../../../assets/marker-icon.png"),
          iconSize: [38, 55],
          iconAnchor: [22, 54],
          popupAnchor: [-3, -76],
          shadowUrl: require("../../../assets/marker-shadow.png"),
          shadowSize: [68, 55],
          shadowAnchor: [22, 54]
        })}
      >
        <Popup>
          <span>
            {this.props.notice.TICO}
            <br />
            {this.props.notice.DENO}
          </span>
        </Popup>
      </Marker>
    );
  }

  // renderGeometry() {
  //     if (!this.props.notice.POP_COORDINATES_POLYGON.coordinates.length) {
  //         return <div />
  //     }

  //     return (
  //         <Polygon color="purple" positions={this.props.notice.POP_COORDINATES_POLYGON.coordinates} />
  //     )

  // }

  render() {
    if (!this.state.center) {
      return <div />;
    }

    return (
      <div className="map-container">
        <Map center={this.state.center} zoom={15}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {/* {this.renderGeometry()} */}
          {this.renderPoint()}
        </Map>
      </div>
    );
  }
}
