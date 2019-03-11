import React from "react";
import Map from "./Map";
import Mosaic from "./Mosaic";
import List from "./List";
import { pushSearchRoute } from "../../services/url";

import amplitudeService from "../../services/amplitude";

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
  "ref",
  "vue"
];

class Results extends React.Component {
  toggle(view, params) {
    amplitudeService.logEvent("search_toggle_tab", { view });
    // If view change, we have to prepare all (updated) params and pass them the new route.
    if (this.props.display !== view) {
      pushSearchRoute({ base: this.props.base, mode: "simple", view, params }).then(() =>
        window.scrollTo(0, 0)
      );
    }
  }

  modeToRoute() {
    return this.props.mode === "advanced" ? "advanced-search" : "search";
  }

  renderTabs() {
    const view = this.props.view;
    return (
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a
            onClick={() => this.toggle("list", { geolocalisation: [], image: [] })}
            className={`${view === "list" ? "active " : ""} nav-link`}
          >
            LISTE
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={() => {
              this.toggle("map", { geolocalisation: ["oui"], image: [] });
            }}
            className={`${view === "map" ? "active " : ""} nav-link`}
          >
            CARTE
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={() => {
              this.toggle("mosaic", { image: ["oui"], geolocalisation: [] });
            }}
            className={`${view === "mosaic" ? "active " : ""} nav-link`}
          >
            MOSAIQUE
          </a>
        </li>
      </ul>
    );
  }

  renderResults() {
    const view = this.props.view || "list";
    if (view === "mosaic") {
      return <Mosaic key="mosaique" filters={DEFAULT_FILTER} />;
    } else if (view === "map") {
      return <Map key="carte" filters={DEFAULT_FILTER} />;
    } else {
      return <List key="list" filters={DEFAULT_FILTER} />;
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
