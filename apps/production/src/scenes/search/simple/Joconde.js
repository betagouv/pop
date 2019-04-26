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
import Card from "../components/JocondeCard";
import utils from "../components/utils";
import SearchButton from "../components/SearchButton";

// import { Elasticsearch } from "../../../../../../../react-elasticsearch-lib/dist/main.js";
import { Elasticsearch, SearchBox, Results, Facet } from "react-elasticsearch";

const FILTER = [
  "mainSearch",
  "domn",
  "deno",
  "peri",
  "image",
  "tech",
  "loca",
  "autr",
  "util",
  "epoq",
  "appartenance"
];

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
        <Header base="joconde" normalMode={true} />
        <Elasticsearch url={`${es_url}/joconde`}>
          <div>
            <div className="search-and-export-zone">
              Recherche
              <SearchBox
                id="main"
                customQuery={value =>
                  utils.customQuery2(value, ["TICO", "INV", "DENO", "REF", "LOCA"], ["AUTR"])
                }
              />
              <br />
            </div>
          </div>
          <Row>
            <Col xs="3">
              <Facet id="domn" fields={["DOMN.keyword"]} />
            </Col>
            <Col xs="9">
              <Results id="res" item={(x, y, z) => <div>{`${[x.TICO, y, z].join(" - ")}`}</div>} />
            </Col>
          </Row>
        </Elasticsearch>
      </Container>
    );
  }
}

/*

<Elasticsearch url={url}>
        <SearchBox id="main" customQuery={customQuery} />
        <div style={{ display: "inline-block" }}>
          <Facet id="author" fields={["AUTR.keyword"]} />
        </div>
        <div style={{ display: "inline-block" }}>
          <Facet id="domn" fields={["DOMN.keyword"]} />
        </div>
        <Results
          id="result" 
          item={(source, score, id) => (
            <div key={id}>
              <b>{source.TICO}</b> - score: {score}
            </div>
          )}
        />
      </Elasticsearch>
      */
