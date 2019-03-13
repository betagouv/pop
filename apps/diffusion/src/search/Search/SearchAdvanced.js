import React from "react";
import { QueryBuilder } from "pop-shared";
import { Row } from "reactstrap";
import { withRouter } from "next/router";

import amplitudeService from "../../services/amplitude";

const bases = [
  { key: "joconde", base: "Collections des musées de France (Joconde)" },
  { key: "mnr", base: "Récupération artistique (MNR Rose-Valland)" },
  { key: "merimee", base: "Patrimoine architectural (Mérimée)" },
  { key: "memoire", base: "Photographies (Mémoire)" },
  { key: "palissy", base: "Patrimoine mobilier (Palissy)" },
  { key: "enluminures", base: "Enluminures (Enluminures)" },
];

class SearchAdvanced extends React.Component {
  componentDidMount() {
    amplitudeService.logEvent("advanced_search_open");
  }

  onBaseChange = e => {
    this.props.router.push(
      `/search?mode=advanced&view=list&base=${e.target.value}`,
      `/advanced-search/list/${e.target.value}`
    );
  };

  render() {
    const { base, key } = bases.find(e => e.key === this.props.base);
    return (
      <div className="advanced-search">
        <div className="collection">
          <Row className="advanced-search-title">
            <div>Dans la base</div>
            <select value={this.props.base} onChange={this.onBaseChange}>
              {bases.map(e => (
                <option key={e.key} value={e.key}>
                  {e.base}
                </option>
              ))}
            </select>
            <div>je recherche:</div>
          </Row>
        </div>
        <QueryBuilder
          collection={key}
          base={base}
          componentId="mainSearch"
          router={this.props.router}
          displayLabel={true}
          autocomplete={true}
        />
      </div>
    );
  }
}

export default withRouter(SearchAdvanced);
