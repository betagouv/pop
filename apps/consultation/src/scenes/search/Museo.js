import React from "react";
import { Route } from "react-router-dom";
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Container, Badge } from "reactstrap";
import queryString from "query-string";
import { ReactiveBase, DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";
import classnames from "classnames";
import { MultiList } from "pop-shared";

import Helmet from "../../components/Helmet";
import MuseoCard from "../../components/MuseoCard";
import List from "./List";
import Map from "./Map";
import Mosaic from "./Mosaic";

import { es_url } from "../../config.js";
import { isServer } from "../../redux/store";

import filterImg from "../../assets/filter.png";

import "./Search.css";

const DEFAULT_FILTER = ["mainSearch", "city"];

const ACTIVE_FILTER = {
  mainSearch: true
};

const changeActiveFilter = (collapsed, componentId) => {
  if (!collapsed) {
    addActiveFilter(componentId);
  } else {
    removeActiveFilter(componentId);
  }
};

const addActiveFilter = componentId => {
  if (!ACTIVE_FILTER.hasOwnProperty(componentId)) {
    ACTIVE_FILTER[componentId] = true;
  }
};

const removeActiveFilter = componentId => {
  if (ACTIVE_FILTER.hasOwnProperty(componentId)) {
    delete ACTIVE_FILTER[componentId];
  }
};

class Search extends React.Component {
  state = {
    activeTab: null,
    bases: ["museo"].join(","),
    defaultSelected: "",
    mobile_menu: "mobile_close"
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const values = queryString.parse(location.search);
    const { bases } = values;

    this.setState({
      activeTab: this.getActiveTab(),
      bases: bases || ["museo"].join(","),
      defaultSelected: this.getMainSearchSelected()
    });
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { location: prevLocation } = prevProps;

    if (location.pathname !== prevLocation.pathname) {
      this.setState({ activeTab: this.getActiveTab() });
    }
  }

  getMainSearchSelected = () => {
    const { location } = this.props;
    const values = queryString.parse(location.search);
    const { mainSearch } = values;
    try {
      return JSON.parse(mainSearch);
    } catch (e) {
      return "";
    }
  };

  getSelectedValues = () => {
    const { location } = this.props;
    const values = queryString.parse(location.search.replace(/%22/g, ""));
    let selectedValues = {};
    for (const key in values) {
      const value = values[key];
      selectedValues[key] = {
        value
      };
    }
    return selectedValues;
  };

  getActiveTab = () => {
    const { location } = this.props;
    let activeTab = "list";
    if (/search\/map/.test(location.pathname)) {
      activeTab = "map";
    } else if (/search\/mosaique/.test(location.pathname)) {
      activeTab = "mosaique";
    }
    return activeTab;
  };

  toggle(subRoute) {
    const { location, history } = this.props;
    if (this.state.activeTab !== subRoute) {
      history.push(`/search/${subRoute}${location.search}`);
    }
  }

  render() {
    const { location } = this.props;
    const { bases, activeTab: activeTabState } = this.state;
    const activeTab = activeTabState || this.getActiveTab();

    return (
      <div className="search">
        <Helmet
          title="Recherche Muséofile - POP - Plateforme Ouverte du Patrimoine"
          description="Recherchez dans la liste des musées de la base muséofile"
        />
        <Container fluid style={{ maxWidth: 1860 }}>
          <h1 className="title">Votre recherche</h1>
          <ReactiveBase url={`${es_url}`} app={bases}>
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
                    dataField="VILLE_M.keyword"
                    title="Ville"
                    componentId="city"
                    showSearch={true}
                    react={{ and: DEFAULT_FILTER.filter(e => e !== "city") }}
                    filterListItem={bucket =>
                      bucket.key !== "Photographies (Mémoires)" &&
                      bucket.key !== "Inventaire patrimoine mobilier (Palissy)"
                    }
                    onCollapseChange={changeActiveFilter}
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
                        filterLabel="Résultats pour "
                        dataField={["NOMOFF", "NOMANC", "NOMUSAGE"]}
                        defaultSelected={this.state.defaultSelected}
                        iconPosition="left"
                        className="mainSearch"
                        placeholder="Saisissez un nom de musée, une ville ou un département"
                        URLParams={true}
                        autosuggest={true}
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
                                    fields: ["NOMOFF", "NOMANC", "NOMUSAGE"],
                                    boost: 15
                                  }
                                },
                                {
                                  multi_match: {
                                    query: value,
                                    type: "best_fields",
                                    fields: [
                                      "NOMOFF^10",
                                      "NOMANC^10",
                                      "NOMUSAGE^10",
                                      "VILLE_M^9",
                                      "THEMES^4",
                                      "INTERET^4",
                                      "DPT^7",
                                      "DOMPAL^4",
                                      "ATOUT^4",
                                      "REGION^7"
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
                            if (isServer) {
                              selectedValues = this.getSelectedValues();
                            } else {
                              selectedValues = props.selectedValues;
                            }
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <img src={filterImg} />
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
                          className={classnames({
                            active: activeTab === "list"
                          })}
                          onClick={() => {
                            this.toggle("list");
                          }}
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
                            this.toggle("map");
                          }}
                        >
                          CARTE
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "mosaique"
                          })}
                          onClick={() => {
                            this.toggle("mosaique");
                          }}
                        >
                          MOSAIQUE
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                </Row>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="list">
                    <Route
                      exact
                      path="/search-museo/list"
                      render={() => <List filter={DEFAULT_FILTER} />}
                    />
                  </TabPane>
                  <TabPane tabId="map">
                    <Route
                      exact
                      path="/search/map"
                      render={() => <Map filter={DEFAULT_FILTER} location={location} />}
                    />
                  </TabPane>
                  <TabPane tabId="mosaique">
                    <Route
                      exact
                      path="/search/mosaique"
                      render={() => <Mosaic filter={DEFAULT_FILTER} />}
                    />
                  </TabPane>
                </TabContent>
              </div>
            </Row>
          </ReactiveBase>
        </Container>
      </div>
    );
  }
}

export default Search;
