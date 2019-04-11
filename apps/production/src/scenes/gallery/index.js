import React from "react";
import { ReactiveBase, DataSearch, ReactiveList } from "@appbaseio/reactivesearch/lib";
import { Row, Col } from "reactstrap";

import "./index.css";

import { es_url } from "../../config.js";

const FILTER = ["mainSearch", "institution", "email", "notices"];

export default class List extends React.Component {
  render() {
    return (
      <div className="list-import">
        <ReactiveBase url={`${es_url}/gallery`} app="gallery">
          <Row>
            <Col md="3">
              <DataSearch
                className="filter"
                componentId="mainSearch"
                dataField={["name", "email"]}
                queryFormat="and"
                iconPosition="left"
                title="Recherche"
                className="mainSearch"
                placeholder="Saisissez un nom ou un email"
                URLParams={true}
              />
              {/* <MultiList
                className="filter"
                componentId="institution"
                dataField="institution.keyword"
                title="Institutions"
                placeholder="Sélectionnez une institution"
                react={{ and: FILTER.filter(e => e !== "institution") }}
              />
              <MultiList
                className="filter"
                componentId="email"
                dataField="email.keyword"
                title="Email"
                placeholder="Sélectionnez un email"
                react={{ and: FILTER.filter(e => e !== "email") }}
              />
              <MultiList
                className="filter"
                componentId="notices"
                dataField="notices.keyword"
                title="Notices"
                placeholder="Sélectionnez une notice"
                react={{ and: FILTER.filter(e => e !== "notices") }}
              /> */}
            </Col>
            <Col md="9">
              {/* <SelectedFilters clearAllLabel="Tout supprimer" /> */}
              <ReactiveList
                // sortOptions={[
                //   { label: "Filtrer les plus récents", dataField: "importedAt", sortBy: "desc" },
                //   { label: "Filtrer les plus anciens", dataField: "importedAt", sortBy: "asc" }
                // ]}
                componentId="results"
                className="reactive-list"
                react={{ and: FILTER }}
                onResultStats={(total, took) => {
                  if (total === 1) {
                    return `1 résultat`;
                  }
                  return `${total} résultats`;
                }}
                onNoResults="Aucun résultat trouvé."
                loader="Préparation de l'affichage des résultats..."
                URLParams={true}
                dataField=""
                size={20}
                onData={data => <Card key={data._id} data={data} />}
                // pagination={true}
              />
            </Col>
          </Row>
        </ReactiveBase>
      </div>
    );
  }
}

const Card = ({ data }) => {
  return (
    <div className="import-card col-6">
      <div className="card">{JSON.stringify(data)}</div>
    </div>
  );
};
