export default class Marker {
  constructor(feature) {
    const mapboxgl = require("mapbox-gl");

    this._element = null;
    this._onClick = null;
    this._type = null;
    this._coordinates = null;
    this._hit = null;

    const value = feature.properties.count;
    let el = null;

    this._hit = feature.properties.hits[0];
    this._coordinates = feature.geometry.coordinates;

    if (value > 1) {
      this._type = "cluster";
      el = createClusterMarkerElement(feature);
    } else {
      this._type = "notice";
      el = createMarkerElement(feature);
    }
    el.addEventListener("click", e => {
      e.stopPropagation();
      if (this._onClick) {
        this._onClick(this);
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
  getHit() {
    return this._hit;
  }
  getCoordinates() {
    return this._coordinates;
  }
  select() {
    this._element.getElement().className += " marker-active";
  }
  unselect() {
    this._element.getElement().className = this._element
      .getElement()
      .className.replace(" marker-active", "");
  }
}

function createClusterMarkerElement(feature) {
  const value = feature.properties.count;
  let el = document.createElement("div");
  // el.style.backgroundImage = "url(https://placekitten.com/g/40/40/)";
  el.style.backgroundColor = "#007bff";
  el.className = "marker-cluster";
  let count = document.createElement("div");
  count.className = "count";
  let countText = document.createTextNode(value);
  count.appendChild(countText);
  el.appendChild(count);
  return el;
}

function createMarkerElement(feature) {
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

  el.className = "marker-notice";
  return el;
}
