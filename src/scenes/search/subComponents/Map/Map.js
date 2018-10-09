import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import "./mapbox-gl.css";

export default class Umbrella extends React.Component {
  state = {};
  componentWillMount() {
    this.updateQuery(51, -5, 41, -6, 3);
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
        "constant_score": {
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
        <Map />
      </ReactiveComponent>
    );
  }
}

class Map extends React.Component {
  state = {
    loaded: false
  };
  componentDidMount() {
    const center = [2.367101341254551, 48.86162755885409];
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ29mZmxlIiwiYSI6ImNpanBvcXNkMTAwODN2cGx4d2UydzM4bGYifQ.ep25-zsrkOpdm6W1CsQMOQ";

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/light-v9",
      center,
      zoom: 13
    });
    const map = this.map;
    map.on("load", () => {
      map.addSource("pop", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });
      this.setState({ loaded: true });
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  renderClusters() {
    if (this.state.loaded && this.props.aggregations) {
      const geojson = toGeoJson(this.props.aggregations.france.buckets);
      console.log("add", geojson);
      this.map.getSource("pop").setData(geojson);
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
  const geoJsonFormated = {
    type: "FeatureCollection",
    info: { type: "name", properties: { name: "POP" } },
    features: []
  };

  for (var i = 0; i < arr.length; i++) {
    const item = arr[i];
    geoJsonFormated.features.push({
      type: "Feature",
      properties: {
        id: item.key,
        count: item.doc_count,
        hit: item.top_hits.hits.hits[0]
      },
      geometry: {
        type: "Point",
        coordinates: [1.092157, 47.551314]
      }
    });
  }

  return geoJsonFormated;
}
