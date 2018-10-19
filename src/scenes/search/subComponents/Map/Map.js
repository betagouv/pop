import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import nGeoHash from "ngeohash";
import { uniqueId } from 'lodash';
import ReactMapboxGl, { Layer, Source, Popup } from "react-mapbox-gl";
import Loader from "../../../../components/loader";

import CardMap from "./CardMap";

import LinkedNotices from './subComponents/LinkedNotices';
import SingleNotice from './subComponents/SingleNotice';

import "./mapbox-gl.css";
import "./map.css";

import SateliteImg from '../../../../assets/Satelite.png';
import StreetImg from '../../../../assets/street.png';


const MapBox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZ29mZmxlIiwiYSI6ImNpanBvcXNkMTAwODN2cGx4d2UydzM4bGYifQ.ep25-zsrkOpdm6W1CsQMOQ"
});

const MAX_PRECISION = 8;
const getPrecision = (zoom)=> {
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
                "size": ${precision === MAX_PRECISION? 100 : 1}
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
        react={{ and: this.props.filter }}
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
    popup: null,
    style: "streets",
    drawerContent: null,
  };

  mapRef = null;
  singleFeatureClicked = null;
  clusterFeatureClicked = null;
  featureClicked = null;

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.onSwitchStyle = this.onSwitchStyle.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.loaded &&
      this.props.aggregations &&
      nextProps.aggregations
    ) {
      let should =
        this.props.aggregations.france.buckets !==
        nextProps.aggregations.france.buckets;
      if (!should && this.state.popup !== nextState.popup) should = true;
      if (!should && this.state.style !== nextState.style) should = true;
      return should;
    }
    return true;
  }

  componentDidUpdate() {
    this.renderClusters();
  }

  onMoveEnd(map, event) {
    const mapBounds = map.getBounds();
    const currentZoom = map.getZoom();

    this.setState({
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
      if(this.map.getSource("pop")) {
        this.map.getSource("pop").setData(geojson);
      }
      //const timeExec = window.performance.now() - before;
      //console.log(`setData ${timeExec} ms`);
    }
  }

  onSwitchStyle() {
    let styleName = '';
    let nextStyle = '';
    if(this.state.style === "streets") {
      nextStyle = 'satellite';
      styleName = "mapbox://styles/mapbox/satellite-streets-v9";
    } else {
      nextStyle = 'streets';
      styleName= "mapbox://styles/mapbox/streets-v9";
    }
    this.map.setStyle(styleName);
    this.setState({
      style: nextStyle,
    });
  }

  onPointClicked (e, layerType){
    if(layerType === 'clusters') {
      const precision = getPrecision(this.map.getZoom());
      if(precision < MAX_PRECISION) {
        return false;
      }
    }

    const features = this.map.queryRenderedFeatures(e.point, { layers: [layerType] });

    if(features.length === 1) {
      if(this.featureClicked) {
        this.map.setFeatureState(this.featureClicked, { clicked: false});
      }
    
      this.featureClicked = features[0];
      this.map.setFeatureState(features[0], { clicked: true});
      this.map.flyTo({
        center: features[0].geometry.coordinates,
        offset: [130, 0],
      });

      let drawerContent = null;
      if(layerType === 'clusters') {
        const hits = JSON.parse(features[0].properties.hits).map(hit => ({...hit, ...hit._source}));
        drawerContent = (
          <LinkedNotices links={hits} />
        );
      } else if(layerType === 'unclustered-point') {
        const itemId = features[0].properties.id;
        const hits = JSON.parse(features[0].properties.hits);
        const item = {...hits[0], ...hits[0]._source};
        drawerContent = (
          <SingleNotice className="" key={item.REF} data={item} />
        );
      }

      this.setState({ drawerContent });
    }
  }

  render() {
    const style = {
      width: "100%",
      height: "600px"
    };
    
    return (
      <div style={style} className="search-map">
        <Loader isOpen={!this.state.loaded} />
        <MapBox
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={style}
          ref={this.mapRef}
          onStyleLoad={
              (map)=>{
                map.resize();
                map.setZoom(5);
                map.setCenter({lng:2.515597, lat:46.856731});
                this.map = map;

                window.mapRef = map;
                
                map.on('click', 'clusters', (e) => {
                    this.onPointClicked(e, 'clusters');
                });

                map.on('click', 'unclustered-point', (e) => {
                  this.onPointClicked(e, 'unclustered-point');
                });

                map.on("mouseenter", "unclustered-point", () => {
                  this.map.getCanvas().style.cursor = "pointer";
                });
                map.on("mouseleave", "unclustered-point", () => {
                  this.map.getCanvas().style.cursor = "";
                });

                this.setState({ loaded: true });
          }}
          onMoveEnd={this.onMoveEnd}
          onData={map => {}}
        >
          <Source
            id="pop"
            geoJsonSource={{
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: []
              }
            }}
          />
          <Layer
            type="circle"
            id="clusters"
            sourceId="pop"
            filter={["has", "count"]}
            paint={{
              "circle-color": ["case",
                  ["boolean", ["feature-state", "clicked"], false],
                  "#fff",
                  [
                    "step",
                    ["get", "count"],
                    "#9C27B0",
                    2,
                    "#51bbd6",
                    100,
                    "#f1f075",
                    750,
                    "#f28cb1"
                  ]
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
              "circle-stroke-width": ["case",
                  ["boolean", ["feature-state", "clicked"], false],
                  2,
                  [
                    "step",
                    ["get", "count"],
                    2,
                    2,
                    0
                  ]
              ],
              "circle-stroke-color": ["case",
                  ["boolean", ["feature-state", "clicked"], false],
                  [
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
                  "#fff"
              ],
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
              "text-color": ["step", ["get", "count"], "#ffffff", 2, "#000000"]
            }}
          />
          <Layer
            type="circle"
            id="unclustered-point"
            sourceId="pop"
            filter={["!", ["has", "count"]]}
            paint={{
              "circle-color": ["case",
                  ["boolean", ["feature-state", "clicked"], false],
                  "#fff",
                  "#9C27B0"
              ],
              "circle-radius": 9,
              "circle-stroke-width": 2,
              "circle-stroke-color": ["case",
                  ["boolean", ["feature-state", "clicked"], false],
                  "#9C27B0",
                  "#fff"
              ],
            }}
          />
          {/* {this.state.popup} */}
          <div className={`drawer ${this.state.drawerContent? "open": "" }`}>
              {this.state.drawerContent}
          </div>
          <div className="switch-view" onClick={this.onSwitchStyle}>
          {
            this.state.style === "streets" 
            ? <img src={SateliteImg} className="thumbnailStyle" alt="style" />
            : <img src={StreetImg} className="thumbnailStyle" alt="style" />
          }
          </div>
        </MapBox>
      </div>
    );
  }
}

const mapGeoHashToUniqId = {};
function getGeoHashUniqId(geoHash) { // NOT NICE AT ALL, TODO CHECK THE PERF HERE
  if(!mapGeoHashToUniqId.hasOwnProperty(geoHash)) {
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
  console.log("FOUND", arr.length);

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

  //const timeExec = window.performance.now() - before;
  //console.log(`toGeoJson ${timeExec} ms`);

  return geoJsonFormated;
}