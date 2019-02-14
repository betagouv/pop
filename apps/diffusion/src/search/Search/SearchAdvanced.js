import React from "react";
// import { QueryBuilder } from "pop-shared";
import { QueryBuilder } from "../../../../shared/dist";
import { Row, Col } from "reactstrap";
const bases = [];
bases.push({ key: "joconde", base: "Collections des musées de France (Joconde)" });
bases.push({ key: "mnr", base: "Oeuvres spoliées (MNR Rose-Valland)" });
bases.push({ key: "merimee", base: "Patrimoine architectural (Mérimée)" });
bases.push({ key: "memoire", base: "Photographies (Mémoire)" });
bases.push({ key: "palissy", base: "Patrimoine mobilier (Palissy)" });

class SearchAdvanced extends React.Component {
  state = {
    base: bases[0].key
  };

  render() {
    const { base, key } = bases.find(e => e.key === this.state.base);
    return (
      <div className="advanced-search">
        <div className="collection">
          <Row className="advanced-search-title">
            <div>Dans la base</div>

            <select
              value={key}
              onChange={e => {
                this.setState({ base: e.target.value });
              }}
            >
              {bases.map(e => {
                return <option value={e.key}>{e.base}</option>;
              })}
            </select>
            <div>je recherche:</div>
          </Row>
        </div>
        <QueryBuilder
          collection={key}
          base={base}
          componentId="mainSearch"
          history={null}
          displayLabel={true}
          autocomplete={true}
        />
      </div>
    );
  }
}

export default SearchAdvanced;
