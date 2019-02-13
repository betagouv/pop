import React from "react";
import { ReactiveList } from "@appbaseio/reactivesearch";

import CardList from "./CardList";

export default ({ filters }) => (
  <ReactiveList
    componentId="results"
    react={{ and: filters }}
    onResultStats={(total, took) => {
      if (total === 1) {
        return <div className="result-count">1 résultat</div>;
      }
      return <div className="result-count">{`${total} résultats`}</div>;
    }}
    dataField=""
    onNoResults="Aucun résultat trouvé."
    loader="Préparation de l'affichage des résultats..."
    size={20}
    className="list-view"
    onData={data => <CardList className="" key={data.REF} data={data} />}
    // pagination={true}
    //
  />
);
