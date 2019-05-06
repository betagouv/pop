import React from "react";
import { Row, Col, Container } from "reactstrap";
import {
  Elasticsearch,
  SearchBox,
  Results,
  toUrlQueryString,
  fromUrlQueryString,
  ActiveFilters
} from "react-elasticsearch";
import ExportComponent from "../components/ExportComponent";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import Card from "../components/AutorCard";
import CollapsableFacet from "../components/CollapsableFacet";
import utils from "../components/utils";


export default function render() {
  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  return (
    <Container className="search">
      <Header base="autor" normalMode={true} />
      <Elasticsearch
        url={`${es_url}/autor`}
        onChange={params => {
          const q = toUrlQueryString(params);
          if (q) {
            window.history.replaceState("x", "y", `?${q}`);
          }
        }}
      >
        <div>
          <SearchBox
            id="main"
            placeholder="Saisissez un nom ou une référence"
            initialValue={initialValues.get("main")}
            customQuery={value =>
              utils.customQuery(value, ["NAME", "REF"])
            }
          />
        </div>
        <Row>
          <Col xs="3">
            <CollapsableFacet
              id="fonc"
              initialValue={initialValues.get("fonc")}
              fields={["FONC.keyword"]}
              title="Fonction"
            />
            <CollapsableFacet
              id="typid"
              initialValue={initialValues.get("typid")}
              fields={["TYPID.keyword"]}
              title="Type"
            />
            <ExportComponent collection="autor" target="main" />
          </Col>
          <Col xs="9">
            <ActiveFilters id="af" />
            <Results
              initialPage={initialValues.get("resPage")}
              id="res"
              item={(source, _score, id) => <Card key={id} data={source} />}
              pagination={utils.pagination}
            />
          </Col>
        </Row>
      </Elasticsearch>
    </Container>
  );
}
