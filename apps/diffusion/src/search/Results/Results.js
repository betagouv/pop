import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
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
  static async getInitialProps({ asPath, view }) {
    return { asPath, view };
  }
  renderTabs() {
    const view = this.props.view || "list";
    return (
      <Nav pills>
        <NavItem>
          <NavLink className={classnames({ active: view === "list" })}>
            <Link href="/search/list">
              <a>LISTE</a>
            </Link>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink className={classnames({ active: view === "map" })}>
            <Link href='/search/map?geolocalisation=%5B"oui"%5D'>
              <a>CARTE</a>
            </Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: view === "mosaic"
            })}
          >
            <Link href='/search/mosaic?image=%5B"oui"%5D'>
              <a>MOSAIQUE</a>
            </Link>
          </NavLink>
        </NavItem>
      </Nav>
    );
  }

  renderResults() {
    const view = this.props.view || "list";
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
