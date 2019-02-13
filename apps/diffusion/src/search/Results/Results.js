import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { ReactiveList } from "@appbaseio/reactivesearch";
import classnames from "classnames";

import Map from "./Map";
import Mosaic from "./Mosaic";
import List from "./List";

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
  "museo",
  "vue"
];

class Results extends React.Component {
  componentWillMount() {
    this.setQuery(this.props.selectedValue);
  }
  setQuery(view) {
    let query = { match_all: {} };
    let value = "";

    if (view === "mosaique") {
      query = { match: { CONTIENT_IMAGE: "oui" } };
      value = "mosaique";
    } else if (view === "carte") {
      query = { match: { POP_CONTIENT_GEOLOCALISATION: "oui" } };
      value = "carte";
    }

    this.props.setQuery({
      query,
      value
    });
  }

  renderTabs() {
    const view = this.props.selectedValue || "liste";
    return (
      <Nav pills>
        <NavItem>
          <NavLink
            className={classnames({ active: view === "liste" })}
            onClick={() => {
              this.setQuery("");
            }}
          >
            LISTE
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: view === "carte"
            })}
            onClick={() => {
              this.setQuery("carte");
            }}
          >
            CARTE
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: view === "mosaique"
            })}
            onClick={() => {
              this.setQuery("mosaique");
            }}
          >
            MOSAIQUE
          </NavLink>
        </NavItem>
      </Nav>
    );
  }

  renderResults() {
    const view = this.props.selectedValue;
    if (view === "mosaique") {
      return <Mosaic key="mosaique" filters={DEFAULT_FILTER} />;
    } else if (view === "carte") {
      return <Map key="carte" filters={DEFAULT_FILTER} />;
    } else {
      return <List key="liste" filters={DEFAULT_FILTER} />;
    }
  }
  render() {
    return (
      <div className="result-view">
        {this.renderTabs()}
        {this.renderResults()}
      </div>
    );
  }
}

export default Results;
