import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import nGeoHash from "ngeohash";

import "./mapbox-gl.css";

export default class Umbrella extends React.Component {
  state = {
    query: {}
  };

  prevPrecision = 1;
  prevBounds = null;

  constructor(props) {
    super(props);
    this.onMapChange = this.onMapChange.bind(this);
  }

  componentWillMount() {
    this.updateQuery(51, -5, 41, -6, 8);
  }

  onMapChange(originalEvent, boxZoomBounds) {
    console.log(boxZoomBounds.zoom)

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
      15: 8
    };

    const precision = obj[Math.round(boxZoomBounds.zoom)];
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

  updateQuery(
    top_left_lat,
    top_left_lon,
    bottom_right_lat,
    bottom_right_lon,
    precision
  ) {
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
                "size": 1
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
        componentId={this.props.componentId || "map"} // a unique id we will refer to later
        URLParams={this.props.URLParams || true}
        react={this.props.react || {}}
        defaultQuery={() => this.state.query}
      >
        <Map onChange={this.onMapChange} />
      </ReactiveComponent>
    );
  }
}

class Map extends React.Component {
  state = {
    loaded: false
  };
  //debounceTimeout = null;

  mapDataAndLayer() {
    this.map.addSource("pop", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: []
      }
    });

    this.map.addLayer({
      id: "clusters",
      type: "circle",
      source: "pop",
      filter: ["has", "count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "count"],
          "#51bbd6",
          100,
          "#f1f075",
          750,
          "#f28cb1"
        ],
        "circle-radius": ["step", ["get", "count"], 20, 100, 30, 750, 40]
      }
    });

    this.map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "pop",
      filter: ["has", "count"],
      layout: {
        "text-field": "{count}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
      }
    });

    this.setState({ loaded: true });
    this.map.resize();
  }

  componentDidMount() {
    const center = [2.367101341254551, 48.86162755885409];
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ29mZmxlIiwiYSI6ImNpanBvcXNkMTAwODN2cGx4d2UydzM4bGYifQ.ep25-zsrkOpdm6W1CsQMOQ";

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center,
      zoom: 13
    });

    this.map.on("style.load", () => {
      const waiting = () => {
        if (!this.map.isStyleLoaded()) {
          setTimeout(waiting, 200);
        } else {
          this.mapDataAndLayer();
        }
      };
      waiting();
    });

    this.map.on("moveend", originalEvent => {
      const mapBounds = this.map.getBounds();

      // if(this.debounceTimeout) {
      //   clearTimeout(this.debounceTimeout);
      // }

      //   this.debounceTimeout = setTimeout(
      //      ()=>{
      //        this.props.onChange(
      //          originalEvent,
      //          {
      //            zoom: this.map.getZoom(),
      //            bounds: mapBounds,
      //            north: mapBounds._ne.lat,
      //            south: mapBounds._sw.lat,
      //            east: mapBounds._ne.lng,
      //            west: mapBounds._sw.lng
      //           }
      //        );
      //      },
      //      200
      //  );

      this.props.onChange(originalEvent, {
        zoom: this.map.getZoom(),
        bounds: mapBounds,
        north: mapBounds._ne.lat,
        south: mapBounds._sw.lat,
        east: mapBounds._ne.lng,
        west: mapBounds._sw.lng
      });
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.loaded &&
      this.props.aggregations &&
      nextProps.aggregations
    ) {
      return (
        this.props.aggregations.france.buckets !==
        nextProps.aggregations.france.buckets
      );
    }
    return true;
  }

  renderClusters() {
    if (this.state.loaded && this.props.aggregations) {
      console.log("points", this.props.aggregations.france.buckets.length);
      const geojson = toGeoJson(this.props.aggregations.france.buckets);
      //console.log("add", geojson);
      const before = window.performance.now();
      this.map.getSource("pop").setData(geojson);
      const timeExec = window.performance.now() - before;
      console.log(`setData ${timeExec} ms`);
    }
  }

  render() {
    const style = {
      width: "100%",
      height: "1000px"
    };
    return (
      <div style={style} ref={el => (this.mapContainer = el)}>
        {this.renderClusters()}
      </div>
    );
  }
}

function toGeoJson(arr) {
  const before = window.performance.now();
  const geoJsonFormated = {
    type: "FeatureCollection",
    info: { type: "name", properties: { name: "POP" } },
    features: []
  };

  for (var i = 0; i < arr.length; i++) {
    const item = arr[i];
    const ncoordinates = nGeoHash.decode(item.key);

    // console.log(item.top_hits.hits.hits[0])

    geoJsonFormated.features.push({
      type: "Feature",
      properties: {
        id: item.key,
        count: item.doc_count,
        hit: item.top_hits.hits.hits[0]
      },
      geometry: {
        type: "Point",
        coordinates: [ncoordinates.longitude, ncoordinates.latitude]
      }
    });
  }

  const timeExec = window.performance.now() - before;
  console.log(`toGeoJson ${timeExec} ms`);

  return geoJsonFormated;
}
