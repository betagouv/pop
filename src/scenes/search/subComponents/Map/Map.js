import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import nGeoHash from "ngeohash";
import ReactMapboxGl, { Layer, Source, Popup } from "react-mapbox-gl";

import CardMap from "./CardMap";

import "./mapbox-gl.css";


const MapBox = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZ29mZmxlIiwiYSI6ImNpanBvcXNkMTAwODN2cGx4d2UydzM4bGYifQ.ep25-zsrkOpdm6W1CsQMOQ"
});

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
    //console.log(boxZoomBounds.zoom)

    let zoom = Math.round(boxZoomBounds.zoom);
    if(zoom < 2) {
      zoom = 2;
    } else if(zoom > 15) {
      zoom = 15;
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
      15: 8
    };

    const precision = obj[zoom];
    this.prevPrecision = precision;

    this.updateQuery(
      boxZoomBounds.north,
      boxZoomBounds.west,
      boxZoomBounds.south,
      boxZoomBounds.east,
      precision
    );
    
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
    loaded: false,
    center: [2.367101341254551, 48.86162755885409],
    zoom: 13,
    popup: null
  };

  mapRef = null;

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
    this.onMoveEnd = this.onMoveEnd.bind(this);

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.loaded &&
      this.props.aggregations &&
      nextProps.aggregations
    ) {
      let should = ( this.props.aggregations.france.buckets !== nextProps.aggregations.france.buckets );
      if(!should && (this.state.popup !== nextState.popup)) should = true;
      return should;
    }
    return true;
  }

  componentDidUpdate() {
    this.renderClusters();
  }

  onMoveEnd (map, event) {
    const mapBounds = map.getBounds();

    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();

    this.setState({ 
      center: [currentCenter.lng,currentCenter.lat],
      zoom: currentZoom,
      popup: null,
    });

    this.props.onChange(event, {
      zoom: currentZoom,
      bounds: mapBounds,
      north: mapBounds._ne.lat,
      south: mapBounds._sw.lat,
      east: mapBounds._ne.lng,
      west: mapBounds._sw.lng
    });
  }

  renderClusters() {
    if (this.state.loaded && this.props.aggregations) {
      //console.log("points", this.props.aggregations.france.buckets.length);
      const geojson = toGeoJson(this.props.aggregations.france.buckets);
      //console.log("add", geojson);
      //const before = window.performance.now();
      this.map.getSource("pop").setData(geojson);
      //const timeExec = window.performance.now() - before;
      //console.log(`setData ${timeExec} ms`);
    }
  }

  render() {
    const style = {
      width: "100%",
      height: "1000px"
    };
    return (
      <MapBox
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={style}
        zoom={[this.state.zoom]}
        center={this.state.center}
        ref={this.mapRef}
        onStyleLoad={
            (map)=>{
              map.resize();
              this.map = this.mapRef.current.state.map;

              map.on('click', 'unclustered-point', (e) => {
                
                const features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] });
                console.log(features)
                if(features.length === 1) {
                  const itemId = features[0].properties.id;
                  const hit = JSON.parse(features[0].properties.hit);
                  const item = {...hit, ...hit._source};
        
                  console.log(item)
                  
                  const popup = (
                    <Popup
                      key={`Popup`}
                      coordinates={[item.POP_COORDONNEES.lon, item.POP_COORDONNEES.lat]}
                    >
                      <CardMap className="" key={item.REF} data={item} />
                    </Popup>
                  );
                  
                  this.setState({ popup });
                  
                }
              });

              map.on('mouseenter', 'unclustered-point', () => { this.map.getCanvas().style.cursor = 'pointer'; });
              map.on('mouseleave', 'unclustered-point', () => { this.map.getCanvas().style.cursor = ''; });



              this.setState({ loaded: true });
            }
        }
        onMoveEnd={this.onMoveEnd}
        onData={
          (map)=> {

          }
        }
      >
        <Source 
          id="pop" 
          geoJsonSource={
            {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: []
              }
            }
          }
        />
        <Layer 
          type="circle"
          id="clusters"
          sourceId="pop"
          filter={["has", "count"]}
          paint={{
              "circle-color": [
                "step",
                ["get", "count"],
                "#9C27B0",
                2,
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1"
              ],
              "circle-radius": [
                "step",
                ["get", "count"],
                9,
                2,
                20,
                100,
                30,
                750,
                40
              ],
              "circle-stroke-width": [
                "step",
                ["get", "count"],
                2,
                2,
                0
              ],
              "circle-stroke-color": "#fff"
          }}
				/>
        <Layer 
          type="symbol"
          id="cluster-count"
          sourceId="pop"
          filter={["has", "count"]}
          layout={{
              "text-field": "{count}",
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12
          }}
          paint={{
            'text-color': [
              "step",
              ["get", "count"],
              "#ffffff",
              2,
              "#000000"
            ],
          }}
				/>
        <Layer 
          type="circle"
          id="unclustered-point"
          sourceId="pop"
          filter={["!", ["has", "count"]]}
          paint={
            {
                    "circle-color": "#9C27B0",
                    "circle-radius": 9,
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#fff"
                }
          }
        />
        {this.state.popup}
      </MapBox>
    );
  }
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
    const hit = item.top_hits.hits.hits[0];
    let feature = {
      type: "Feature",
      properties: {
        id: item.key,
        hit,
      },
      geometry: {
        type: "Point",
        coordinates: [ncoordinates.longitude, ncoordinates.latitude]
      }
    };
    if(item.doc_count > 1) {
      feature.properties.count = item.doc_count;
    } else {
      feature.geometry.coordinates = [hit._source.POP_COORDONNEES.lon, hit._source.POP_COORDONNEES.lat];
    }
    geoJsonFormated.features.push(feature);
  }

  //const timeExec = window.performance.now() - before;
  //console.log(`toGeoJson ${timeExec} ms`);

  return geoJsonFormated;
}
