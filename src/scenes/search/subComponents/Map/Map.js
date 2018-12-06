import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import nGeoHash from "ngeohash";
import queryString from "query-string";
import Loader from "../../../../components/loader";

import CardMap from "./CardMap";

import LinkedNotices from './subComponents/LinkedNotices';
import SingleNotice from './subComponents/SingleNotice';

import SateliteImg from '../../../../assets/Satelite.png';
import StreetImg from '../../../../assets/street.png';

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

const idCounter = {}
const uniqueId = (prefix='$lodash$') => {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0
  }

  const id =++idCounter[prefix]
  if (prefix === '$lodash$') {
    return `${id}`
  }

  return `${prefix + id}`
}

export default class Umbrella extends React.Component {
  state = {
    query: {},
    isNewSearch: false
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
      if(location) {
        this.urlLocation = location.search;
      } 
    } catch (error) {
      if(this.props.location) { // If window.location not defined use props
        this.urlLocation = this.props.location.search;
      } else {
        throw new Error("location is not defined");
      }
    }
    const parsed = queryString.parse(this.urlLocation);
    const nextSearch = JSON.stringify(parsed);
    if(this.currentSearch !== nextSearch) { // New Search
      this.currentSearch = nextSearch;
      this.setState({ isNewSearch: true });
    } else if(this.state.isNewSearch) {
      this.setState({ isNewSearch: false });
    }
  }

  onMapChange(boxZoomBounds) {
    //console.log(boxZoomBounds.zoom)
    console.log(boxZoomBounds.zoom)
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
        <Map onChange={this.onMapChange} isNewSearch={this.state.isNewSearch} />
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
  map = null;

  styleChanged = false;

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
      if (!should && this.state.drawerContent !== nextState.drawerContent) should = true;
      if (!should && this.props.isNewSearch !== nextProps.isNewSearch) should = true;
      return should;
    }
    return true;
  }

  addSourceAndLayers = ()=>{
    this.map.addSource(
      'pop',
      {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      }
    );
    this.map.addLayer({
        "id": "clusters",
        "type": "circle",
        "source": "pop",
        filter: ["has", "count"],
        "paint": {
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
        },
        paint: {
          "text-color": ["step", ["get", "count"], "#ffffff", 2, "#000000"]
        }
    });

    this.map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "pop",
        filter: ["!", ["has", "count"]],
        paint: {
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
        }
    });

    setTimeout(
      ()=>{
        this.setState({ loaded: true });
        this.styleChanged = false;
      },
      1000
    )
  };

  componentDidMount() {
    mapboxgl.accessToken = "pk.eyJ1IjoiZ29mZmxlIiwiYSI6ImNpanBvcXNkMTAwODN2cGx4d2UydzM4bGYifQ.ep25-zsrkOpdm6W1CsQMOQ";
    this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9'
    });

    this.map.on('styledata', (e) => {
      if(this.styleChanged) {
        setTimeout(
          ()=>{
            if(this.map.getLayer("clusters")) {
              this.map.removeLayer('clusters');
            }
            if(this.map.getLayer("cluster-count")) {
              this.map.removeLayer('cluster-count');
            }
            if(this.map.getLayer("unclustered-point")) {
              this.map.removeLayer('unclustered-point');
            }
            if(this.map.getSource("pop")) {
              this.map.removeSource('pop');
            }
            this.addSourceAndLayers();
            this.renderClusters();
          },
          500
        )
      }
    });

    this.map.on('load', (e) => {
        this.mapInitialPosition(this.map);
        this.addSourceAndLayers();
    });

    this.map.on('click', 'clusters', (e) => {
      this.onPointClicked(e, 'clusters');
    });

    this.map.on('click', 'unclustered-point', (e) => {
      this.onPointClicked(e, 'unclustered-point');
    });

    this.map.on("mouseenter", "unclustered-point", () => {
      this.map.getCanvas().style.cursor = "pointer";
    });
    this.map.on("mouseleave", "unclustered-point", () => {
      this.map.getCanvas().style.cursor = "";
    });

    this.map.on("moveend", () => {
      this.onMoveEnd(this.map);
    });

  }

  componentDidUpdate(prevProps) {
    if(this.props.isNewSearch && !prevProps.isNewSearch) {
      if(this.state.drawerContent) {
        this.setState({ drawerContent: null });
      }
      this.mapInitialPosition(this.map);
    }
    this.renderClusters();
  }

  onMoveEnd(map) {
    if(this.state.loaded) {
      const mapBounds = map.getBounds();
      const currentZoom = map.getZoom();

      this.setState({
        popup: null,
      });

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
    this.setState({ loaded: false });
    this.styleChanged = true;
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
          <LinkedNotices links={hits} onClose={this.closeDrawer} />
        );
      } else if(layerType === 'unclustered-point') {
        const itemId = features[0].properties.id;
        const hits = JSON.parse(features[0].properties.hits);
        const item = {...hits[0], ...hits[0]._source};
        drawerContent = (
          <SingleNotice className="" key={item.REF} data={item} onClose={this.closeDrawer}/>
        );
      }

      this.setState({ drawerContent });
    }
  }

  closeDrawer = ()=>{
    console.log('close')
    this.setState({ drawerContent: null });
  }

  mapInitialPosition = (map)=> {
    if(map) {
      map.resize();
      map.setZoom(5);
      map.setCenter({lng:2.515597, lat:46.856731});
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
        <div id="map" ref={this.mapRef} style={style}>
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
        </div>
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