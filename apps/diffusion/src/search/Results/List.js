import React from "react";
import { Results } from "react-elasticsearch";
import { pagination } from "../utils"

import CardList from "./CardList";

export default ({ filters }) => (
  <Results
    /* initialPage={TODO} */
    id="res"
    items={ data => data.map(({_id, ...rest}) => <CardList key={_id} data={rest} />)}
    pagination={pagination}
    stats={total => (
      <div>
        {total} résultat{total === 1 ? "" : "s"}
      </div>
    )}
  />
  /*
  <ReactiveList
    componentId="lists"
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
    className="list-view view"
    onData={data => <CardList className="" key={data.REF} data={data} />}
  />
  */
);
