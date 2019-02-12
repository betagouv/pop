import React from "react";
import { ReactiveList } from "@appbaseio/reactivesearch";

import CardList from "./CardList";

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

export default ({}) => (
  <ReactiveList
    componentId="results"
    react={{ and: DEFAULT_FILTER }}
    onResultStats={(total, took) => {
      if (total === 1) {
        return <div className="result-count">1 résultat</div>;
      }
      return <div className="result-count">{`${total} résultats`}</div>;
    }}
    dataField="hey"
    onNoResults="Aucun résultat trouvé."
    loader="Préparation de l'affichage des résultats..."
    URLParams={true}
    size={20}
    className="list-view"
    onData={data => <CardList className="" key={data.REF} data={data} />}
    // pagination={true}
    //
  />
);
