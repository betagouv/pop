export default class Marker {
  constructor(feature, color = "#007bff") {
    const mapboxgl = require("mapbox-gl");

    this._element = null;
    this._onClick = null;
    this._type = null;
    this._coordinates = null;
    this._hit = null;

    const value = feature.properties.count;
    let el = null;

    this._hits = feature.properties.hits;
    this._coordinates = feature.geometry.coordinates;

    if (value > 1) {
      this._type = "cluster";
      el = createClusterMarkerElement(feature, color);
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
  getHits() {
    return this._hits;
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

function createClusterMarkerElement(feature, color) {
  const value = feature.properties.count;
  let el = document.createElement("div");
  // el.style.backgroundImage = "url(https://placekitten.com/g/40/40/)";
  el.style.backgroundColor = color;
  el.className = "marker-cluster";
  if (value > 100000) {
    el.style.width = el.style.height = "80px";
  } else if (value > 50000) {
    el.style.width = el.style.height = "70px";
  } else if (value > 10000) {
    el.style.width = el.style.height = "60px";
  } else if (value > 5000) {
    el.style.width = el.style.height = "55px";
  }
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
  if (notice._type === "joconde") {
    el.style.backgroundImage = `url("/static/musee-de-france.png")`;
  } else if (notice._source.PRODUCTEUR === "CRMH" || notice._source.PRODUCTEUR === "Monuments Historiques") {
    el.style.backgroundImage = `url("/static/mh.jpg")`;
  } else if (notice._source.PRODUCTEUR === "Inventaire") {
    el.style.backgroundImage = `url("/static/inventaire.jpg")`;
  } else {
    el.style.backgroundImage = "url(https://placekitten.com/g/40/40/)";
  }

  el.className = "marker-notice";
  return el;
}
