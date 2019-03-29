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
import Card from "../components/EnluminuresCard";
import SearchButton from "../components/SearchButton";

const FILTER = ["mainSearch", "attrib", "contxt", "nomenc", "refd", "sujet"];

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: "asc",
      sortKey: "REF"
    };
  }

  multiList(id, title) {
    return (
      <MultiList
        componentId={id}
        dataField={`${id.toUpperCase()}.keyword`}
        title={title}
        className="filters"
        displayCount
        URLParams={true}
        react={{ and: FILTER.filter(e => e !== id) }}
      />
    );
  }

  render() {
    return (
      <Container className="search">
        <Header base="enluminures" normalMode={true} />
        <ReactiveBase url={`${es_url}/enluminures`} app="enluminures">
          <div>
            <div className="search-and-export-zone">
              <DataSearch
                componentId="mainSearch"
                dataField={["TITR", "SUJET"]}
                queryFormat="and"
                iconPosition="right"
                icon={<SearchButton />}
                className="mainSearch"
                placeholder="Saisissez un titre ou un sujet"
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
                <ExportComponent FILTER={FILTER} collection="enluminures" />
              </ReactiveComponent>
            </div>
            <Row>
              <Col xs="3">
                {this.multiList("nomenc", "Domaine")}
                {this.multiList("attrib", "Attribution")}
                {this.multiList("contxt", "Contexte")}
                {this.multiList("refd", "Cote")}
                {this.multiList("sujet", "Sujet")}
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
