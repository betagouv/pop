import React from "react";
import Link from "next/link";
import queryString from "query-string";

import TextSearch from "./Search";
import AdvancedSearch from "./SearchAdvanced";

class Search extends React.Component {
  state = {
    mode: "normal"
  };

  switch(mode) {
    if (this.props.onChangeMode) {
      this.props.onChangeMode(mode);
    }
    this.setState({ mode });
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
        <div onClick={() => this.switch("advanced")}>
          <a className="search-mode">Recherche avancée</a>
        </div>
      );
    }
    return (
      <div onClick={() => this.switch("normal")}>
        <a className="search-mode">Recherche simple</a>
      </div>
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
