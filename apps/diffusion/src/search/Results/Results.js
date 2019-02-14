import React from "react";
import Link from "next/link";

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
  renderTabs() {
    const view = this.props.view || "list";
    return (
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link href="/search/list">
            <a className={`${view === "list" ? "active " : ""} nav-link`}>LISTE</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href='/search/map?geolocalisation=%5B"oui"%5D'>
            <a className={`${view === "map" ? "active " : ""} nav-link`}>CARTE</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href='/search/mosaic?image=%5B"oui"%5D'>
            <a className={`${view === "mosaic" ? "active " : ""} nav-link`}>MOSAIQUE</a>
          </Link>
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
