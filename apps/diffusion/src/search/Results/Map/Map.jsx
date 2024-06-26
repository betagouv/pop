import React from "react";
import Loader from "../../../components/Loader";
import Drawer from "./Drawer";
import Location from "./Location";
import Marker from "./Marker";
import { getPrecision, toGeoJson } from "./utils";

export default class MapComponent extends React.Component {
	state = {
		loaded: false,
		popup: null,
		drawerContent: null,
		selectedMarker: null,
		selectedPositionMarker: null,
	};

	mapRef = null;
	map = null;
	markers = {};

	constructor(props) {
		super(props);
		this.mapRef = React.createRef();
		this.reload = this.reload.bind(this);
	}

	async loadMap() {
		const maplibre = require("maplibre-gl");
		this.map = new maplibre.Map({
			container: "map",
			style: "https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json",
			attributionControl: {
				compact: true,
				customAttribution: ["OpenStreetMap", "Etalab", "MapLibre"],
			},
		});

		const handleMapLoad = () => {
			this.mapInitialPosition(this.map);
			this.setState({ loaded: true });
			this.updateQuery();
		};
		this.map.on("load", handleMapLoad);

		const handleMapMoveend = () => {
			if (this.state.loaded) {
				this.updateQuery();
			}
		};
		this.map.on("moveend", handleMapMoveend);

		const handleMapClick = () => {
			this.selectMarker(null);
		};
		this.map.on("click", handleMapClick);

		this.map.addControl(new maplibre.NavigationControl());

		const handleMapError = (event) => {
			if (event.error && event.error.status === 401) {
				this.setState({ loaded: false }, () => {
					this.map.off("load", handleMapLoad);
					this.map.off("moveend", handleMapMoveend);
					this.map.off("click", handleMapClick);
					this.map.off("error", handleMapError);
					this.loadMap();
				});
			}
		};
		this.map.on("error", handleMapError);
	}

	reload() {
		this.setState({ loaded: false }, () => {
			this.loadMap();
		});
	}

	componentDidMount() {
		this.loadMap();
	}

	updateQuery() {
		const mapBounds = this.map.getBounds();
		const currentZoom = this.map.getZoom();
		const precision = getPrecision(currentZoom);

		this.props.onChange(
			mapBounds._ne.lat,
			mapBounds._sw.lng,
			mapBounds._sw.lat,
			mapBounds._ne.lng,
			precision,
		);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.map) {
			return;
		}

		if (!nextProps.aggregations) {
			return;
		}

		if (!this.props.aggregations) {
			this.renderMarkers(nextProps);
			return;
		}

