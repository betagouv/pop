import React from "react";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Container,
  Alert
} from "reactstrap";
import queryString from "query-string";
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  SelectedFilters,
  ReactiveComponent
} from "@appbaseio/reactivesearch";
import classnames from "classnames";
import { history } from "../../redux/store";

import CardList from "./cardList";
import CardMosaique from "./cardMosaique";
import Map from "./map";

import MultiList from "./multiList";

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
                    <MultiList
                      dataField="BASE.keyword"
                      title="Base"
                      componentId="base"
                      showSearch={false}
                    />
                    <MultiList
                      dataField="DENO.keyword"
                      title="Dénomination"
                      placeholder="Rechercher une dénomination"
                      componentId="deno"
                    />
                    <MultiList
                      dataField="DOMN.keyword"
                      title="Sous-Domaine"
                      placeholder="Rechercher un sous-domaine"
                      componentId="domn"
                    />
                    <MultiList
                      dataField="REG.keyword"
                      title="Région"
                      componentId="region"
                      placeholder="Rechercher une région"
                      sortByName
                    />
                    <MultiList
                      dataField="DPT.keyword"
                      title="Département"
                      componentId="departement"
                      placeholder="Rechercher un département"
                      sortByName
                      react={{ FILTER: "region" }}
                    />
                    <MultiList
                      dataField="COM.keyword"
                      title="Commune"
                      componentId="commune"
                    />
                    <MultiList
                      dataField="PERI.keyword"
                      title="Période"
                      componentId="periode"
                      placeholder="Rechercher une période"
                    />
                    <MultiList
                      dataField="CONTIENT_IMAGE.keyword"
                      title="Contient une image"
                      componentId="image"
                      placeholder="oui ou non"
                      showSearch={false}
                      defaultSelected={
                        this.state.activeTab === "3" ? ["oui"] : []
                      }
                    />
                    <MultiList
                      componentId="geolocalisation"
                      dataField="POP_CONTIENT_GEOLOCALISATION.keyword"
                      title="Est géolocalisé"
                      filterLabel="Est géolocalisé "
                      queryFormat="or"
                      className="filters"
                      showSearch={false}
                      URLParams={true}
                      showSearch={false}
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
                    <MultiList
                      dataField="TECH.keyword"
                      title="Techniques"
                      componentId="tech"
                      placeholder="Rechercher une technique"
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
                      // pagination={true}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <Alert
                      color="danger"
                      isOpen={this.state.alert}
                      toggle={() => this.setState({ alert: false })}
                    >
                      Cette carte est en "beta". Les 8000 premiers résultats
                      sont affichés et certaines données ne sont pas encore
                      géolocalisées correctement
                    </Alert>
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
