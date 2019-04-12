import React from "react";
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  SelectedFilters,
  MultiList
} from "@appbaseio/reactivesearch/lib";
import { Row, Col } from "reactstrap";

import "./index.css";

import { es_url, bucket_url } from "../../config.js";

const FILTER = ["mainSearch", "institution", "email", "notices"];

export default class List extends React.Component {
  render() {
    return (
      <div className="list-gallery">
        <ReactiveBase url={`${es_url}/gallery`} app="gallery">
          <Row>
            <Col md="3">
              <SelectedFilters clearAllLabel="Tout supprimer" />
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
              <MultiList
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
                dataField="createdBy.keyword"
                title="Créé par "
                placeholder="Sélectionnez un email"
                react={{ and: FILTER.filter(e => e !== "email") }}
              />
            </Col>
            <Col md="9">
              {/* <SelectedFilters clearAllLabel="Tout supprimer" /> */}
              <ReactiveList
                // sortOptions={[
                //   { label: "Filtrer les plus récents", dataField: "importedAt", sortBy: "desc" },
                //   { label: "Filtrer les plus anciens", dataField: "importedAt", sortBy: "asc" }
                // ]}
                sortOptions={[{ dataField: "createdAt", sortBy: "desc" }]}
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
    <div className="gallery-card col-6">
      <div className="card">
        <img src={`${bucket_url}${data.image}`} />
        <div className="container" style={{ maxWidth: "475px" }}>
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <div>{data.createdBy}</div>
          <div className="institution">{data.institution}</div>
          <div>
            Permalien:
            <a target="_blank" href={`http://localhost:8081/gallery/${data._id}`}>
              {`https://www.pop.culture.gouv.fr/gallery/${data._id}`}
            </a>
          </div>
          <div>{`Créé par ${data.createdBy} le ${new Date(data.createdAt).toLocaleString()}`}</div>
        </div>
      </div>
    </div>
  );
};
