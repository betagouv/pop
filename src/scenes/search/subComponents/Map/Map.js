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


export default ({ filter }) => (
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
    customClusterMarker={(coordinates, pointCount) => {
      const color = {
        rouge: "#ff6347",
        orange: "#ffae47",
        jaune: "#fffb47",
        vertDense: "#39ea4b",
        vert: "#c8ff47",
        bleu: "#43ccf1",
        purple: "#db43f1"
      };
      return (
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          key="content"
        >
          <circle
            className="circle first-circle"
            fill={
              pointCount < 10
                ? color.vertDense
                : pointCount < 100
                  ? color.jaune
                  : pointCount < 1000
                    ? color.orange
                    : color.rouge
            }
            cx="16"
            cy="16"
            r="16"
          />
          {pointCount < 10 ? (
            <text x="13" y="19" fill="white">
              {pointCount}
            </text>
          ) : pointCount < 100 ? (
            <text x="10" y="19" fill="black">
              {pointCount}
            </text>
          ) : pointCount < 1000 ? (
            <text x="6" y="19" fill="white">
              {pointCount}
            </text>
          ) : (
            <text x="2" y="19" fill="white">
              {pointCount}
            </text>
          )}
        </svg>
      );
    }}
    customMarker={(item, markerProps) => {
      let pin = bases[0].pin;
      if (item && markerProps) {
        for (let i = 0; i < bases.length; i++) {
          if (item.BASE === bases[i].value) {
            pin = bases[i].pin;
          }
        }
      }
      return <img src={pin} width="24px" />;
    }}
    onResultStats={(total, took) => {
      if (total === 1) {
        return `1 résultat trouvé en ${took} ms.`;
      }
      return `${total} résultats trouvés en ${took} ms.`;
    }}
    showResultStats
    onStyleLoad={
      (map, evt)=>{
        map.resize();
      }
    }
    containerStyle={{
      height: '100vh'
    }}
  />
);
