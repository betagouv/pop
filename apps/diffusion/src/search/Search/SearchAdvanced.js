import React from "react";
// import { QueryBuilder } from "pop-shared";
import { QueryBuilder } from "../../../../shared/dist";

class SearchAdvanced extends React.Component {
  state = {
    base: "mnr"
  };
  render() {
    return (
      <div className="advanced-search">
        <div className="collection">
          <div>Dans la base</div>
          <select
            value={this.state.base}
            onChange={e => {
              this.setState({ base: e.target.value });
            }}
          >
            <option value="mnr">Mnr</option>
            <option value="merimee">Mérimée</option>
            <option value="palissy">Palissy</option>
            <option value="joconde">Joconde</option>
            <option value="memoire">Mémoire</option>
          </select>
          <div> je recherche :</div>
        </div>
        <QueryBuilder
          collection={this.state.base}
          componentId="mainSearch"
          history={null} //"pop-shared";
          displayLabel={true}
          autocomplete={true}
        />
      </div>
    );
  }
}

export default SearchAdvanced;
