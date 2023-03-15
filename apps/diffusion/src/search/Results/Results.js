import React from "react";
import Map from "./Map";
import Mosaic from "./Mosaic";
import List from "./List";
import { pushSearchRoute } from "../../services/url";

class Results extends React.Component {
  toggle(view, params) {
    // If view change, we have to prepare all (updated) params and pass them the new route.
    if (this.props.display !== view) {
      pushSearchRoute({
        base: this.props.base,
        mode: this.props.mode,
        view,
        params,
        refresh: false
      }).then(() => window.scrollTo(0, 0));
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
            onClick={() => this.toggle("list", { geolocalisation: [], image: ["oui"] })}
            className={`${view === "list" ? "active " : ""} nav-link`}
          >
            LISTE
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={() => this.toggle("map", { geolocalisation: ["oui"], image: [] })}
            className={`${view === "map" ? "active " : ""} nav-link`}
          >
            CARTE
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={() => this.toggle("mosaic", { image: ["oui"], geolocalisation: [] })}
            className={`${view === "mosaic" ? "active " : ""} nav-link`}
          >
            MOSAIQUE
          </a>
        </li>
      </ul>
    );
  }

  renderResults() {
    // Ajout de la sélection présentation (list, mosaic) dans la sauvegarde de recherche
    this.props.initialValues.set('last_view', this.props.view);

    const view = this.props.view || "list";
    if (view === "mosaic") {
      return <Mosaic key="mosaique" initialValues={this.props.initialValues} setNbreResult={this.props.nbResult}/>;
    } else if (view === "map") {
      return <Map key="carte" initialValues={this.props.initialValues} setNbreResult={this.props.nbResult}/>;
    } else {
      return <List key="list" initialValues={this.props.initialValues} setNbreResult={this.props.nbResult}/>;
    }
  }

  render() {
    return (
      <div className={`result-view${this.props.mode == "advanced" ? "-advanced" : ""}`}>
        {this.renderTabs()}
        {this.renderResults()}
        <style jsx global>{`
          .search .nav-pills {
            display: flex;
            flex-direction: row;
            width: 40%;
            flex-wrap: nowrap;
            box-shadow: 0 2px 2px 0 rgba(215, 215, 215, 0.5);
          }
          .search .nav-pills .nav-link {
            background-color: #fff;
            color: #777;
            border-radius: 0;
            cursor: pointer;
            font-weight: 400;
            font-size: 20px;
            height: 42px;
            padding-top: 7px;
          }

          .search .nav-pills .nav-item {
            flex-grow: 1;
            text-align: center;
          }
          .search .nav-pills .nav-item .active {
            background-color: #377d87;
            color: #fff;
          }
          .search .nav-pills .nav-item:first-child .nav-link {
            border-radius: 0.25rem;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .search .nav-pills .nav-item:last-child .nav-link {
            border-radius: 0.25rem;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          .search .nav-pills .nav-link.active:hover {
            color: #fff;
          }
        `}</style>
      </div>
    );
  }
}

export default Results;
