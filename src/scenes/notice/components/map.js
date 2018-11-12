import React from "react";

import "./map.css";

export default class MapComponent extends React.Component {
  state = {
    center: null
  };

  map = null;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  getCenter = ()=> {
    let center = null;

    const {
      POP_COORDONNEES
    } = this.props.notice;

    if (
      POP_COORDONNEES &&
      POP_COORDONNEES.lat &&
      POP_COORDONNEES.lon
    ) {
      center = [POP_COORDONNEES.lat, POP_COORDONNEES.lon];
    }

    return center;
  }

  componentWillMount() {
    this.setState({center: this.getCenter()});
  }

  componentDidMount() {
    if(this.state.center) {
      mapboxgl.accessToken = "pk.eyJ1IjoiZ29mZmxlIiwiYSI6ImNpanBvcXNkMTAwODN2cGx4d2UydzM4bGYifQ.ep25-zsrkOpdm6W1CsQMOQ";
      this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9'
      });
      this.map.on('load', (e) => {

        this.map.resize();
        this.map.setZoom(11);
        this.map.setCenter({lng:this.state.center[1], lat:this.state.center[0]});
          
        this.map.addSource(
          'pop',
          {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  id: 0,
                  properties: {
                    id: 0,
                  },
                  geometry: {
                    type: "Point",
                    coordinates: [this.state.center[1], this.state.center[0]]
                  }
                }
              ]
            }
          }
        );
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
      });
    }
  }

  render() {
    if (!this.state.center) {
      return <div />;
    }

    const style = {
      width: "100%",
      height: "100%"
    };

    return (
      <div className="map-container">
        <div id="map" ref={this.mapRef} style={style}></div>
      </div>
    );
  }
}
