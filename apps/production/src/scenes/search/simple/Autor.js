import React from "react";
import { Row, Col, Container } from "reactstrap";
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  SelectedFilters,
  ReactiveComponent
} from "@appbaseio/reactivesearch";
import { MultiList } from "pop-shared";
import ExportComponent from "../components/export";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import Card from "../components/AutorCard";

const FILTER = ["mainSearch", "fonc", "typid"];

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: "asc",
      sortKey: "REF"
    };
  }

  render() {
    return (
      <Container className="search">
        <Header base="autor" normalMode={true} />
        <ReactiveBase url={`${es_url}/autor`} app="autor">
          <div>
            <div className="search-and-export-zone">
              <DataSearch
                componentId="mainSearch"
                dataField={["NAME", "REF"]}
                queryFormat="and"
                iconPosition="left"
                className="mainSearch"
                placeholder="Saisissez un titre, une dénomination, une reference ou une localisation"
                URLParams={true}
              />
              <ExportComponent FILTER={FILTER} collection="autor" />
            </div>
            <Row>
              <Col xs="3">
                <MultiList
                  componentId="fonc"
                  dataField="FONC.keyword"
                  title="Fonctions"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "fonc")
                  }}
                />
                <MultiList
                  componentId="typid"
                  dataField="TYPID.keyword"
                  title="Type"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "typid")
                  }}
                />
              </Col>
              <Col xs="9">
                <SelectedFilters clearAllLabel="Tout supprimer" />
                <ReactiveList
                  componentId="results"
                  react={{
                    and: FILTER
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
                  size={20}
                  onData={data => <Card key={data.REF} data={data} />}
                  pagination={true}
                />
              </Col>
            </Row>
          </div>
        </ReactiveBase>
      </Container>
    );
  }
}
