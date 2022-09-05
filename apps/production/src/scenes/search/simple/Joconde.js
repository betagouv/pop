import React from "react";
import { Row, Col, Container } from "reactstrap";
import ExportComponent from "../components/ExportComponent";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import Card from "../components/JocondeCard";
import CollapsableFacet from "../components/CollapsableFacet";
import utils from "../components/utils";

import {
  Elasticsearch,
  SearchBox,
  Results,
  toUrlQueryString,
  fromUrlQueryString,
  ActiveFilters
} from "@popproject/pop-react-elasticsearch";

export default function render() {
  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  return (
    <Container className="search">
      <Header base="joconde" normalMode={true} />
      <Elasticsearch
        url={`${es_url}/joconde`}
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
            placeholder="Titre, n° d'inventaire, dénomination, référence, localisation ou auteur, pour lancer la recherche cliquez la loupe"
            initialValue={initialValues.get("main")}
            customQuery={value =>
              utils.customQuery(value, ["TICO", "INV", "DENO", "REF", "LOCA", "MUSEO", "DMIS"], ["AUTR"])
            }
            BtnComponent={utils.customSearchBtn}
          />
        </div>
        <Row>
          <Col xs="3">
            <CollapsableFacet
              id="domn"
              initialValue={initialValues.get("domn")}
              fields={["DOMN.keyword"]}
              title="Domaine"
            />
            <CollapsableFacet
              id="deno"
              initialValue={initialValues.get("deno")}
              fields={["DENO.keyword"]}
              title="Dénomination"
            />
            <CollapsableFacet
              id="autr"
              initialValue={initialValues.get("autr")}
              fields={["AUTR.keyword"]}
              title="Auteurs"
            />
            <CollapsableFacet
              id="peri"
              initialValue={initialValues.get("peri")}
              fields={["PERI.keyword"]}
              title="Période"
            />
            <CollapsableFacet
              id="epoq"
              initialValue={initialValues.get("epoq")}
              fields={["EPOQ.keyword"]}
              title="Époque"
            />
            <CollapsableFacet
              id="util"
              initialValue={initialValues.get("util")}
              fields={["UTIL.keyword"]}
              title="Utilisation"
            />
            <CollapsableFacet
              id="tech"
              initialValue={initialValues.get("tech")}
              fields={["TECH.keyword"]}
              title="Techniques"
            />
            <CollapsableFacet
              id="repr"
              initialValue={initialValues.get("repr")}
              fields={["REPR.keyword"]}
              title="Sujet représenté"
            />
            <CollapsableFacet
              id="ville"
              fields={["VILLE_M.keyword"]}
              title="Ville"
              initialValue={initialValues.get("ville")}
            />
            <CollapsableFacet
              id="musee"
              fields={["NOMOFF.keyword"]}
              title="Musée"
              initialValue={initialValues.get("musee")}
            />
            <CollapsableFacet
              id="img"
              showFilter={false}
              fields={["CONTIENT_IMAGE.keyword"]}
              title="Contient une image"
              initialValue={initialValues.get("img")}
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
            <ExportComponent collection="joconde" target="main" header={false} />
          </Col>
        </Row>
      </Elasticsearch>
    </Container>
  );
}
