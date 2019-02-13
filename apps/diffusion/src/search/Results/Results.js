import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { ReactiveList } from "@appbaseio/reactivesearch";
import classnames from "classnames";
import CardMosaique from "./CardMosaic";
import CardList from "./CardList";

import Map from "./Map";

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
  "results"
];

class Results extends React.Component {
  setView(view) {
    this.props.setQuery({
      query: {},
      value: view
    });
  }

  renderTabs() {
    const view = this.props.selectedValue || "list";
    return (
      <Nav pills>
        <NavItem>
          <NavLink
            className={classnames({ active: view === "list" })}
            onClick={() => {
              this.setView("");
            }}
          >
            LISTE
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: view === "map"
            })}
            onClick={() => {
              this.setView("map");
            }}
          >
            CARTE
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: view === "mosaic"
            })}
            onClick={() => {
              this.setView("mosaic");
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
    if (view === "mosaic") {
      return <Mosaic filters={DEFAULT_FILTER} />;
    } else if (view === "map") {
      return <Map filters={DEFAULT_FILTER} />;
    } else {
      return <List filters={DEFAULT_FILTER} />;
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
