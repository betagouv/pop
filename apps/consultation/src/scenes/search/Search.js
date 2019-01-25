import React from "react";
import { Route } from "react-router-dom";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Container,
  Badge
} from "reactstrap";
import queryString from "query-string";
import {
  ReactiveBase,
  DataSearch,
  SelectedFilters
} from "@appbaseio/reactivesearch";
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
    bases: ["merimee", "palissy", "memoire", "joconde", "mnr"].join(","),
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
      bases:
        bases || ["merimee", "palissy", "memoire", "joconde", "mnr"].join(","),
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
    const { bases, mainSearch } = values;
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

  museo() {
    const { location } = this.props;
    const museo = queryString.parse(location.search).museo;
    if (museo) {
      return <MuseoCard museo={JSON.parse(museo)} />
    }
  }

  render() {
    const { location } = this.props;
    const { bases, activeTab: activeTabState } = this.state;
    const activeTab = activeTabState || this.getActiveTab();

    return (
      <div className="search">
        <Helmet
          title="Recherche - POP - Plateforme Ouverte du Patrimoine"
          description="Effectuer une recherche sur POP. Découvrez le moteur de cherche qui vous aidera à trouver facilement ce que vous recherchez sur POP."
        />
        <Container fluid style={{ maxWidth: 1860 }}>
          <h1 className="title">Votre recherche</h1>
          {this.museo()}
          <ReactiveBase url={`${es_url}`} app={bases}>
            <Row>
              <div className={`search-filters ${this.state.mobile_menu}`}>
                <aside className="search-sidebar">
                  <div
                    className="close_mobile_menu"
                    onClick={() =>
                      this.setState({ mobile_menu: "mobile_close" })
                    }
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
                    react={{ and: DEFAULT_FILTER.filter(e => e !== "auteur") }}
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
                    react={{ and: DEFAULT_FILTER.filter(e => e !== "periode") }}
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
                    defaultSelected={activeTab === "mosaique" ? ["oui"] : []}
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
                    data={[
                      { label: "oui", value: "oui" },
                      { label: "non", value: "non" }
                    ]}
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
                    react={{ and: DEFAULT_FILTER.filter(e => e !== "import") }}
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
                        onClick={() =>
                          this.setState({ mobile_menu: "mobile_open" })
                        }
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
                                  {Object.keys(selectedValues).reduce(
                                    (acc, current) => {
                                      return selectedValues[current].value !==
                                        ""
                                        ? acc + 1
                                        : acc;
                                    },
                                    0
                                  )}
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
                      path="/search/list"
                      render={() => <List filter={DEFAULT_FILTER} />}
                    />
                  </TabPane>
                  <TabPane tabId="map">
                    <Route
                      exact
                      path="/search/map"
                      render={() => (
                        <Map filter={DEFAULT_FILTER} location={location} />
                      )}
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
