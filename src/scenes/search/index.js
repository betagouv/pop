import React from "react";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Container
} from "reactstrap";
import queryString from "query-string";
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  MultiList,
  SelectedFilters,
  ReactiveComponent,
  MultiDataList
} from "@appbaseio/reactivesearch";
import classnames from "classnames";
import { history } from "../../redux/store";

import CardList from "./cardList";
import CardMosaique from "./cardMosaique";
import Map from "./map";

import { es_url } from "../../config.js";

import "./index.css";

const FILTER = [
  "mainSearch",
  "domn",
  "deno",
  "periode",
  "image",
  "tech",
  "region",
  "departement",
  "commune",
  "base",
  "geolocalisation"
];

const departements = [
  ...Array.from({ length: 95 }, (_v, k) => k + 1), // 0 to 99
  ...["2a", "2b", 971, 972, 973, 974, 975, 976] // other departements
].map(v => ({ label: `${v}`.padStart(2, "0"), value: v }));

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    const values = queryString.parse(props.location.search);
    const mainSearch = () => {
      try {
        return JSON.parse(values.mainSearch);
      } catch (e) {
        return "";
      }
    };

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: values.onglet ? values.onglet : "1",
      bases:
        values.bases ||
        ["merimee", "palissy", "memoire", "joconde", "mnr"].join(","),
      defaultSelected: mainSearch()
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      let str = this.props.location.search;
      const index = str.indexOf("onglet=");
      if (index === -1) {
        const pos = this.props.location.search.indexOf("?") + 1;
        const url = str.slice(0, pos) + `onglet=${tab}&` + str.slice(pos);
        history.push(url);
      } else {
        const url =
          str.slice(0, index) + `onglet=${tab}` + str.slice(index + 8);
        history.push(url);
      }
      this.setState({ activeTab: tab });
    }
  }

  render() {
    return (
      <div className="search">
        <Container fluid style={{ maxWidth: 1860 }}>
          <h2 className="title">Votre recherche</h2>
          <ReactiveBase url={`${es_url}`} app={this.state.bases}>
            <Row>
              <Col xs="3">
                <aside className="search-sidebar">
                  <SelectedFilters
                    className="selected-filters"
                    clearAllLabel="Tout supprimer"
                  />
                  <h4>Affiner par</h4>
                  <MultiDataList
                    componentId="base"
                    dataField="BASE.keyword"
                    title="Domaine"
                    queryFormat="or"
                    filterLabel="Domaine "
                    className="filters"
                    showSearch={false}
                    showCheckbox={true}
                    URLParams={true}
                    placeholder="Rechercher"
                    react={{
                      and: FILTER
                    }}
                    data={[
                      {
                        label: "Photographies (Mémoire)",
                        value: "Photographies (Mémoires)"
                      },
                      {
                        label: "Patrimoine mobilier (Palissy)",
                        value: "Patrimoine mobilier (Palissy)"
                      },
                      {
                        label: "Collections des musées de France (Joconde)",
                        value: "Collections des musées de France (Joconde)"
                      },
                      {
                        label: "Patrimoine architectural (Mérimée)",
                        value: "Patrimoine architectural (Mérimée)"
                      },
                      {
                        label: "Oeuvres spoliées (MNR Rose-Valland)",
                        value: "Oeuvres spoliées (MNR Rose-Valland)"
                      }
                    ]}
                  />
                  <MultiList
                    componentId="domn"
                    dataField="DOMN.keyword"
                    title="Sous-Domaine"
                    queryFormat="or"
                    filterLabel="Domaine "
                    className="filters"
                    size={100}
                    showSearch={true}
                    showCheckbox={true}
                    URLParams={true}
                    placeholder="Rechercher"
                    react={{
                      and: FILTER
                    }}
                  />
                  <MultiList
                    componentId="deno"
                    dataField="DENO.keyword"
                    title="Dénomination"
                    queryFormat="or"
                    filterLabel="Dénomination "
                    className="filters"
                    size={50}
                    showSearch={true}
                    showCheckbox={true}
                    URLParams={true}
                    placeholder="Rechercher"
                    react={{
                      and: FILTER
                    }}
                  />
                  <MultiList
                    componentId="region"
                    dataField="REG.keyword"
                    title="Région"
                    filterLabel="Région "
                    queryFormat="or"
                    className="filters"
                    size={50}
                    showSearch={true}
                    showCheckbox={true}
                    URLParams={true}
                    placeholder="Rechercher"
                    react={{
                      and: FILTER
                    }}
                  />
                  <MultiDataList
                    componentId="departement"
                    dataField="DPT.keyword"
                    title="Département"
                    filterLabel="Département "
                    queryFormat="or"
                    size={120}
                    className="filters"
                    showSearch={true}
                    showCheckbox={true}
                    URLParams={true}
                    placeholder="Rechercher"
                    data={departements}
                    react={{
                      and: FILTER
                    }}
                  />

                  <MultiList
                    componentId="commune"
                    dataField="COM.keyword"
                    title="Commune"
                    filterLabel="Commune "
                    queryFormat="or"
                    className="filters"
                    size={50}
                    showSearch={true}
                    showCheckbox={true}
                    URLParams={true}
                    placeholder="Rechercher"
                    react={{
                      and: FILTER
                    }}
                  />
                  <MultiList
                    componentId="periode"
                    dataField="PERI.keyword"
                    title="Période"
                    filterLabel="Période "
                    queryFormat="or"
                    className="filters"
                    showSearch={true}
                    showCheckbox={true}
                    URLParams={true}
                    placeholder="Rechercher"
                    react={{
                      and: FILTER
                    }}
                  />
                  <MultiDataList
                    componentId="image"
                    dataField="CONTIENT_IMAGE.keyword"
                    title="Contient une image"
                    filterLabel="Contient une image "
                    queryFormat="or"
                    className="filters"
                    size={2}
                    showSearch={false}
                    showCheckbox={true}
                    URLParams={true}
                    defaultSelected={
                      this.state.activeTab === "3" ? ["oui"] : []
                    } // TODO clean this
                    data={[
                      { label: "oui", value: "oui" },
                      { label: "non", value: "non" }
                    ]}
                    react={{
                      and: FILTER
                    }}
                  />
                    <MultiDataList
                        componentId="geolocalisation"
                        dataField="POP_CONTIENT_GEOLOCALISATION.keyword"
                        title="Est géolocalisé"
                        filterLabel="Est géolocalisé "
                        queryFormat="or"
                        className="filters"
                        size={2}
                        showSearch={false}
                        showCheckbox={true}
                        URLParams={true}
                        defaultSelected={
                            this.state.activeTab === "2" ? ["oui"] : []
                        } // TODO clean this
                        data={[
                            { label: "oui", value: "oui" },
                            { label: "non", value: "non" }
                        ]}
                        react={{
                            and: FILTER
                        }}
                    />
                  {/* <MultiList
                    componentId="auteur"
                    dataField={"AUTP.keyword"}
                    title="Auteurs"
                    queryFormat="or"
                    filterLabel="Auteurs "
                    className="filters"
                    size={50}
                    showSearch={true}
                    showCheckbox={true}
                    URLParams={true}
                    placeholder="Rechercher"
                  /> */}
                  <MultiList
                    componentId="tech"
                    dataField="TECH.keyword"
                    title="Techniques"
                    queryFormat="or"
                    filterLabel="Techniques "
                    className="filters"
                    size={50}
                    showSearch={true}
                    showCheckbox={true}
                    URLParams={true}
                    placeholder="Rechercher"
                    react={{
                      and: FILTER
                    }}
                  />
                </aside>
              </Col>
              <Col xs="9">
                <Row>
                  <Col sm={8}>
                    <div className="search-and-export-zone">
                      <DataSearch
                        componentId="mainSearch"
                        filterLabel="Résultats pour "
                        dataField={[
                          "TICO",
                          "TITR",
                          "AUTP",
                          "DENO",
                          "AUTR",
                          "AUTOR"
                        ]}
                        defaultSelected={this.state.defaultSelected}
                        iconPosition="left"
                        className="mainSearch"
                        placeholder="Saisissez un titre, une dénomination ou une localisation"
                        URLParams={true}
                        customQuery={(value, props) => {
                          if (!value) {
                            return {
                              query: { match_all: {} }
                            };
                          }
                          return {
                            bool: {
                              should: [
                                {
                                  multi_match: {
                                    query: value,
                                    type: "phrase",
                                    fields: ["TICO", "TITRE", "TITR"],
                                    boost: 15
                                  }
                                },
                                {
                                  multi_match: {
                                    query: value,
                                    type: "most_fields",
                                    fields: [
                                      "TICO^10",
                                      "TITRE^9",
                                      "TITR^9",
                                      "AUTI^8",
                                      "DENO^5",
                                      "REPR^5",
                                      "PDEN^5",
                                      "AUTR^4",
                                      "AUTP^4",
                                      "PERS^4",
                                      "LOCA^7",
                                      "PAYS^3",
                                      "REG^3",
                                      "DEP^3",
                                      "COM^3",
                                      "DATE^1",
                                      "EPOQ^1",
                                      "SCLE^1",
                                      "SCLD^1"
                                    ]
                                  }
                                }
                              ]
                            }
                          };
                        }}
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
                      />
                    </div>
                  </Col>
                  <Col sm={4}>
                    <Nav pills>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "1"
                          })}
                          onClick={() => {
                            this.toggle("1");
                          }}
                        >
                          LISTE
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "2"
                          })}
                          onClick={() => {
                            this.toggle("2");
                          }}
                        >
                          MAP
                        </NavLink>
                      </NavItem>

                        <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "3"
                          })}
                          onClick={() => {
                            this.toggle("3");
                          }}
                        >
                          MOSAIQUE
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                </Row>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <ReactiveList
                      componentId="results"
                      react={{
                        and: FILTER
                      }}
                      onResultStats={(total, took) => {
                        if (total === 1) {
                          return `1 résultat trouvé en ${took} ms.`;
                        }
                        return `${total} résultats trouvés en ${took} ms.`;
                      }}
                      dataField=""
                      onNoResults="Aucun résultat trouvé."
                      loader="Préparation de l'affichage des résultats..."
                      URLParams={true}
                      size={20}
                      className="list-view"
                      onData={data => (
                        <CardList className="" key={data.REF} data={data} />
                      )}
                      pagination={true}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                     <Map filter={FILTER} />
                  </TabPane>
                  <TabPane tabId="3">
                    <ReactiveList
                      componentId="results"
                      react={{
                        and: FILTER
                      }}
                      onResultStats={(total, took) => {
                        if (total === 1) {
                          return `1 résultat trouvé en ${took} ms.`;
                        }
                        return `${total} résultats trouvés en ${took} ms.`;
                      }}
                      onNoResults="Aucun résultat trouvé."
                      loader="Préparation de l'affichage des résultats..."
                      dataField=""
                      URLParams={true}
                      size={18}
                      className="mosaique-view"
                      onData={data => (
                        <CardMosaique key={data.REF} data={data} />
                      )}
                      pagination={true}
                    />
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </ReactiveBase>
        </Container>
      </div>
    );
  }
}
