import React from "react";
import { SelectedFilters } from "@appbaseio/reactivesearch";
import { MultiList } from "../../../shared/dist";
import { pushSearchRoute } from "../services/url";
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
        URLParams={false}
        react={{ and: DEFAULT_FILTER.filter(e => e !== "base") }}
        filterListItem={bucket =>
          bucket.key !== "Photographies (Mémoires)" &&
          bucket.key !== "Inventaire patrimoine mobilier (Palissy)"
        }
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", { dataField: "base", value });
          pushSearchRoute({ mode: "simple", view, params: { base: value } });
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
        URLParams={false}
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", { dataField: "auteur", value });
          pushSearchRoute({ mode: "simple", view, params: { base: value } });
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
        URLParams={false}
        displayCount
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", { dataField: "domaine", value });
          pushSearchRoute({ mode: "simple", view, params: { base: value } });
        }}
      />
      <MultiList
        dataField={["REG.keyword", "COM.keyword", "LOCA.keyword"]}
        title="Où voir l'oeuvre?"
        placeholder="Commune, musée"
        componentId="ou"
        react={{ and: DEFAULT_FILTER.filter(e => e !== "ou") }}
        location={location}
        URLParams={false}
        displayCount
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", { dataField: "location", value });
          pushSearchRoute({ mode: "simple", view, params: { base: value } });
        }}
      />
      <MultiList
        dataField="PERI.keyword"
        title="Période"
        componentId="periode"
        react={{ and: DEFAULT_FILTER.filter(e => e !== "periode") }}
        placeholder="Rechercher une période"
        location={location}
        URLParams={false}
        displayCount
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", { dataField: "periode", value });
          pushSearchRoute({ mode: "simple", view, params: { base: value } });
        }}
      />

      <MultiList
        dataField="CONTIENT_IMAGE.keyword"
        title="Contient une image"
        componentId="image"
        placeholder="oui ou non"
        showSearch={false}
        location={location}
        URLParams={false}
        displayCount
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", { dataField: "contient_image", value });
          pushSearchRoute({ mode: "simple", view, params: { base: value } });
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
        URLParams={false}
        data={[{ label: "oui", value: "oui" }, { label: "non", value: "non" }]}
        location={location}
        displayCount
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", {
            dataField: "contient_geolocalisation",
            value
          });
          pushSearchRoute({ mode: "simple", view, params: { base: value } });
        }}
      />
      <MultiList
        dataField="TECH.keyword"
        title="Techniques"
        componentId="tech"
        react={{ and: DEFAULT_FILTER.filter(e => e !== "tech") }}
        placeholder="Rechercher une technique"
        location={location}
        URLParams={false}
        displayCount
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", {
            dataField: "technique",
            value
          });
          pushSearchRoute({ mode: "simple", view, params: { base: value } });
        }}
      />
      <MultiList
        show={false}
        componentId="import"
        dataField="POP_IMPORT.keyword"
        title="Import"
        URLParams={false}
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
        URLParams={false}
        react={{ and: DEFAULT_FILTER.filter(e => e !== "museo") }}
        location={location}
        onChange={value => {
          amplitudeService.logEvent("search_filter_change", {
            dataField: "museo",
            value
          });
          pushSearchRoute({ mode: "simple", view, params: { base: value } });
        }}
      />
    </aside>
  </div>
);

export default Menu;
