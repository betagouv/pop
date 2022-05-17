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
import Card from "../components/PalissyCard";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import CollapsableFacet from "../components/CollapsableFacet";
import utils from "../components/utils";

export default function render() {
  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  return (
    <Container className="search">
      <Header base="palissy" normalMode={true} />
      <Elasticsearch
        url={`${es_url}/palissy`}
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
            placeholder="Référence, titre, commune, région, édifice, adresse, date de protection, historique, description, catégorie, matériaux ou vols"
            initialValue={initialValues.get("main")}
            customQuery={value =>
              utils.customQuery(value, [
                "COM",
                "TICO",
                "DPRO",
                "HIST",
                "DESC",
                "ADRS",
                "EDIF",
                "CATE",
                "VOLS",
                "REG",
                "MATR"
              ])
            }
          />
        </div>
        <Row>
          <Col xs="3">
            <CollapsableFacet
              id="denomination"
              initialValue={initialValues.get("denomination")}
              fields={["DENO.keyword"]}
              title="Dénominations"
            />
            <CollapsableFacet
              id="producteur"
              initialValue={initialValues.get("producteur")}
              fields={["PRODUCTEUR.keyword"]}
              title="Producteur"
            />
            <CollapsableFacet
              id="auteurs"
              initialValue={initialValues.get("auteurs")}
              fields={["AUTR.keyword"]}
              title="Auteurs"
            />
            <CollapsableFacet
              id="region"
              initialValue={initialValues.get("region")}
              fields={["REG.keyword"]}
              title="Régions"
            />
            <CollapsableFacet
              id="dpt"
              initialValue={initialValues.get("dpt")}
              fields={["DPT.keyword"]}
              title="Département"
            />
            <CollapsableFacet
              id="commune"
              initialValue={initialValues.get("commune")}
              fields={["COM.keyword"]}
              title="Communes"
            />
            <CollapsableFacet
              id="image"
              initialValue={initialValues.get("image")}
              fields={["CONTIENT_IMAGE.keyword"]}
              title="Contient une image"
            />
            <CollapsableFacet
              id="location"
              initialValue={initialValues.get("location")}
              fields={["POP_CONTIENT_GEOLOCALISATION.keyword"]}
              title="Contient une localisation"
            />
            <CollapsableFacet
              id="manquant"
              initialValue={initialValues.get("manquant")}
              fields={["MANQUANT.keyword"]}
              title="Objets volés"
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
            <ExportComponent collection="palissy" target="main" header={true} />
          </Col>
        </Row>
      </Elasticsearch>
    </Container>
  );
}
