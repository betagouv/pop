import { configureScope } from "@sentry/browser";
import React, { Component } from "react";
import api from "../../../services/api";

class Location extends Component {

  state = { loaded: false }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ready && !this.props.ready) {
      this.load(nextProps.map);
    }
  }

  async load(map) {
    var geocoder = new MapboxGeocoder({
      accessToken: await api.getMapboxToken(),
      countries: "fr", // limit results to France,
      placeholder: "Entrez une ville ou une adresse"
    });
    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

    const handleGeoCoderResult = ev => {
      this.props.setPosition(ev.result.center);
    };
    geocoder.on("result", handleGeoCoderResult);

    const handleGeoCoderClear = () => {
      this.props.setPosition(null);
    };
    geocoder.on("clear", handleGeoCoderClear);

    const handleGeoCoderError = event => {
      if (event.error && event.error.statusCode === 401) {
        this.setState({ loaded: false }, () => {
          geocoder.off("result", handleGeoCoderResult);
          geocoder.off("clear", handleGeoCoderClear);
          geocoder.off("error", handleGeoCoderError);
          this.props.onReload();
        });
      }
    };
    geocoder.on("error", handleGeoCoderError);

    this.setState({ loaded: true });
  }

  render() {
    return this.props.ready && (
      <div>
        <div className="location">
          <div id="geocoder" style={{ display: "flex" }} />
          <div
            className="location-target-icon"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(location => {
                this.props.setPosition([location.coords.longitude, location.coords.latitude]);
              });
            }}
          />
          <div
            className="location-home-icon"
            onClick={() => {
              this.props.setPosition([2.515597, 46.856731], 5, false);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Location;
