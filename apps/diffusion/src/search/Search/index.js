import React from "react";
import TextSearch from "./Search";
import AdvancedSearch from "./SearchAdvanced";

class Search extends React.Component {
  render() {
    if (this.props.mode !== "advanced") {
      return <TextSearch />;
    } else {
      return <AdvancedSearch base={this.props.base} />;
    }
  }
}

export default Search;
