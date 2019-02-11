import React from "react";
import { Row, Col, Nav, NavItem, NavLink, Container, Badge } from "reactstrap";
import Router from "next/router";
import queryString from "query-string";
import Link from "next/link";
import { ReactiveBase, DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";
import { MultiList, QueryBuilder } from "pop-shared";
import Layout from "../components/Layout";
import Head from "next/head";

import Menu from "./Menu";
import Tabs from "./Tabs";

import List from "./List";
import Map from "./Map";
import Mosaic from "./Mosaic";

import Header from "./Header.js";

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
            <Header location={this.props.location} />
            <ReactiveBase url={`${es_url}`} app={BASES}>
              <Row>
                <Menu
                  onCollapseChange={changeActiveFilter}
                  location={location}
                  mobile_menu={this.state.mobile_menu}
                />
                <div className="search-results">
                  <Row className="search-row">
                    <Col sm={this.props.advanced ? 10 : 6}>
                      <div className="search-and-export-zone">
                        {this.props.advanced ? (
                          <AdvancedSearch />
                        ) : (
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
                        )}
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
                    <Col sm={2} className="advanced">
                      <Link
                        prefetch
                        href={this.props.advanced ? "/search/list" : "/advancedsearch/list"}
                      >
                        <a>{this.props.advanced ? "Recherche normale" : "Recherche avancée"}</a>
                      </Link>
                    </Col>
                    <Col sm={4}>
                      <Tabs location={this.props.location} />
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

class AdvancedSearch extends React.Component {
  state = {
    collection: ""
  };

  render() {
    <div>
      <div>Dans la base MNR, je cherche la notice dont</div>
      <QueryBuilder
        collection="mnr"
        componentId="advancedSearch"
        history={null}
        displayLabel={true}
        autocomplete={true}
      />
    </div>;
  }
}

export default Search;
