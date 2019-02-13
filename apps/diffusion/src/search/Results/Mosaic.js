import React from "react";
import { ReactiveList } from "@appbaseio/reactivesearch";
import CardMosaique from "./CardMosaic";

export default ({ filters }) => (
  <ReactiveList
    componentId="mosaic"
    react={{
      and: filters
    }}
    onResultStats={(total, took) => {
      const info = "La mosaïque n'affiche par défaut que les notices avec image.";
      if (total === 1) {
        return (
          <div className="result-count">
            1 résultat <i className="text-muted">{info}</i>
          </div>
        );
      }
      return (
        <div className="result-count">
          {total} résultats. <i className="text-muted">{info}</i>
        </div>
      );
    }}
    onNoResults="Aucun résultat trouvé."
    loader="Préparation de l'affichage des résultats..."
    dataField=""
    size={18}
    className="mosaique-view view"
    onData={data => <CardMosaique key={data.REF} data={data} />}
  />
);
