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
    selectedMarker: null
  };

  mapRef = null;
  map = null;
  markers = {};

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
      this.mapInitialPosition(this.map);
      this.setState({ loaded: true });
      this.updateQuery();
    });

    this.map.on("moveend", () => {
      if (this.state.loaded) {
        this.updateQuery();
      }
    });

    this.map.on("click", () => {
      this.selectMarker(null);
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

    if (!this.props.aggregations) {
      this.renderMarkers(nextProps);
      return;
    }

    //This is call 6 times per changement
    const nextBuckets = nextProps.aggregations.france.buckets;
    const prevBuckets = this.props.aggregations.france.buckets;

    if (prevBuckets.length !== nextBuckets.length) {
      this.renderMarkers(nextProps);
      return;
    }

    const shouldnotrefresh = nextBuckets.every((e, i) => {
      return (
        e.key === prevBuckets[i].key &&
        e.count === prevBuckets[i].count &&
        e.top_hits.hits.hits[0]._id === prevBuckets[i].top_hits.hits.hits[0]._id
      );
    });

    if (shouldnotrefresh) {
      return;
    }

    this.renderMarkers(nextProps);
  }

  selectMarker(marker) {
    if (this.state.selectedMarker && this.state.selectedMarker != marker) {
      this.state.selectedMarker.unselect();
    }
    if (marker) {
      marker.select();
    }
    this.setState({ selectedMarker: marker });
  }

  renderMarkers(props) {
    const removeList = { ...this.markers };

    if (props.aggregations) {
      const geojson = toGeoJson(props.aggregations.france.buckets);
      geojson.features.forEach(feature => {
        const key = feature.properties.id;

        //Si le marker est une notice unique, toujours la meme, alors on ne la reconstruit pas
        if (
          this.markers[key] &&
          this.markers[key]._type === "notice" &&
          this.markers[key].getHit()._source.REF === feature.properties.hits[0]._source.REF
        ) {
          delete removeList[key];
          return;
        }

        const marker = new Marker(feature);
        marker.onClick(marker => {
          const center = marker.getCoordinates();
          this.map.flyTo({ center, zoom: Math.min(this.map.getZoom() + 1, 13) });
          if (marker._type === "notice") {
            this.selectMarker(marker);
          }
        });
        marker.addTo(this.map);
        this.markers[key] = marker;
      });
    }

    for (var key in removeList) {
      removeList[key].remove();
      delete removeList[key];
    }
  }

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
        <Location ready={this.state.loaded} map={this.map} />
        <Drawer
          notice={this.state.selectedMarker ? this.state.selectedMarker.getHit() : null}
          onClose={() => {
            this.selectMarker(null);
          }}
        />
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
