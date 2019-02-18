import React from "react";
import Link from "next/link";
import TextSearch from "./Search";
import AdvancedSearch from "./SearchAdvanced";

class Search extends React.Component {
  renderSearch() {
    if (this.props.mode !== "advanced") {
      return <TextSearch />;
    } else {
      return <AdvancedSearch base={this.props.base} />;
    }
  }

  renderLink() {
    if (this.props.mode !== "advanced") {
      return (
        <Link href={"/search?view=list&mode=advanced"} as="/advanced-search/list">
          <a className="search-mode">Recherche avancée</a>
        </Link>
      );
    }
    return (
      <Link href={"/search?view=list&mode=simple"} as="/search/list">
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
