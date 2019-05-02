import React, { useState } from "react";
import { Row, Col, Container } from "reactstrap";
import ExportComponent from "../components/export";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import Card from "../components/JocondeCard";
import utils from "../components/utils";

import {
  Elasticsearch,
  SearchBox,
  Results,
  Facet,
  toUrlQueryString,
  fromUrlQueryString,
  ActiveFilters
} from "react-elasticsearch";

function CollapsableFacet({ initialCollapsed, title, ...rest }) {
  initialCollapsed = initialCollapsed !== undefined ? initialCollapsed : true;
  initialCollapsed = !(rest.initialValue && rest.initialValue.length);
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  function FacetWrapper() {
    if (!collapsed) {
      return <Facet {...rest} />;
    }
    return <div />;
  }
  return (
    <div style={{ backgroundColor: "pink" }}>
      <div>
        {title}
        <button
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          open
        </button>
      </div>
      {FacetWrapper()}
    </div>
  );
}

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
            <div className="search-and-export-zone">
              Recherche
              <SearchBox
                id="main"
                initialValue={initialValues.get("main")}
                customQuery={value =>
                  utils.customQuery2(value, ["TICO", "INV", "DENO", "REF", "LOCA"], ["AUTR"])
                }
              />
              <br />
            </div>
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
              />
              <CollapsableFacet
                id="autr"
                initialValue={initialValues.get("autr")}
                fields={["AUTR.keyword"]}
              />
              <CollapsableFacet
                id="peri"
                initialValue={initialValues.get("peri")}
                fields={["PERI.keyword"]}
              />
              <CollapsableFacet
                id="epoq"
                initialValue={initialValues.get("epoq")}
                fields={["EPOQ.keyword"]}
              />
              <CollapsableFacet
                id="util"
                initialValue={initialValues.get("util")}
                fields={["UTIL.keyword"]}
              />
              <CollapsableFacet
                id="tech"
                initialValue={initialValues.get("tech")}
                fields={["TECH.keyword"]}
              />
              <CollapsableFacet
                id="aptn"
                initialValue={initialValues.get("aptn")}
                fields={["APTN.keyword"]}
              />
              <CollapsableFacet
                id="repr"
                fields={["REPR.keyword"]}
                initialValue={initialValues.get("repr")}
              />
              <CollapsableFacet
                id="img"
                fields={["CONTIENT_IMAGE.keyword"]}
                initialValue={initialValues.get("img")}
              />
            </Col>
            <Col xs="9">
              <ActiveFilters id="af" />
              <Results
                initialPage={initialValues.get("resPage")}
                id="res"
                item={(x, y, z) => <Card data={x} />}
              />
              <ExportComponent collection="joconde" target="main" />
            </Col>
          </Row>
        </Elasticsearch>
      </Container>
    );
  }
}
