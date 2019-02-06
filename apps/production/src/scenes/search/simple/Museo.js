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
import Card from "../components/museoCard";

const FILTER = ["mainSearch", "label", "dpt"];

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
        {/* <Header base="museo" normalMode={true} /> */}
        <ReactiveBase url={`${es_url}/museo`} app="museo">
          <div>
            <div className="search-and-export-zone">
              <DataSearch
                componentId="mainSearch"
                dataField={["NOMOFF", "REF"]}
                queryFormat="and"
                iconPosition="left"
                className="mainSearch"
                placeholder="Saisissez un titre, une dénomination, une reference ou une localisation"
                URLParams={true}
              />
              <ReactiveComponent
                componentId="export"
                react={{
                  and: FILTER
                }}
                defaultQuery={() => ({
                  size: 100,
                  aggs: {}
                })}
              >
                <ExportComponent FILTER={FILTER} collection="museo" />
              </ReactiveComponent>
            </div>
            <Row>
              <Col xs="3">
                <MultiList
                  componentId="label"
                  dataField="LABEL.keyword"
                  title="Label"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "label")
                  }}
                />
                <MultiList
                  componentId="dpt"
                  dataField="DPT.keyword"
                  title="Département"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "dpt")
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
