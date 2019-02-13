import React from "react";
import Link from "next/link";
import queryString from "query-string";

import TextSearch from "./Search";
import AdvancedSearch from "./SearchAdvanced";

class Search extends React.Component {
  state = {
    mode: "normal"
  };

  componentDidMount() {
    this.getMode(this.props.location);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.getMode(nextProps.location);
    }
  }

  getMode(url) {
    const query = queryString.parseUrl(url).query;
    if (query.search && query.search === "advanced") {
      this.setState({ mode: "advanced" });
    } else {
      this.setState({ mode: "normal" });
    }
  }

  renderSearch() {
    if (this.state.mode !== "advanced") {
      return <TextSearch />;
    } else {
      return <AdvancedSearch />;
    }
  }

  renderLink() {
    if (this.state.mode !== "advanced") {
      return (
        <Link prefetch href={"/search?search=advanced"}>
          <a className="search-mode">Recherche avancée</a>
        </Link>
      );
    }
    return (
      <Link prefetch href={"/search?search=simple"}>
        <a className="search-mode">Recherche simple</a>
      </Link>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderSearch()}
        <div className="switch-search">{this.renderLink()}</div>
      </React.Fragment>
    );
  }
}

export default Search;
