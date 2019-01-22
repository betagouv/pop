import React from "react";
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  SelectedFilters,
  MultiList,
  SingleDropdownList
} from "@appbaseio/reactivesearch/lib";
import { Row, Col } from "reactstrap";

import { es_url } from "../../config.js";

const FILTER = ["mainSearch", "institution"];

export default class List extends React.Component {
  render() {
    return (
      <ReactiveBase url={`${es_url}/import`} app="import">
        <div>
          <Row>
            <Col xs="3">
              <DataSearch
                componentId="mainSearch"
                dataField={["institution"]}
                queryFormat="and"
                iconPosition="left"
                title="Recherche"
                className="mainSearch"
                placeholder="Saisissez une notice, une adresse email ou une institution"
                URLParams={true}
              />
            </Col>
            <Col xs="3">
              <SingleDropdownList
                componentId="institution"
                dataField="institution.keyword"
                title="Institutions"
                placeholder="Sélectionnez une institution"
                react={{ and: FILTER.filter(e => e !== "institution") }}
              />
            </Col>
            <Col xs="12">
              <SelectedFilters clearAllLabel="Tout supprimer" />
              <ReactiveList
                componentId="results"
                react={{ and: FILTER }}
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
                size={20}
                onData={data => <Card key={data.REF} data={data} />}
                pagination={true}
              />
            </Col>
          </Row>
        </div>
      </ReactiveBase>
    );
  }
}

const Card = ({ data }) => {
  console.log(data);

  const URL = `http://pop${
    process.env.NODE_ENV === "production" ? "" : "-staging"
  }.culture.gouv.fr/search/list?import=["${data._id}"]`;

  return (
    <div className="card" style={{ width: "50%" }}>
      <Row>
        <Col md="8">
          <div className="title">{`Import le ${data.importedAt} par ${data.user}`}</div>
          <div className="title">
            {`Vous pouvez consultez le résultat de l'import ici : `}
            <a href={URL}>Import</a>
          </div>
          <div className="title">
            {`Vous pouvez consultez le detail de l'import ici : `}
            <a href={URL}>Import</a>
          </div>
        </Col>
        <Col md="4">
          <div>{`Notices créées ${data.created}`}</div>
          <div>{`Notices mises à jour ${data.updated}`}</div>
          <div>{`Notices rejetées à l'import ${data.rejected}`}</div>
          <div>{`Notices inchangées à import ${data.unChanged}`}</div>
        </Col>
      </Row>
    </div>
  );
};
