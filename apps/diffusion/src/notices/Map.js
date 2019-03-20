import React from "react";
import Head from "next/head";

class MapComponent extends React.Component {
  map = null;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { center, geometry, layer } = getGeoJson(this.props.notice);

    if (center && this.props.notice.POP_COORDONNEES && this.props.notice.POP_COORDONNEES.lat) {
      const mapboxgl = require("mapbox-gl");
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZ29mZmxlIiwiYSI6ImNpanBvcXNkMTAwODN2cGx4d2UydzM4bGYifQ.ep25-zsrkOpdm6W1CsQMOQ";

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v9",
        zoom: 14,
        center
      });

      map.on("load", e => {
        map.addSource("pop", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                id: 0,
                properties: { id: 0 },
                geometry
              }
            ]
          }
        });
        map.addLayer(layer);
      });
    }
  }
  render() {
    if (!this.props.notice.POP_COORDONNEES.lat) {
      return null;
    }

    return (
      <div className="map-container">
        <Head>
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <div id="map" ref={this.mapRef} />
        <style jsx>{`
          .map-container {
            background-color: #fff;
            padding: 15px 10px;
            border-radius: 5px;
            box-shadow: 0 2px 2px 0 rgba(215, 215, 215, 0.5);
            height: 300px;
            padding-top: 10px;
            margin-right: 15px;
            margin-bottom: 15px;
            width: 100%;
          }

          #map {
            width: 100%;
            height: 100%;
          }

          .leaflet-container {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}

function getGeoJson(notice) {
  const { POP_COORDONNEES, POP_COORDINATES_POLYGON } = notice;
  if (POP_COORDINATES_POLYGON && POP_COORDINATES_POLYGON.coordinates.length) {
    return {
      center: { lng: POP_COORDONNEES.lon, lat: POP_COORDONNEES.lat },
      geometry: {
        type: "Polygon",
        coordinates: [POP_COORDINATES_POLYGON.coordinates.map(e => [e[1], e[0]])]
      },
      layer: {
        id: "unclustered-point",
        type: "fill",
        source: "pop",
        filter: ["!", ["has", "count"]],
        paint: {
          "fill-color": "#4264FB",
          "fill-opacity": 0.8
        }
      }
    };
  } else if (POP_COORDONNEES && POP_COORDONNEES.lat) {
    return {
      center: { lng: POP_COORDONNEES.lon, lat: POP_COORDONNEES.lat },
      geometry: {
        type: "Point",
        coordinates: [POP_COORDONNEES.lon, POP_COORDONNEES.lat]
      },
      layer: {
        id: "unclustered-point",
        type: "circle",
        source: "pop",
        filter: ["!", ["has", "count"]],
        paint: {
          "circle-color": [
            "case",
            ["boolean", ["feature-state", "clicked"], false],
            "#fff",
            "#9C27B0"
          ],
          "circle-radius": 9,
          "circle-stroke-width": 2,
          "circle-stroke-color": [
            "case",
            ["boolean", ["feature-state", "clicked"], false],
            "#9C27B0",
            "#fff"
          ]
        }
      }
    };
  }
  return {};
}
export default MapComponent;
