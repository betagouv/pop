import { bucket_url } from "../../../config";

import { getNoticeInfo } from "../../../utils";

export default class Marker {
  constructor(feature, color = "#007bff") {
    const mapboxgl = require("mapbox-gl");

    this._element = null;
    this._onClick = null;
    this._type = null;
    this._coordinates = null;
    this._hit = null;
    this._isSelected = false;

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
    this._isSelected = true;
    this._element.getElement().className += " marker-active";
  }
  unselect() {
    this._isSelected = false;
    this._element.getElement().className = this._element
      .getElement()
      .className.replace(" marker-active", "");
  }
}

function createClusterMarkerElement(feature, color) {
  const value = feature.properties.count;
  let el = document.createElement("div");
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

  const { image_preview, logo } = getNoticeInfo(notice._source);

  let backgroundImage = "";
  if (image_preview === "/static/noimage.png") {
    backgroundImage = logo;
  } else {
    backgroundImage = image_preview;
  }

  el.style.backgroundImage = `url("${backgroundImage}")`;
  el.className = "marker-notice";
  return el;
}