		// This is call 6 times per changement
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
				e.top_hits.hits.hits[0]._id ===
					prevBuckets[i].top_hits.hits.hits[0]._id
			);
		});

		if (shouldnotrefresh) {
			return;
		}

		this.renderMarkers(nextProps);
	}

	setPosition(position, zoom = 13, showMarker = true) {
		const maplibre = require("maplibre-gl");
		if (this.state.selectedPositionMarker) {
			this.state.selectedPositionMarker.remove();
		}
		if (position && showMarker) {
			const marker = new maplibre.Marker();
			marker.setLngLat(position);
			this.setState({ selectedPositionMarker: marker });
			marker.addTo(this.map);
		}

		if (position) {
			this.map.flyTo({
				center: position,
				zoom,
			});
		}
	}

	selectMarker(marker) {
		if (this.state.selectedMarker && this.state.selectedMarker !== marker) {
			this.state.selectedMarker.unselect();
		}
		if (marker) {
			marker.select();
		}
		this.setState({ selectedMarker: marker });
	}

	renderMarkers(props) {
		const removeList = { ...this.markers };
		const newMarkers = {};

		if (props.aggregations) {
			const geojson = toGeoJson(props.aggregations.france.buckets);

			for (const feature of geojson.features) {
				const key = feature.properties.id;
				// If the marker is a single notice, always the same, then we do not rebuild it
				if (
					this.markers[key] &&
					this.markers[key]._type === "notice" &&
					this.markers[key].getHits()[0]._source.REF ===
						feature.properties.hits[0]._source.REF
				) {
					delete removeList[key];
					return;
				}
				const zoom = Math.min(this.map.getZoom() + 1, 24);

				const marker = new Marker(
					feature,
					zoom >= 15 ? "#fc5e2a" : "#007bff",
				);

				marker.onClick((marker) => {
					let zoom = this.map.getZoom();

					if (marker._type === "cluster") {
						zoom++;
					}

					const center = marker.getCoordinates();
					this.map.flyTo({ center, zoom: Math.min(zoom, 24) });
					if (zoom >= 15 || marker._type === "notice") {
						this.selectMarker(marker);
					}
				});

				newMarkers[key] = marker;
			}
		}

		for (const key in removeList) {
			if (!this.markers[key]._isSelected) {
				this.markers[key].remove();
				delete this.markers[key];
			}
		}

		for (const key in newMarkers) {
			newMarkers[key].addTo(this.map);
			this.markers[key] = newMarkers[key];
		}
	}

	mapInitialPosition = (map) => {
		if (map) {
			map.resize();
			map.setZoom(5);
			map.setCenter({ lng: 2.515597, lat: 46.856731 });
		}
	};

	render() {
		return (
			<div
				style={{ width: "100%", height: "600px" }}
				className="search-map view"
			>
				<Location
					ready={this.state.loaded}
					map={this.map}
					setPosition={this.setPosition.bind(this)}
					onReload={this.reload}
				/>
				<Drawer
					notices={
						this.state.selectedMarker
							? this.state.selectedMarker.getHits()
							: null
					}
					onClose={() => {
						this.selectMarker(null);
					}}
				/>
				<Loader isOpen={!this.state.loaded} />
				<div
					id="map"
					ref={this.mapRef}
					style={{ width: "100%", height: "600px" }}
				></div>
				<style jsx global>{`
          .search-map .switch-view {
            width: 60px;
            height: 60px;
            z-index: 1;
            margin-right: 45px;
            margin-top: 10px;
            position: absolute;
            right: 0;
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 4px 0 rgba(189, 189, 189, 0.5);
            transition: 0.3s;
          }

          .drawer {
            background-color: white;
            z-index: 3;
            position: absolute;
            right: 15px;
            height: 600px;
            width: 295px;
            display: flex;
            flex-direction: column;
            box-shadow: -3px 0 5px rgba(0, 0, 0, 0.1);
          }

          .drawer .drawer-content {
            overflow-y: auto;
            overflow-x: hidden;
          }

          .drawer-title {
            text-align: center;
            font-weight: 700;
            font-size: 13px;
            color: #19414c;
            margin-bottom: 20px;
            padding: 5px;
          }

          .drawer .mini {
            margin: 10px;
            box-shadow: -3px 0 5px rgba(0, 0, 0, 0.1);
            border: 1px solid #d7d3d3;
            border-radius: 5px;
            cursor: pointer;
          }

          .drawer .legend {
            padding: 2px;
            text-align: center;
            font-size: 12px;
            padding-bottom: 0px;
          }
          .drawer .mini .img-col {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .drawer .drawer-title-mini {
            font-size: 13px;
            color: #19414c;
            padding: 5px;
          }

          .drawer img {
            object-fit: contain;
            width: 100%;
          }
          .drawer .service-icon {
            width: 60px;
          }

          .drawer p {
            font-size: 14px;
          }

          .drawer .drawer-back {
            margin-right: 5px;
            text-align: right;
            margin-bottom: 5px;
            cursor: pointer;
            font-size: 13px;
          }
          .drawer a {
            background-color: #377d87;
            border: 0;
            color: #fff;
            padding: 5px;
            display: block;
            text-align: center;
            font-size: 14px;
            margin-left: 20px;
            margin-right: 20px;
            box-shadow: 1px 2px 2px 0 rgba(197, 197, 197, 0.5);
            border: 1px solid #d7d3d3;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 15px;
            margin-bottom: 15px;
          }

          .drawer .description {
            font-family: "Open Sans", sans-serif;
            margin: 10px;
          }

          .location {
            background: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 -1px 0px rgba(0, 0, 0, 0.02);
            border: none;
            display: flex;
            border-radius: 3px;
            padding: 0px 4px 0px 0px;
            background-size: contain;
            align-items: center;
            justify-content: space-between;
            z-index: 3;
            position: absolute;
            margin: 7px;
          }

          .location .mapboxgl-ctrl-geocoder {
            box-shadow: none;
            font-size: 14px;
            width: 300px;
          }
          .location input {
            border: none;
          }
          .location input:focus {
            outline: none;
          }

          .location .location-search-icon {
            background-image: url(/static/Search-48.png);
            float: left;
            width: 40px;
            height: 40px;
            background-repeat: no-repeat;
            cursor: pointer;
            border-right: lightgray;
            border-right-style: solid;
            border-right-width: 1px;
            padding-right: 42px;
          }

          .location .location-target-icon {
            background-image: url(/static/Target-128.png);
            float: left;
            width: 40px;
            height: 40px;
            background-repeat: no-repeat;
            background-position: center;
            cursor: pointer;
            background-size: contain;
          }

          .location .location-search-results {
            position: absolute;
            background-color: white;
            top: 50px;
            width: 280px;
            height: 120px;
            corner-radius: 5px;
            padding-left: 2px;
            padding-right: 2px;
            overflow-y: scroll;
          }
          
          .location .location-search-results .location-search-results-result {
            background: none;
            border: none;
            padding: 0;
            font: inherit;
            outline: inherit;
            cursor: pointer;
            color: black;
            width: 100%;
            text-align: left;
          }

          .location .location-search-results .location-search-results-result:hover {
            background: #f2f2f2;
          }

          .location .location-home-icon {
            background-image: url(/static/House-128.png);
            width: 40px;
            height: 40px;
            background-repeat: no-repeat;
            background-position: center;
            cursor: pointer;
            background-size: contain;
          }

          .location #query-input {
            width: 200px;
            font-size: 12px;
            padding-left: 4px;
            padding-right: 4px;
          }

          .marker-cluster {
            display: block;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            padding: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            will-change: transform;
            border: 2px white solid;
            box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
          }

          .marker-cluster:hover {
            top: 0;
            left: 0;
            width: 90px !important;
            height: 90px !important;
            z-index: 2;
            transition: width 0.25s, height 0.25s;
          }

          .marker-cluster .count {
            background-color: white;
            border-radius: 5px;
            position: absolute;
            right: -5px;
            top: -5px;
            padding: 3px 5px 3px 4px;
            line-height: 11px;
            font-size: 13px;
            font-weight: 600;
          }

          .marker-notice {
            display: block;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            padding: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            height: 60px;
            will-change: transform;
            border: 2px white solid;
            box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
            background-position: center;
            background-size: 60px;
          }

          .marker-notice .popup {
            /* visibility: hidden; */
            background-color: white;
            top: -75px;
            border-radius: 5px;
            position: absolute;
            right: -5px;
            padding: 3px 5px 3px 4px;
            line-height: 11px;
            font-size: 13px;
            height: 70px;
            font-weight: 600;
          }

          .marker-notice:hover {
            left: 0;
            top: 0;
            z-index: 2;
            width: 100px;
            height: 100px;
            background-size: 100px;
            transition: width 0.25s, height 0.25s;
          }

          .mapboxgl-marker {
            background-repeat: repeat-x;
            background-size: cover;
          }

          .marker-active {
            border-color: #377d87;
            left: 0;
            top: 0;
            z-index: 2;
            width: 100px;
            height: 100px;
            background-size: 100px;
            transition: width 0.25s, height 0.25s;
          }

          .marker-notice:hover {
            left: 0;
            top: 0;
            z-index: 2;
            width: 100px;
            height: 100px;
            background-size: 100px;
            transition: width 0.25s, height 0.25s;
          }

          .search-map .thumbnailStyle {
            width: 52px;
            height: 52px;
            margin: 4px;
          }

          .search-map .loader-container {
            position: absolute;
            z-index: 5;
            width: 98%;
            height: 600px;
            background: #00000082;
            padding: 0;
          }
        `}</style>
			</div>
		);
	}
}
