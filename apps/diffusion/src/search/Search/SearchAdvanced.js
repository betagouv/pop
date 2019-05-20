import React from "react";
import { Row } from "reactstrap";
import { withRouter } from "next/router";
import Mapping from "../../services/mapping";
import { QueryBuilder } from "react-elasticsearch";
import { operators } from "../utils";

const bases = [
  { key: "joconde", base: "Collections des musées de France (Joconde)" },
  { key: "mnr", base: "Récupération artistique (MNR Rose-Valland)" },
  { key: "merimee", base: "Patrimoine architectural (Mérimée)" },
  { key: "memoire", base: "Photographies (Mémoire)" },
  { key: "palissy", base: "Patrimoine mobilier (Palissy)" },
  { key: "enluminures", base: "Enluminures (Enluminures)" }
];

class SearchAdvanced extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.state = {
      base: props.base
    };
  }
  */
  onBaseChange = e => {
    // this.setState({ base: e.target.value });
    this.props.router.push(
      /* `/search?mode=advanced&view=list&base=${this.state.base}`, */
      `/advanced-search/list/${e.target.value}`
    );
  };

  /* componentDidUpdate(prevProps, prevState) {
    
    if (prevState.base !== this.state.base) {
      this.props.router.push(
        `/search?mode=advanced&view=list&base=${this.state.base}`,
        `/advanced-search/list/${this.state.base}`
      );
    }
  
  }*/

  render() {
    const { key } = bases.find(e => e.key === this.props.base);
    const fields = Object.entries(Mapping[key]).map(([k, v]) => {
      return { value: `${k}.keyword`, text: `${k} - ${v.label}` };
    });

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
          initialValue={this.props.initialValues.get("qb")}
          id="qb"
          fields={fields}
          operators={operators}
          autoComplete={true}
          combinators={[{ value: "AND", text: "ET" }, { value: "OR", text: "OU" }]}
        />
      </div>
    );
  }
}

export default withRouter(SearchAdvanced);
