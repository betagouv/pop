import React, { Component } from "react";
import { ReactiveBase } from "@appbaseio/reactivesearch";
import { MultiList } from "pop-shared";

export default class App extends Component {
  render() {
    return (
      <div>
        <ReactiveBase
          url="http://pop-api-staging.eu-west-3.elasticbeanstalk.com/search/"
          app="*"
        >
          <MultiList
            dataField="PERI.keyword"
            title="Période"
            componentId="periode"
            placeholder="Rechercher une période"
          />
          <MultiList
            componentId="geolocalisation"
            dataField="POP_CONTIENT_GEOLOCALISATION.keyword"
            title="Est géolocalisé"
            filterLabel="Est géolocalisé "
            queryFormat="or"
            className="filters"
            URLParams={true}
            data={[
              { label: "oui", value: "oui" },
              { label: "non", value: "non" }
            ]}
          />
        </ReactiveBase>
      </div>
    );
  }
}
