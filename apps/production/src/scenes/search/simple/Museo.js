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
import Card from "../components/MuseoCard";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import CollapsableFacet from "../components/CollapsableFacet";
import utils from "../components/utils";

export default function render() {
  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  return (
    <Container className="search">
      <Header base="museo" normalMode={true} />
      <Elasticsearch
        url={`${es_url}/museo`}
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
            customQuery={value => utils.customQuery(value, ["NOMOFF", "REF"])}
          />
        </div>
        <Row>
          <Col xs="3">
            <CollapsableFacet
              id="nom"
              initialValue={initialValues.get("nom")}
              fields={["NOMOFF.keyword", "NOMUSAGE.keyword"]}
              title="Nom du musée"
            />
            <CollapsableFacet
              id="museo"
              initialValue={initialValues.get("museo")}
              fields={["REF.keyword"]}
              title="Code museo"
            />
            <CollapsableFacet
              id="dpt"
              initialValue={initialValues.get("dpt")}
              fields={["DPT.keyword"]}
              title="Département"
            />
            <CollapsableFacet
              id="ville"
              initialValue={initialValues.get("ville")}
              fields={["VILLE_M.keyword"]}
              title="Ville"
            />
            <CollapsableFacet
              id="dompal"
              initialValue={initialValues.get("dompal")}
              fields={["DOMPAL.keyword"]}
              title="Thématiques principales"
            />
            <CollapsableFacet
              id="cate"
              initialValue={initialValues.get("cate")}
              fields={["CATEG.keyword"]}
              title="Catégorie de musée "
            />
          </Col>
          <Col xs="9">
            <ActiveFilters id="af" />
            <Results
              initialPage={initialValues.get("resPage")}
              id="res"
              items={data => data.map(({ _source, _id }) => <Card key={_id} data={_source} />)}
              pagination={utils.pagination}
              stats={total => (
                <div>
                  {total} résultat{total === 1 ? "" : "s"}
                </div>
              )}
            />
            <ExportComponent collection="museo" target="main" header={false} />
          </Col>
        </Row>
      </Elasticsearch>
    </Container>
  );
}
