import React from "react";
import Router from "next/router";
import Map from "./Map";
import Mosaic from "./Mosaic";
import List from "./List";
import queryString from "query-string";

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

// Stringify an object in order to convert it to URL params
// Ex: convert `{foo: ["bar"]}` to `{foo: "[\"bar\"]"}`
const JsonStringifyValues = object => {
  const entries = Object.entries(object)
    .filter(([_k, v]) => (Array.isArray(v) ? v.length : v))
    .map(([k, v]) => v && { [k]: JSON.stringify(v) });
  return entries.length ? Object.assign(...entries) : null;
};

// Convert JSON stringified values to JS real values.
// Ex: convert `{foo: "[\"bar\"]"}` to `{foo: ["bar"]}`
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

class Results extends React.Component {
  toggle(view, params) {
    // If view change, we have to prepare all (updated) params and pass them the new route.
    if (this.props.display !== view) {
      // Get all search params displayed in current URL as real JS values (not stringified).
      const searchParams = JsonStringifyValues({
        ...JsonParseValues(queryString.parse(window.location.search)),
        ...params
      });
      // Add mode and view (because Next.js' router needs it)
      const searchFullParams = { mode: this.props.mode, view, ...searchParams };
      Router.push(
        `/search${searchFullParams ? "?" + queryString.stringify(searchFullParams) : ""}`,
        `/${this.modeToRoute()}/${view}${
          searchParams ? "?" + queryString.stringify(searchParams) : ""
        }`
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
