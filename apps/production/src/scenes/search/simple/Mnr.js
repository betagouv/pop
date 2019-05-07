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
import Card from "../components/MnrCard";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import CollapsableFacet from "../components/CollapsableFacet";
import utils from "../components/utils";

export default function render() {
  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  return (
    <Container className="search">
      <Header base="mnr" normalMode={true} />
      <Elasticsearch
        url={`${es_url}/mnr`}
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
              utils.customQuery(value, ["REF", "INV", "AUTR", "ATTR", "TITR", "AFFE", "LOCA"])
            }
          />
        </div>
        <Row>
          <Col xs="3">
            <CollapsableFacet
              id="dom"
              initialValue={initialValues.get("dom")}
              fields={["DOMN.keyword"]}
              title="Domaine"
            />
            <CollapsableFacet
              id="cate"
              initialValue={initialValues.get("cate")}
              fields={["CATE.keyword"]}
              title="Catégorie"
            />
            <CollapsableFacet
              id="autr"
              initialValue={initialValues.get("autr")}
              fields={["AUTR.keyword"]}
              title="Auteur"
            />
            <CollapsableFacet
              id="prov"
              initialValue={initialValues.get("prov")}
              fields={["PROV.keyword"]}
              title="Provenance"
            />
            <CollapsableFacet
              id="peri"
              initialValue={initialValues.get("peri")}
              fields={["PERI.keyword"]}
              title="Période"
            />
            <CollapsableFacet
              id="tech"
              initialValue={initialValues.get("tech")}
              fields={["TECH.keyword"]}
              title="Technique"
            />
            <CollapsableFacet
              id="loca"
              initialValue={initialValues.get("loca")}
              fields={["LOCA.keyword"]}
              title="Localisation"
            />
            <CollapsableFacet
              id="affe"
              initialValue={initialValues.get("affe")}
              fields={["AFFE.keyword"]}
              title="affectataire"
            />
            <CollapsableFacet
              id="dmaj"
              initialValue={initialValues.get("dmaj")}
              fields={["DMAJ.keyword"]}
              title="Date de mise à jour"
            />
            <CollapsableFacet
              id="contientimage"
              initialValue={initialValues.get("contientimage")}
              fields={["CONTIENT_IMAGE.keyword"]}
              title="Contient une image"
            />
            
          </Col>
          <Col xs="9">
            <ActiveFilters id="af" />
            <Results
              initialPage={initialValues.get("resPage")}
              id="res"
              item={(source, _score, id) => <Card key={id} data={source} />}
              pagination={utils.pagination}
              stats={total => <div>{total} résultat{total === 1 ? "" : "s"}</div>}
            />
            <ExportComponent collection="mnr" target="main" />
          </Col>
        </Row>
      </Elasticsearch>
    </Container>
  );
}
