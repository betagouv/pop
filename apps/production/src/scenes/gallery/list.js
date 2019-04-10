import React from "react";
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  SelectedFilters,
  MultiList
} from "@appbaseio/reactivesearch/lib";
import { Row, Col } from "reactstrap";

import utils from "./utils.js";

import "./list.css";

import { es_url } from "../../config.js";

const FILTER = ["mainSearch", "institution", "email", "notices"];

export default class List extends React.Component {
  render() {
    return (
      <div className="list-import">
        <ReactiveBase url={`${es_url}/import`} app="import">
          <Row>
            <Col md="3">
              <DataSearch
                className="filter"
                componentId="mainSearch"
                dataField={["institution", "email", "notices"]}
                queryFormat="and"
                iconPosition="left"
                title="Recherche"
                className="mainSearch"
                placeholder="Saisissez une notice, une adresse email ou une institution"
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
              />
            </Col>
            <Col md="9">
              <SelectedFilters clearAllLabel="Tout supprimer" />
              <ReactiveList
                sortOptions={[
                  { label: "Filtrer les plus récents", dataField: "importedAt", sortBy: "desc" },
                  { label: "Filtrer les plus anciens", dataField: "importedAt", sortBy: "asc" }
                ]}
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
                dataField="yo"
                URLParams={true}
                size={20}
                onData={data => <Card key={data.REF} data={data} />}
                pagination={true}
              />
            </Col>
          </Row>
        </ReactiveBase>
      </div>
    );
  }
}

const Card = ({ data }) => {
  const preview_url = `http://pop${
    process.env.NODE_ENV === "production" ? "" : "-staging"
  }.culture.gouv.fr/search/list?import=["${data._id}"]`;

  const details_url = `https://s3.eu-west-3.amazonaws.com/pop-phototeque${
    process.env.NODE_ENV === "production" ? "" : "-staging"
  }/import/${data._id}/import.csv`;

  return (
    <div className="import-card col-6">
      <div className="card">
        <Row>
          <Col md="8" className="content">
            <div className="title">{`Import le ${utils.formatDate(
              new Date(data.importedAt)
            )} par ${data.email || "inconnu"} (${data.institution})`}</div>
            <div className="title">
              {`Vous pouvez consultez le résultat de l'import ici : `}
              <a href={preview_url} target="_blank">
                Voir en diffusion
              </a>
            </div>
            <div className="title">
              {`Vous pouvez consultez le détail de l'import ici : `}
              <a href={details_url} target="_blank">
                Fichier de détail
              </a>
            </div>
          </Col>
          <Col md="4">
            <div>{`Notices créées : ${data.created}`}</div>
            <div>{`Notices mises à jour : ${data.updated}`}</div>
            <div>{`Notices rejetées à l'import : ${data.rejected}`}</div>
            <div>{`Notices inchangées à import : ${data.unChanged}`}</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
