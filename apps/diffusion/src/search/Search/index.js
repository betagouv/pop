import React from "react";
import Link from "next/link";
import queryString from "query-string";

import TextSearch from "./Search";
import AdvancedSearch from "./SearchAdvanced";

class Search extends React.Component {

  renderSearch() {
    if (this.props.mode !== "advanced") {
      return <TextSearch />;
    } else {
      return <AdvancedSearch />;
    }
  }

  renderLink() {
    if (this.props.mode !== "advanced") {
      return (
        <Link href="/advanced-search">
          <a className="search-mode">Recherche avancée</a>
        </Link>
      );
    }
    return (
      <Link href="/search">
        <a className="search-mode">Recherche simple</a>
      </Link>
    );
  }

  render() {
    console.log("this.props.mode",this.props.mode)
    return (
      <React.Fragment>
        {this.renderSearch()}
        <div className="switch-search">{this.renderLink()}</div>
      </React.Fragment>
    );
  }
}

export default Search;
