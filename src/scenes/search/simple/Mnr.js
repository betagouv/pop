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
import Card from "../components/MnrCard";

const FILTER = [
  "mainSearch",
  "prov",
  "cate",
  "tech",
  "contientimage",
  "dmaj",
  "affe",
  "loca",
  "peri",
  "autr",
  "domn"
];

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      normalMode: !props.expert,
      sortOrder: "asc",
      sortKey: "REF"
    };
  }

  render() {
    return (
      <Container className="search">
        <Header base="mnr" normalMode={true} />
        <ReactiveBase url={`${es_url}/mnr`} app="mnr">
          <div>
            <div className="search-and-export-zone">
              <DataSearch
                componentId="mainSearch"
                dataField={[
                  "REF",
                  "INV",
                  "AUTR",
                  "ATTR",
                  "TITR",
                  "AFFE",
                  "LOCA"
                ]}
                queryFormat="and"
                iconPosition="left"
                className="mainSearch"
                placeholder="Saisissez un titre, une dénomination, une reference ou une localisation"
                URLParams={true}
              />

              <ReactiveComponent
                componentId="export"
                react={{
                  and: FILTER
                }}
                defaultQuery={() => ({
                  size: 100,
                  aggs: {}
                })}
              >
                <ExportComponent FILTER={FILTER} collection="mnr" />
              </ReactiveComponent>
            </div>
            <Row>
              <Col xs="3">
                <MultiList
                  componentId="domn"
                  dataField="DOMN.keyword"
                  title="Domaine"
                  displayCount
                  className="filters"
                  showSearch={true}
                  URLParams={true}
                  react={{
                    and: FILTER
                  }}
                />
                <MultiList
                  componentId="cate"
                  dataField="CATE.keyword"
                  title="Catégorie"
                  displayCount
                  className="filters"
                  showSearch={true}
                  URLParams={true}
                  react={{
                    and: FILTER
                  }}
                />
                <MultiList
                  componentId="prov"
                  dataField="PROV.keyword"
                  title="Provenance"
                  className="filters"
                  displayCount
                  showSearch={true}
                  URLParams={true}
                  react={{
                    and: FILTER
                  }}
                />
                <MultiList
                  componentId="autr"
                  dataField="AUTR.keyword"
                  title="Auteur"
                  className="filters"
                  displayCount
                  showSearch={true}
                  URLParams={true}
                  react={{
                    and: FILTER
                  }}
                />
                <MultiList
                  componentId="peri"
                  dataField="PERI.keyword"
                  title="Période"
                  className="filters"
                  displayCount
                  showSearch={true}
                  URLParams={true}
                  react={{
                    and: FILTER
                  }}
                />
                <MultiList
                  componentId="tech"
                  dataField="TECH.keyword"
                  title="Technique"
                  className="filters"
                  displayCount
                  showSearch={true}
                  URLParams={true}
                  react={{
                    and: FILTER
                  }}
                />
                <MultiList
                  componentId="loca"
                  dataField="LOCA.keyword"
                  title="Localisation"
                  className="filters"
                  displayCount
                  showSearch={true}
                  URLParams={true}
                  react={{
                    and: FILTER
                  }}
                />
                <MultiList
                  componentId="affe"
                  dataField="AFFE.keyword"
                  title="Etablissement affectataire"
                  className="filters"
                  displayCount
                  showSearch={true}
                  URLParams={true}
                  react={{
                    and: FILTER
                  }}
                />
                <MultiList
                  componentId="dmaj"
                  dataField="DMAJ.keyword"
                  title="Date de mise à jour"
                  className="filters"
                  displayCount
                  showSearch={true}
                  URLParams={true}
                  react={{
                    and: FILTER
                  }}
                />
                <MultiList
                  componentId="contientimage"
                  dataField="CONTIENT_IMAGE.keyword"
                  title="Contient une image"
                  className="filters"
                  displayCount
                  showSearch={true}
                  URLParams={true}
                  react={{
                    and: FILTER
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
