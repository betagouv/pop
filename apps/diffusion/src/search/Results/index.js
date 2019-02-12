import React from "react";
import queryString from "query-string";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

import List from "./List";
import Map from "./Map";
import Mosaic from "./Mosaic";

class Results extends React.Component {
  state = {
    view: "list"
  };

  componentDidMount() {
    this.getView(this.props.location);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.getView(nextProps.location);
    }
  }

  getView(url) {
    console.log("getView", url);
    const query = queryString.parseUrl(url).query;
    if (query.view && query.view === "mosaic") {
      this.setState({ view: "mosaic" });
    } else if (query.view && query.view === "map") {
      this.setState({ view: "map" });
    } else {
      this.setState({ view: "list" });
    }
  }

  setView(view) {
    this.setState({ view });
  }

  renderTabs() {
    const { view } = this.state;
    return (
      <Nav pills>
        <NavItem>
          <NavLink
            className={classnames({ active: view === "list" })}
            onClick={() => {
              this.setView("list");
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
    const { view } = this.state;
    if (view === "mosaic") {
      return <Mosaic />;
    } else if (view === "map") {
      return <Map />;
    } else {
      return <List />;
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
