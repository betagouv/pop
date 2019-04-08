import React from "react";
import { SelectedFilters } from "@appbaseio/reactivesearch";
import { MultiList } from "pop-shared";

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
  "museo",
  "ref"
];

const Menu = ({ location, closeMenu }) => (
  <aside className="search-filters-sidebar">
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
      location={location}
      onOpen={() => amplitude.getInstance().logEvent("search_filter_open", { dataField: "base" })}
      onClose={() => amplitude.getInstance().logEvent("search_filter_close", { dataField: "base" })}
      onChange={value =>
        amplitude.getInstance().logEvent("search_filter_change", { dataField: "base", value })
      }
    />
    <MultiList
      dataField={["AUTP.keyword", "AUTR.keyword"]}
      title="Auteur"
      componentId="auteur"
      react={{ and: DEFAULT_FILTER.filter(e => e !== "auteur") }}
      placeholder="Rechercher un auteur"
      location={location}
      displayCount
      onOpen={() => amplitude.getInstance().logEvent("search_filter_open", { dataField: "auteur" })}
      onClose={() =>
        amplitude.getInstance().logEvent("search_filter_close", { dataField: "auteur" })
      }
      onChange={value =>
        amplitude.getInstance().logEvent("search_filter_change", { dataField: "auteur", value })
      }
    />
    <MultiList
      dataField={["DOMN.keyword", "CATE.keyword"]}
      title="Domaine"
      placeholder="Rechercher un domaine"
      componentId="domn"
      react={{ and: DEFAULT_FILTER.filter(e => e !== "domn") }}
      location={location}
      displayCount
      onOpen={() =>
        amplitude.getInstance().logEvent("search_filter_open", { dataField: "domaine" })
      }
      onClose={() =>
        amplitude.getInstance().logEvent("search_filter_close", { dataField: "domaine" })
      }
      onChange={value =>
        amplitude.getInstance().logEvent("search_filter_change", { dataField: "domaine", value })
      }
    />
    <MultiList
      dataField={["REG.keyword", "COM.keyword", "LOCA.keyword"]}
      title="Où voir l'oeuvre?"
      placeholder="Commune, musée"
      componentId="ou"
      react={{ and: DEFAULT_FILTER.filter(e => e !== "ou") }}
      location={location}
      displayCount
      onOpen={() =>
        amplitude.getInstance().logEvent("search_filter_open", { dataField: "ouvoirloeuvre" })
      }
      onClose={() =>
        amplitude.getInstance().logEvent("search_filter_close", { dataField: "ouvoirloeuvre" })
      }
      onChange={value =>
        amplitude
          .getInstance()
          .logEvent("search_filter_change", { dataField: "ouvoirloeuvre", value })
      }
    />
    <MultiList
      dataField="PERI.keyword"
      title="Période"
      componentId="periode"
      react={{ and: DEFAULT_FILTER.filter(e => e !== "periode") }}
      placeholder="Rechercher une période"
      location={location}
      displayCount
      onOpen={() =>
        amplitude.getInstance().logEvent("search_filter_open", { dataField: "periode" })
      }
      onClose={() =>
        amplitude.getInstance().logEvent("search_filter_close", { dataField: "periode" })
      }
      onChange={value =>
        amplitude.getInstance().logEvent("search_filter_change", { dataField: "periode", value })
      }
    />

    <MultiList
      dataField="CONTIENT_IMAGE.keyword"
      title="Contient une image"
      componentId="image"
      placeholder="oui ou non"
      showSearch={false}
      location={location}
      displayCount
      onOpen={() => amplitude.getInstance().logEvent("search_filter_open", { dataField: "image" })}
      onClose={() =>
        amplitude.getInstance().logEvent("search_filter_close", { dataField: "image" })
      }
      onChange={value =>
        amplitude.getInstance().logEvent("search_filter_change", { dataField: "image", value })
      }
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
      onOpen={() =>
        amplitude.getInstance().logEvent("search_filter_open", { dataField: "estgeolocalise" })
      }
      onClose={() =>
        amplitude.getInstance().logEvent("search_filter_close", { dataField: "estgeolocalise" })
      }
      onChange={value =>
        amplitude
          .getInstance()
          .logEvent("search_filter_change", { dataField: "estgeolocalise", value })
      }
    />
    <MultiList
      dataField="TECH.keyword"
      title="Techniques"
      componentId="tech"
      react={{ and: DEFAULT_FILTER.filter(e => e !== "tech") }}
      placeholder="Rechercher une technique"
      location={location}
      displayCount
      onOpen={() =>
        amplitude.getInstance().logEvent("search_filter_open", { dataField: "techniques" })
      }
      onClose={() =>
        amplitude.getInstance().logEvent("search_filter_close", { dataField: "techniques" })
      }
      onChange={value =>
        amplitude.getInstance().logEvent("search_filter_change", { dataField: "techniques", value })
      }
    />
    <MultiList
      show={false}
      componentId="import"
      dataField="POP_IMPORT.keyword"
      title="Import"
      URLParams={true}
      react={{ and: DEFAULT_FILTER.filter(e => e !== "import") }}
      location={location}
    />
    <MultiList
      show={false}
      componentId="museo"
      dataField="MUSEO.keyword"
      title="Museo"
      URLParams={true}
      react={{ and: DEFAULT_FILTER.filter(e => e !== "museo") }}
      location={location}
    />
    <MultiList
      show={false}
      componentId="ref"
      dataField="REF.keyword"
      title="Référence"
      URLParams={true}
      react={{ and: DEFAULT_FILTER.filter(e => e !== "ref") }}
      location={location}
    />
  </aside>
);

export default Menu;
