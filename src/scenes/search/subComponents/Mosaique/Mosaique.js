import React from "react";
import { ReactiveList } from "@appbaseio/reactivesearch";

import CardMosaique from "./CardMosaique";

export default ({ filter }) => (
    <ReactiveList
        componentId="results"
        react={{
        and: filter
        }}
        onResultStats={(total, took) => {
            if (total === 1) {
                return `1 résultat`;
            }
            return `${total} résultats`;
        }}
        onNoResults="Aucun résultat trouvé."
        loader="Préparation de l'affichage des résultats..."
        dataField=""
        URLParams={true}
        size={18}
        className="mosaique-view"
        onData={data => (
        <CardMosaique key={data.REF} data={data} />
        )}
        pagination={true}
    />
);
