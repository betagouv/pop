import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import nGeoHash from "ngeohash";
import queryString from "query-string";
import Loader from "../../../components/Loader";

import LinkedNotices from "../LinkedNotices";
import SingleNotice from "../SingleNotice";

import "./Map.css";

const MAX_PRECISION = 8;

const getPrecision = zoom => {
  let correctedZoom = Math.round(zoom);
  if (correctedZoom < 2) {
    correctedZoom = 2;
  } else if (correctedZoom > 15) {
    correctedZoom = 15;
  }
  const obj = {
    2: 3,
    3: 3,
    4: 3,
    5: 3,
    6: 3,
    7: 4,
    8: 4,
    9: 4,
    10: 5,
    11: 6,
    12: 6,
    13: 7,
    14: 7,
    15: MAX_PRECISION
  };
  return obj[correctedZoom];
};

const idCounter = {};
const uniqueId = (prefix = "$lodash$") => {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }

  const id = ++idCounter[prefix];
  if (prefix === "$lodash$") {
    return `${id}`;
  }

  return `${prefix + id}`;
};

export default class Umbrella extends React.Component {
  state = {
    query: {},
    isNewSearch: false,
    markers: []
  };

  prevPrecision = 1;
  prevBounds = null;
  currentSearch = null;

  urlLocation = null;

  constructor(props) {
    super(props);
    this.onMapChange = this.onMapChange.bind(this);
  }

  componentWillMount() {
    this.updateQuery(51, -5, 41, -6, 3);
  }

  componentDidUpdate(prevProps) {
    try {
      if (location) {
        this.urlLocation = location.search;
      }
    } catch (error) {
      if (this.props.location) {
        // If window.location not defined use props
        this.urlLocation = this.props.location.search;
      } else {
        throw new Error("location is not defined");
      }
    }
    const parsed = queryString.parse(this.urlLocation);
    const nextSearch = JSON.stringify(parsed);
    if (this.currentSearch !== nextSearch) {
      // New Search
      this.currentSearch = nextSearch;
      this.setState({ isNewSearch: true });
    } else if (this.state.isNewSearch) {
      this.setState({ isNewSearch: false });
    }
  }

  updateMarkers() {}

  onMapChange(boxZoomBounds) {
    //console.log(boxZoomBounds.zoom)
    console.log(boxZoomBounds.zoom);
    const precision = getPrecision(boxZoomBounds.zoom);
    //if(this.prevPrecision !== precision) {
    this.prevPrecision = precision;

    this.updateQuery(
      boxZoomBounds.north,
      boxZoomBounds.west,
      boxZoomBounds.south,
      boxZoomBounds.east,
      precision
    );
    //}
  }

  /*

GeoHash length
Area width x height
1-5,009.4km x 4,992.6km
2-1,252.3km x 624.1km
3-156.5km x 156km
4-39.1km x 19.5km
5-4.9km x 4.9km
6-1.2km x 609.4m
7-152.9m x 152.4m
8-38.2m x 19m
9-4.8m x 4.8m
10-1.2m x 59.5cm
11-14.9cm x 14.9cm
12- 3.7cm x 1.9cm
*/

  updateQuery(top_left_lat, top_left_lon, bottom_right_lat, bottom_right_lon, precision) {
    const query = `{
      "size": 1,
      "query": {
        "bool": {
          "must": {
              "match": {"POP_CONTIENT_GEOLOCALISATION":"oui"}
          },
          "filter": {
            "geo_bounding_box": {
              "POP_COORDONNEES": {
                "top_left": {
                  "lat": "${top_left_lat}",
                  "lon": "${top_left_lon}"
                },
                "bottom_right": {
                  "lat": "${bottom_right_lat}",
                  "lon": "${bottom_right_lon}"
                }
              }
            }
          }
        }
      },
      "aggs": {
        "france": {
          "geohash_grid": {
            "field": "POP_COORDONNEES",
            "precision": ${precision}
          },
          "aggs": {
            "top_hits": {
              "top_hits": {
                "size": ${precision === MAX_PRECISION ? 100 : 1}
              }
            }
          }
        }
      }
    }`;
    this.setState({ query: JSON.parse(query) });
  }

  render() {
    return (
      <ReactiveComponent
        componentId="map" // a unique id we will refer to later
        URLParams={this.props.URLParams || true}
        react={{ and: this.props.filters }}
        defaultQuery={() => this.state.query}
      >
        <Map onChange={this.onMapChange} isNewSearch={this.state.isNewSearch} />
      </ReactiveComponent>
    );
  }
}

class Map extends React.Component {
  state = {
    loaded: false,
    popup: null,
    style: "mapbox://styles/mapbox/streets-v9",
    drawerContent: null
  };

  mapRef = null;
  singleFeatureClicked = null;
  clusterFeatureClicked = null;
  featureClicked = null;
  map = null;

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
    this.onMoveEnd = this.onMoveEnd.bind(this);
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
      this.renderClusters();
    });

    this.map.on("moveend", () => {
      this.onMoveEnd(this.map);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.isNewSearch && !prevProps.isNewSearch) {
      this.mapInitialPosition(this.map);
    }
  }

  onMoveEnd(map) {
    if (this.state.loaded) {
      const mapBounds = map.getBounds();
      const currentZoom = map.getZoom();

      this.props.onChange({
        zoom: currentZoom,
        bounds: mapBounds,
        north: mapBounds._ne.lat,
        south: mapBounds._sw.lat,
        east: mapBounds._ne.lng,
        west: mapBounds._sw.lng
      });
    }
  }

  renderClusters() {

    console.log()
    if (this.state.loaded && this.props.aggregations) {
      const geojson = toGeoJson(this.props.aggregations.france.buckets);
      console.log("geojson", geojson);
      geojson.features.forEach(marker => {
        // create a DOM element for the marker
        var el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = "url(https://placekitten.com/g/40/40/)";

        el.addEventListener("click", () => {
          window.alert([48.672181, 2.42421]);
        });

        const mapboxgl = require("mapbox-gl");

        new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(this.map);
      });
      //https://docs.mapbox.com/mapbox-gl-js/example/custom-marker-icons/
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

const mapGeoHashToUniqId = {};
function getGeoHashUniqId(geoHash) {
  // NOT NICE AT ALL, TODO CHECK THE PERF HERE
  if (!mapGeoHashToUniqId.hasOwnProperty(geoHash)) {
    mapGeoHashToUniqId[geoHash] = uniqueId();
  }
  return mapGeoHashToUniqId[geoHash];
}

function toGeoJson(arr) {
  //const before = window.performance.now();
  const geoJsonFormated = {
    type: "FeatureCollection",
    info: { type: "name", properties: { name: "POP" } },
    features: []
  };
  for (var i = 0; i < arr.length; i++) {
    const item = arr[i];
    const ncoordinates = nGeoHash.decode(item.key);

    let feature = {
      type: "Feature",
      id: getGeoHashUniqId(item.key),
      properties: {
        id: item.key,
        hits: item.top_hits.hits.hits
      },
      geometry: {
        type: "Point",
        coordinates: [ncoordinates.longitude, ncoordinates.latitude]
      }
    };
    if (item.doc_count > 1) {
      feature.properties.count = item.doc_count;
    } else {
      feature.geometry.coordinates = [
        feature.properties.hits[0]._source.POP_COORDONNEES.lon,
        feature.properties.hits[0]._source.POP_COORDONNEES.lat
      ];
    }
    geoJsonFormated.features.push(feature);
  }

  return geoJsonFormated;
}
