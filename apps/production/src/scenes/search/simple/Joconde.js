import React from "react";
import { Row, Col, Container, Alert } from "reactstrap";
import ExportComponent from "../components/export";
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
  ActiveFilters,
  Pagination
} from "react-elasticsearch";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: "asc",
      sortKey: "REF"
    };
  }

  render() {
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
              placeholder="Saisissez un titre, une dénomination, une reference ou une localisation"
              initialValue={initialValues.get("main")}
              customQuery={value =>
                utils.customQuery2(value, ["TICO", "INV", "DENO", "REF", "LOCA"], ["AUTR"])
              }
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
                id="aptn"
                initialValue={initialValues.get("aptn")}
                fields={["APTN.keyword"]}
                title="Ancienne appartenance"
              />
              <CollapsableFacet
                id="loca"
                fields={["LOCA.keyword"]}
                title="Localisation"
                initialValue={initialValues.get("loca")}
              />
              <CollapsableFacet
                id="img"
                showFilter={false}
                fields={["CONTIENT_IMAGE.keyword"]}
                title="Contient une image"
                initialValue={initialValues.get("img")}
              />
              <ExportComponent collection="joconde" target="main" />
            </Col>
            <Col xs="9">
              <ActiveFilters id="af" />
              <Results
                initialPage={initialValues.get("resPage")}
                id="res"
                item={(source, score, id) => <Card key={id} data={source} />}
                pagination={(total, itemsPerPage, page, setPage) => {
                  const pagination = (
                    <Pagination
                      onChange={p => setPage(p)}
                      total={total}
                      itemsPerPage={itemsPerPage}
                      page={page}
                    />
                  );
                  if (page === 1000) {
                    return (
                      <>
                        <Alert color="warning">
                          Afin de garantir une navigation fluide pour l'ensemble des utilisateurs,
                          seules les 10.000 premières notices sont affichées. Cliquez sur 
                          « Exporter » pour obtenir la liste complète ou affinez votre recherche.
                        </Alert>
                        {pagination}
                      </>
                    );
                  }
                  return pagination;
                }}
              />
            </Col>
          </Row>
        </Elasticsearch>
      </Container>
    );
  }
}
