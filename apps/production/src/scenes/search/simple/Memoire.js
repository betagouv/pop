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
import Card from "../components/MemoireCard";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import CollapsableFacet from "../components/CollapsableFacet";
import utils from "../components/utils";

export default function render() {
  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  return (
    <Container className="search">
      <Header base="memoire" normalMode={true} />
      <Elasticsearch
        url={`${es_url}/memoire`}
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
            customQuery={value => utils.customQuery(value, ["NAME", "REF"])}
          />
        </div>
        <Row>
          <Col xs="3">
            <CollapsableFacet
              id="dom"
              initialValue={initialValues.get("dom")}
              fields={["DOM.keyword"]}
              title="Domaine"
            />
            <CollapsableFacet
              id="producteur"
              initialValue={initialValues.get("producteur")}
              fields={["PRODUCTEUR.keyword"]}
              title="Producteur"
            />
            <CollapsableFacet
              id="autp"
              initialValue={initialValues.get("autp")}
              fields={["AUTP.keyword"]}
              title="Auteurs"
            />
            <CollapsableFacet
              id="loca"
              initialValue={initialValues.get("loca")}
              fields={["LOCA.keyword"]}
              title="Localisation"
            />
            <CollapsableFacet
              id="pays"
              initialValue={initialValues.get("pays")}
              fields={["PAYS.keyword"]}
              title="Pays"
            />
            <CollapsableFacet
              id="region"
              initialValue={initialValues.get("region")}
              fields={["REG.keyword"]}
              title="Région"
            />
            <CollapsableFacet
              id="departement"
              initialValue={initialValues.get("departement")}
              fields={["DPT.keyword"]}
              title="Département"
            />
            <CollapsableFacet
              id="commune"
              initialValue={initialValues.get("commune")}
              fields={["COM.keyword"]}
              title="Commune"
            />
            <ExportComponent collection="memoire" target="main" />
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
