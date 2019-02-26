import React from "react";
import { SelectedFilters } from "@appbaseio/reactivesearch";
import { MultiList } from "pop-shared";

import amplitudeService from "../services/amplitude";

const DEFAULT_FILTER = [
  "mainSearch",
  "domn",
  "deno",
  "periode",
  "image",
  "tech",
  "region",
  "departement",
  "commune",
  "base",
  "geolocalisation",
  "auteur",
  "ou",
  "import",
  "museo"
];

const Menu = ({ location, mobile_menu, closeMenu, view }) => (
  <div className={`search-filters ${mobile_menu}`}>
    <aside className="search-sidebar">
      <div className="close_mobile_menu" onClick={closeMenu}>
        x
      </div>
      <SelectedFilters
        className="selected-filters"
        clearAllLabel="Tout supprimer"
        title="Vos filtres"
      />
      <h4>Affiner par</h4>
      <MultiList
        dataField="BASE.keyword"
        title="Base"
        componentId="base"
        showSearch={false}
        react={{ and: DEFAULT_FILTER.filter(e => e !== "base") }}
        filterListItem={bucket =>
          bucket.key !== "Photographies (Mémoires)" &&
          bucket.key !== "Inventaire patrimoine mobilier (Palissy)"
        }
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", { dataField: "base", value });
        }}
        location={location}
      />
      <MultiList
        dataField={["AUTP.keyword", "AUTR.keyword"]}
        title="Auteur"
        componentId="auteur"
        react={{ and: DEFAULT_FILTER.filter(e => e !== "auteur") }}
        placeholder="Rechercher un auteur"
        location={location}
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", { dataField: "auteur", value });
        }}
        displayCount
      />
      <MultiList
        dataField="DOMN.keyword"
        title="Domaine"
        placeholder="Rechercher un domaine"
        componentId="domn"
        react={{ and: DEFAULT_FILTER.filter(e => e !== "domn") }}
        location={location}
        displayCount
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", { dataField: "domaine", value });
        }}
      />
      <MultiList
        dataField={["REG.keyword", "COM.keyword", "LOCA.keyword"]}
        title="Où voir l'oeuvre?"
        placeholder="Commune, musée"
        componentId="ou"
        react={{ and: DEFAULT_FILTER.filter(e => e !== "ou") }}
        location={location}
        displayCount
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", { dataField: "location", value });
        }}
      />
      <MultiList
        dataField="PERI.keyword"
        title="Période"
        componentId="periode"
        react={{ and: DEFAULT_FILTER.filter(e => e !== "periode") }}
        placeholder="Rechercher une période"
        location={location}
        displayCount
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", { dataField: "periode", value });
        }}
      />

      <MultiList
        dataField="CONTIENT_IMAGE.keyword"
        title="Contient une image"
        componentId="image"
        placeholder="oui ou non"
        showSearch={false}
        location={location}
        displayCount
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", { dataField: "contient_image", value });
        }}
      />
      <MultiList
        componentId="geolocalisation"
        dataField="POP_CONTIENT_GEOLOCALISATION.keyword"
        title="Est géolocalisé"
        filterLabel="Est géolocalisé"
        queryFormat="or"
        className="filters"
        showSearch={false}
        URLParams={true}
        data={[{ label: "oui", value: "oui" }, { label: "non", value: "non" }]}
        location={location}
        displayCount
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", {
            dataField: "contient_geolocalisation",
            value
          });
        }}
      />
      <MultiList
        dataField="TECH.keyword"
        title="Techniques"
        componentId="tech"
        react={{ and: DEFAULT_FILTER.filter(e => e !== "tech") }}
        placeholder="Rechercher une technique"
        location={location}
        displayCount
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", {
            dataField: "technique",
            value
          });
        }}
      />
      <MultiList
        show={false}
        componentId="import"
        dataField="POP_IMPORT.keyword"
        title="Import"
        URLParams={true}
        react={{ and: DEFAULT_FILTER.filter(e => e !== "import") }}
        location={location}
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", {
            dataField: "import",
            value
          });
        }}
      />
      <MultiList
        show={false}
        componentId="museo"
        dataField="MUSEO.keyword"
        title="Museo"
        URLParams={true}
        react={{ and: DEFAULT_FILTER.filter(e => e !== "museo") }}
        location={location}
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", {
            dataField: "museo",
            value
          });
        }}
      />
    </aside>
  </div>
);

export default Menu;
