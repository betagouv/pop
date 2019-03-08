import React, { Component } from "react";

class Location extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.ready && !this.props.ready) {
      this.load(nextProps.map);
    }
  }
  load(map) {
    var geocoder = new MapboxGeocoder({
      accessToken:
        "pk.eyJ1IjoiZ29mZmxlIiwiYSI6ImNpanBvcXNkMTAwODN2cGx4d2UydzM4bGYifQ.ep25-zsrkOpdm6W1CsQMOQ",
      countries: "fr", // limit results to France,
      placeholder: "Entrez une ville ou une adresse"
    });
    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
  }
  render() {
    return (
      <div>
        <div className="location">
          <div id="geocoder" style={{ display: "flex" }} />
          <div
            className="location-target-icon"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(location => {
                this.props.map.flyTo({
                  center: [location.coords.longitude, location.coords.latitude],
                  zoom: 13
                });
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default Location;
