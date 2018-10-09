import React from "react";
import { ReactiveMap } from "reactivemaps-tmp-mapbox";
import CardMap from "./CardMap";
import MarkerIcon from "../../../../assets/marker-circle.png";

import "./mapbox-gl.css";

const bases = [
  {
    label: "Photographies (Mémoire)",
    value: "Photographies (Mémoires)",
    pin:
      "https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,FF6347&scale=2.0"
  },
  {
    label: "Patrimoine mobilier (Palissy)",
    value: "Patrimoine mobilier (Palissy)",
    pin:
      "https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,FFAE47&scale=2.0"
  },
  {
    label: "Collections des musées de France (Joconde)",
    value: "Collections des musées de France (Joconde)",
    pin:
      "https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,39EA4B&scale=2.0"
  },
  {
    label: "Patrimoine architectural (Mérimée)",
    value: "Patrimoine architectural (Mérimée)",
    pin:
      "https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-container-bg_4x.png,icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1499-shape_circle_4x.png&highlight=ff000000,9C27B0&scale=2.0"
  },
  {
    label: "Oeuvres spoliées (MNR Rose-Valland)",
    value: "Oeuvres spoliées (MNR Rose-Valland)",
    pin:
      "https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,43CCF1&scale=2.0"
  }
];

const markerImage = new Image();
markerImage.src = MarkerIcon;
markerImage.alt = "alt";
markerImage.width = 24;
markerImage.height = 24;

const boundsInfo = (map, evt) => {
  const mapBounds = map.getBounds();

  return {
    zoom: map.getZoom(),
    bounds: mapBounds,
    north: mapBounds._ne.lat,
    south: mapBounds._sw.lat,
    east: mapBounds._ne.lng,
    west: mapBounds._sw.lng
  };
};

export default ({ filter, onChanged }) => (
  <ReactiveMap
    defaultZoom={5.15}
    componentId="map"
    className="map"
    dataField="POP_COORDONNEES"
    react={{
      and: filter
    }}
    size={8000}
    onPopoverClick={(item, closePopup) => {
      return <CardMap className="" key={item.REF} data={item} />;
    }}
    autoClosePopover
    showSearchAsMove
    markerIcon={markerImage}
    onResultStats={(total, took) => {
      if (total === 1) {
        return `1 résultat trouvé en ${took} ms.`;
      }
      return `${total} résultats trouvés en ${took} ms.`;
    }}
    showResultStats
    onStyleLoad={(map, evt) => {
      map.resize();
    }}
    mapBoxProps={{
      onZoom: (map, evt) => onChanged(boundsInfo(map, evt))
    }}
    onDragEnd={(map, evt) => {}}
    onZoomEnd={(map, evt) => {}}
    containerStyle={{
      height: "100vh"
    }}
  />
);
