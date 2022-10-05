import React from "react";
import { Row, Col, Container } from "reactstrap";
import {
  Elasticsearch,
  SearchBox,
  Results,
  toUrlQueryString,
  fromUrlQueryString,
  ActiveFilters
} from "@popproject/pop-react-elasticsearch";
import ExportComponent from "../components/ExportComponent";
import Card from "../components/EnluminuresCard";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import CollapsableFacet from "../components/CollapsableFacet";
import utils from "../components/utils";

export default function render(props) {
  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  return (
    <Container className="search">
      <Header base="enluminures" normalMode={true} />
      <Elasticsearch
        url={`${es_url}/enluminures`}
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
            customQuery={value => utils.customQuery(value, ["TITR", "REF", "SUJET"])}
            BtnComponent={utils.customSearchBtn}
          />
          <p>{props.message}</p>
        </div>
        <Row>
          <Col xs="3">
            <CollapsableFacet
              id="nomenc"
              initialValue={initialValues.get("nomenc")}
              fields={["NOMENC.keyword"]}
              title="Domaine"
            />
            <CollapsableFacet
              id="attrib"
              initialValue={initialValues.get("attrib")}
              fields={["ATTRIB.keyword"]}
              title="Attribution"
            />
            <CollapsableFacet
              id="contxt"
              initialValue={initialValues.get("contxt")}
              fields={["CONTXT.keyword"]}
              title="Contexte"
            />
            <CollapsableFacet
              id="refd"
              initialValue={initialValues.get("refd")}
              fields={["REFD.keyword"]}
              title="Cote"
            />
            <CollapsableFacet
              id="sujet"
              initialValue={initialValues.get("sujet")}
              fields={["SUJET.keyword"]}
              title="Sujet"
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
            <ExportComponent collection="enluminures" target="main" header={false} />
          </Col>
        </Row>
      </Elasticsearch>
    </Container>
  );
}
