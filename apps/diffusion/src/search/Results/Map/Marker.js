export default class Marker {
  constructor(feature) {
    this._element = null;
    this._onClick = null;

    const mapboxgl = require("mapbox-gl");
    const value = feature.properties.count;

    let el = null;

    if (value > 1) {
      el = this._createClusterMarkerElement(feature);
    } else {
      el = this._createMarkerElement(feature);
    }

    el.addEventListener("click", () => {
      if (this._onClick) {
        this._onClick(feature.geometry.coordinates, feature.properties.hits[0]);
      }
    });

    this._element = new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates);
  }
  onClick(cb) {
    this._onClick = cb;
  }
  addTo(map) {
    this._element.addTo(map);
  }
  remove() {
    this._element.remove();
  }

  _createClusterMarkerElement(feature) {
    const value = feature.properties.count;
    let el = document.createElement("div");
    el.style.backgroundImage = "url(https://placekitten.com/g/40/40/)";
    el.className = "marker";
    let count = document.createElement("div");
    count.className = "count";
    let countText = document.createTextNode(value);
    count.appendChild(countText);
    el.appendChild(count);
    return el;
  }

  _createMarkerElement(feature) {
    const notice = feature.properties.hits[0];
    let el = document.createElement("div");
    if (notice._type === "merimee") {
      el.style.backgroundImage = `url("/static/merimee.jpg")`;
    } else if (notice._type === "palissy") {
      el.style.backgroundImage = `url("/static/palissy.jpg")`;
    } else if (notice._type === "joconde") {
      el.style.backgroundImage = `url("/static/joconde.jpg")`;
    } else {
      el.style.backgroundImage = "url(https://placekitten.com/g/40/40/)";
    }

    el.className = "marker-alone";
    // let count = document.createElement("div");
    // count.className = "popup";
    // let countText = document.createTextNode("OUVRE MOI");
    // count.appendChild(countText);
    // el.appendChild(count);
    return el;
  }
}
