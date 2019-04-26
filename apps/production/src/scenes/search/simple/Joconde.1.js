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
        <ReactiveBase url={`${es_url}/joconde`} app="joconde">
          <div>
            <div className="search-and-export-zone">
              <DataSearch
                componentId="mainSearch"
                dataField={[]}
                iconPosition="right"
                icon={<SearchButton />}
                className="mainSearch"
                placeholder="Saisissez un titre, une dénomination, une reference ou une localisation"
                URLParams={true}
                customQuery={value =>
                  utils.customQuery(value, ["TICO", "INV", "DENO", "REF", "LOCA"], ["AUTR"])
                }
              />
              <ExportComponent FILTER={FILTER} collection="joconde" />
            </div>
            <Row>
              <Col xs="3">
                <MultiList
                  componentId="domn"
                  dataField="DOMN.keyword"
                  title="Domaine"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "domn")
                  }}
                />

                <MultiList
                  componentId="deno"
                  dataField="DENO.keyword"
                  title="Dénomination"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "deno")
                  }}
                />

                <MultiList
                  componentId="autr"
                  dataField="AUTR.keyword"
                  title="Auteurs"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "autr")
                  }}
                />
                <MultiList
                  componentId="peri"
                  dataField="PERI.keyword"
                  title="Période"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "peri")
                  }}
                />
                <MultiList
                  componentId="epoq"
                  dataField="EPOQ.keyword"
                  title="Epoque"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "epoq")
                  }}
                />
                <MultiList
                  componentId="util"
                  dataField="UTIL.keyword"
                  title="Utilisation"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "util")
                  }}
                />

                <MultiList
                  componentId="tech"
                  dataField="TECH.keyword"
                  title="Techniques"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "tech")
                  }}
                />

                <MultiList
                  componentId="loca"
                  dataField="LOCA.keyword"
                  title="Localisation"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "loca")
                  }}
                />
                <MultiList
                  componentId="appartenance"
                  dataField="APTN.keyword"
                  title="Ancienne appartenance"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "appartenance")
                  }}
                />
                <MultiList
                  componentId="image"
                  dataField="CONTIENT_IMAGE.keyword"
                  title="Contient une image"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{
                    and: FILTER.filter(e => e !== "image")
                  }}
                />
              </Col>
              <Col xs="9">
                <SelectedFilters clearAllLabel="Tout supprimer" />
                <ReactiveList
                  componentId="results"
                  react={{
                    and: FILTER
                  }}
                  onResultStats={(total, took) => {
                    if (total === 1) {
                      return `1 résultat`;
                    }
                    return `${total} résultats`;
                  }}
                  onNoResults="Aucun résultat trouvé."
                  loader="Préparation de l'affichage des résultats..."
                  dataField=""
                  URLParams={true}
                  size={20}
                  onData={data => <Card key={data.REF} data={data} />}
                  pagination={true}
                />
              </Col>
            </Row>
          </div>
        </ReactiveBase>
      </Container>
    );
  }
}
