import React from "react";
import { Row, Col, Nav, NavItem, NavLink, Container, Badge } from "reactstrap";
import Router from "next/router";
import queryString from "query-string";
import { ReactiveBase, DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";
import classnames from "classnames";
import { MultiList } from "pop-shared";
import Layout from "../components/Layout";
import Head from "next/head";
import List from "./List";
import Map from "./Map";
import Mosaic from "./Mosaic";
import MuseoCard from "./MuseoCard";
import { es_url } from "../config.js";
import "./Search.css";

const BASES = ["merimee", "palissy", "memoire", "joconde", "mnr"].join(",");

const DEFAULT_FILTER = [
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
  "geolocalisation",
  "auteur",
  "ou",
  "import",
  "museo"
];

const ACTIVE_FILTER = {
  mainSearch: true
};

const changeActiveFilter = (collapsed, componentId) => {
  if (!collapsed && !ACTIVE_FILTER.hasOwnProperty(componentId)) {
    ACTIVE_FILTER[componentId] = true;
  } else if (collapsed && ACTIVE_FILTER.hasOwnProperty(componentId)) {
    delete ACTIVE_FILTER[componentId];
  }
};

class Search extends React.Component {
  state = {
    mobile_menu: "mobile_close"
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle(subRoute, params) {
    if (this.props.display !== subRoute) {
      const JsonStringifyValues = object => {
        const entries = Object.entries(object)
          .filter(([_k, v]) => (Array.isArray(v) ? v.length : v))
          .map(([k, v]) => v && { [k]: JSON.stringify(v) });
        return entries.length ? Object.assign(...entries) : null;
      };
      const JsonParseValues = values => {
        const entries =
          values &&
          Object.entries(values).map(([k, v]) => {
            try {
              v = JSON.parse(v);
            } catch (e) {}
            return { [k]: v };
          });
        return entries.length ? Object.assign(...entries) : {};
      };
      const search = JsonStringifyValues({
        ...JsonParseValues(queryString.parse(window.location.search)),
        ...params
      });
      Router.push(`/search/${subRoute}${search ? "?" + queryString.stringify(search) : ""}`);
    }
  }

  museo() {
    const query = queryString.parseUrl(this.props.location).query;
    if (query && query.museo) {
      return <MuseoCard museo={JSON.parse(query.museo)} />;
    }
  }

  render() {
    const { location } = this.props;
    const activeTab = this.props.display;

    return (
      <Layout>
        <div className="search">
          <Head>
            <title>Recherche - POP</title>
            <meta
              name="description"
              content="Effectuer une recherche sur POP. Découvrez le moteur de cherche qui vous aidera à trouver facilement ce que vous recherchez sur POP."
            />
          </Head>
          <Container fluid style={{ maxWidth: 1860 }}>
            <h1 className="title">Votre recherche</h1>
            {this.museo()}
            <ReactiveBase url={`${es_url}`} app={BASES}>
              <Row>
                <div className={`search-filters ${this.state.mobile_menu}`}>
                  <aside className="search-sidebar">
                    <div
                      className="close_mobile_menu"
                      onClick={() => this.setState({ mobile_menu: "mobile_close" })}
                    >
                      x
                    </div>
                    <SelectedFilters
                      className="selected-filters"
                      clearAllLabel="Tout supprimer"
                      title="Vos filtres"
                    />
                    <h4>Affiner par</h4>
                    <MultiList
                      dataField="BASE.keyword"
                      title="Base"
                      componentId="base"
                      showSearch={false}
                      react={{ and: DEFAULT_FILTER.filter(e => e !== "base") }}
                      filterListItem={bucket =>
                        bucket.key !== "Photographies (Mémoires)" &&
                        bucket.key !== "Inventaire patrimoine mobilier (Palissy)"
                      }
                      onCollapseChange={changeActiveFilter}
                      location={location}
                    />
                    <MultiList
                      dataField={["AUTP.keyword", "AUTR.keyword"]}
                      title="Auteur"
                      componentId="auteur"
                      react={{
                        and: DEFAULT_FILTER.filter(e => e !== "auteur")
                      }}
                      placeholder="Rechercher un auteur"
                      onCollapseChange={changeActiveFilter}
                      location={location}
                    />
                    <MultiList
                      dataField="DOMN.keyword"
                      title="Domaine"
                      placeholder="Rechercher un domaine"
                      componentId="domn"
                      react={{ and: DEFAULT_FILTER.filter(e => e !== "domn") }}
                      onCollapseChange={changeActiveFilter}
                      location={location}
                    />
                    <MultiList
                      dataField={["REG.keyword", "COM.keyword", "LOCA.keyword"]}
                      title="Où voir l'oeuvre?"
                      placeholder="Commune, musée"
                      componentId="ou"
                      react={{ and: DEFAULT_FILTER.filter(e => e !== "ou") }}
                      onCollapseChange={changeActiveFilter}
                      location={location}
                    />
                    <MultiList
                      dataField="PERI.keyword"
                      title="Période"
                      componentId="periode"
                      react={{
                        and: DEFAULT_FILTER.filter(e => e !== "periode")
                      }}
                      placeholder="Rechercher une période"
                      onCollapseChange={changeActiveFilter}
                      location={location}
                    />

                    <MultiList
                      dataField="CONTIENT_IMAGE.keyword"
                      title="Contient une image"
                      componentId="image"
                      placeholder="oui ou non"
                      showSearch={false}
                      defaultSelected={activeTab === "mosaic" ? ["oui"] : []}
                      onCollapseChange={changeActiveFilter}
                      location={location}
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
                      defaultSelected={activeTab === "map" ? ["oui"] : []}
                      data={[{ label: "oui", value: "oui" }, { label: "non", value: "non" }]}
                      onCollapseChange={changeActiveFilter}
                      location={location}
                    />
                    <MultiList
                      dataField="TECH.keyword"
                      title="Techniques"
                      componentId="tech"
                      react={{ and: DEFAULT_FILTER.filter(e => e !== "tech") }}
                      placeholder="Rechercher une technique"
                      onCollapseChange={changeActiveFilter}
                      location={location}
                    />
                    <MultiList
                      show={false}
                      componentId="import"
                      dataField="POP_IMPORT.keyword"
                      title="Import"
                      displayCount
                      URLParams={true}
                      react={{
                        and: DEFAULT_FILTER.filter(e => e !== "import")
                      }}
                      location={location}
                    />
                    <MultiList
                      show={false}
                      componentId="museo"
                      dataField="MUSEO.keyword"
                      title="Museo"
                      displayCount
                      URLParams={true}
                      react={{ and: DEFAULT_FILTER.filter(e => e !== "museo") }}
                      location={location}
                    />
                  </aside>
                </div>
                <div className="search-results">
                  <Row className="search-row">
                    <Col sm={8}>
                      <div className="search-and-export-zone">
                        <DataSearch
                          componentId="mainSearch"
                          autosuggest={false}
                          filterLabel="Résultats pour "
                          dataField={["TICO", "TITR", "AUTP", "DENO", "AUTR", "AUTOR"]}
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
                                      fields: ["TICO", "TITRE", "TITR", "LEG"],
                                      boost: 15
                                    }
                                  },
                                  {
                                    multi_match: {
                                      query: value,
                                      type: "most_fields",
                                      fields: [
                                        "TICO^10",
                                        "AUTR^10",
                                        "TITRE^9",
                                        "TITR^9",
                                        "LEG^9",
                                        "LOCA^9",
                                        "DENO^8",
                                        "DOMN^8",
                                        "EDIF^8",
                                        "OBJT^8",
                                        "REPR^8",
                                        "AUTP^7",
                                        "SERIE^7",
                                        "PDEN^5",
                                        "PERS^4",
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
                        <div
                          className="filter_mobile_menu"
                          onClick={() => this.setState({ mobile_menu: "mobile_open" })}
                        >
                          <SelectedFilters
                            render={props => {
                              let selectedValues = {};
                              selectedValues = props.selectedValues;
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center"
                                  }}
                                >
                                  <img src="/static/filter.png" />
                                  <Badge color="secondary">
                                    {Object.keys(selectedValues).reduce((acc, current) => {
                                      return selectedValues[current].value !== "" ? acc + 1 : acc;
                                    }, 0)}
                                  </Badge>
                                </div>
                              );
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <Nav pills>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: activeTab === "list" })}
                            onClick={() => this.toggle("list", { geolocalisation: [], image: [] })}
                          >
                            LISTE
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "map"
                            })}
                            onClick={() => {
                              this.toggle("map", { geolocalisation: ["oui"], image: [] });
                            }}
                          >
                            CARTE
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "mosaic"
                            })}
                            onClick={() => {
                              this.toggle("mosaic", { image: ["oui"], geolocalisation: [] });
                            }}
                          >
                            MOSAIQUE
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Col>
                  </Row>
                  {this.currentTab()}
                </div>
              </Row>
            </ReactiveBase>
          </Container>
        </div>
      </Layout>
    );
  }

  currentTab() {
    if (this.props.display === "list") {
      return <List filter={DEFAULT_FILTER} />;
    } else if (this.props.display === "map") {
      return <Map filter={DEFAULT_FILTER} location={this.props.location} />;
    } else {
      return <Mosaic filter={DEFAULT_FILTER} />;
    }
  }
}

export default Search;
