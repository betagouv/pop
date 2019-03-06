import React from "react";
import Head from "next/head";
import { toGeoJson, getPrecision, getESQuery } from "./utils";
import Location from "./Location";
import Drawer from "./Drawer";
import Marker from "./Marker";

import Loader from "../../../components/Loader";

export default class Map extends React.Component {
  state = {
    loaded: false,
    popup: null,
    style: "mapbox://styles/mapbox/streets-v9",
    drawerContent: null,
    selectedNotice: null
  };

  mapRef = null;
  map = null;
  cluster = {};

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const mapboxgl = require("mapbox-gl");
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ29mZmxlIiwiYSI6ImNpanBvcXNkMTAwODN2cGx4d2UydzM4bGYifQ.ep25-zsrkOpdm6W1CsQMOQ";
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.state.style
    });

    this.map.on("load", e => {
      this.setState({ loaded: true });
      this.mapInitialPosition(this.map);
      this.updateQuery();
    });

    this.map.on("moveend", () => {
      this.updateQuery();
    });
  }

  updateQuery() {
    const mapBounds = this.map.getBounds();
    const currentZoom = this.map.getZoom();
    const precision = getPrecision(currentZoom);
    this.props.onUpdateQuery(
      mapBounds._ne.lat,
      mapBounds._sw.lng,
      mapBounds._sw.lat,
      mapBounds._ne.lng,
      precision
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.aggregations) {
      return;
    }
    if (
      this.props.aggregations &&
      nextProps.aggregations.france.buckets.length === this.props.aggregations.france.buckets.length
    ) {
      return;
    }

    this.renderClusters(nextProps);
  }

  renderClusters(props, options = {}) {
    if (options.clean) {
      for (var key in this.cluster) {
        this.cluster[key].remove();
        delete this.cluster[key];
      }
    }
    if (props.aggregations) {
      const geojson = toGeoJson(props.aggregations.france.buckets);
      const toRemoveList = { ...this.cluster };
      geojson.features.forEach(feature => {
        if (this.cluster[feature.properties.id]) {
          delete toRemoveList[feature.properties.id];
        } else {
          const marker = new Marker(feature);
          marker.onClick((center, selectedNotice) => {
            this.setState({ selectedNotice });
            this.map.flyTo({ center, zoom: Math.min(this.map.getZoom() + 1, 13) });
          });

          marker.addTo(this.map);
          this.cluster[feature.properties.id] = marker;
        }
      });

      for (var key in toRemoveList) {
        this.cluster[key].remove();
        delete this.cluster[key];
      }
      //https://docs.mapbox.com/mapbox-gl-js/example/custom-marker-icons/
    }
    this.forceUpdate();
  }

  flyTo(center, zoom) {}

  mapInitialPosition = map => {
    if (map) {
      map.resize();
      map.setZoom(5);
      map.setCenter({ lng: 2.515597, lat: 46.856731 });
    }
  };

  render() {
    return (
      <div style={{ width: "100%", height: "600px" }} className="search-map view">
        <Head>
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css"
            rel="stylesheet"
          />
          <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v3.1.4/mapbox-gl-geocoder.min.js" />
          <link
            rel="stylesheet"
            href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v3.1.4/mapbox-gl-geocoder.css"
            type="text/css"
          />
        </Head>
        <Location map={this.map} />
        <Drawer notice={this.state.selectedNotice} />
        <Loader isOpen={!this.state.loaded} />
        <div id="map" ref={this.mapRef} style={{ width: "100%", height: "600px" }}>
          {/* <SwitchStyleButton
            value={this.state.style}
            onChange={style => {
              this.setState({ style });
              this.map.setStyle(style);
            }}
          /> */}
        </div>
      </div>
    );
  }
}

const SwitchStyleButton = ({ onChange, value }) => {
  return (
    <div
      className="switch-view"
      onClick={() =>
        onChange(
          value === "mapbox://styles/mapbox/streets-v9"
            ? "mapbox://styles/mapbox/satellite-streets-v9"
            : "mapbox://styles/mapbox/streets-v9"
        )
      }
    >
      {value === "mapbox://styles/mapbox/streets-v9" ? (
        <img src="/static/satelite.png" className="thumbnailStyle" alt="style" />
      ) : (
        <img src="/static/street.png" className="thumbnailStyle" alt="style" />
      )}
    </div>
  );
};
