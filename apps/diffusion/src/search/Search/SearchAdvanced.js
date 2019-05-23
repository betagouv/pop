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
  onBaseChange = e => {
    this.props.router.push(
      /* `/search?mode=advanced&view=list&base=${this.state.base}`, */
      `/advanced-search/list/${e.target.value}`
    );
  };

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
            <div>je recherche</div>
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
        <style jsx global>{`
          .search .advanced-search .advanced-search-title {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .search .advanced-search .collection {
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            font-size: 18px;
            color: #2a282b;
          }

          .search .advanced-search select,
          .search .advanced-search input {
            background-color: #f8f8f8;
            border-radius: 5px;
            box-shadow: 1px 2px 2px 0 rgba(197, 197, 197, 0.5);
            max-height: 325px;
            margin: 10p;
            height: 40px;
            border-style: none;
            font-weight: normal;
            color: black;
            font-size: 15px;
          }

          .search .advanced-search .ruleGroup {
            margin-left: 0px;
          }

          .search .advanced-search .collection select {
            margin-left: 20px;
            margin-right: 20px;
          }
          .react-es-rule {
            margin-top: 5px;
            margin-bottom: 5px;
          }
          .react-es-rule > select {
            margin-right: 5px;
          }
          .react-es-rule-field {
            max-width: 35%;
          }
          .react-es-rule-operator {
            max-width: 25%;
          }
          .react-es-rule button {
            margin-left: 5px;
            padding: 2px 7px;
            border-radius: 5px;
            border: none;
            width: 30px;
          }
          .react-es-rule button:focus {
            outline: none;
          }
          .react-es-rule button.react-es-rule-add {
            background-color: #008000;
            color: white;
          }

          .react-es-rule button.react-es-rule-delete {
            background-color: #c43a2f;
            color: white;
          }

          .react-autosuggest__container {
            position: relative;
            display: inline-block;
          }
          .react-es-rule-value {
            width: 100%;
          }
          .react-es-rule-value:focus {
            outline: none;
          }

          .react-autosuggest__suggestions-container {
            display: none;
            width: 20%;
          }

          .react-autosuggest__suggestions-container--open {
            display: block;
            position: absolute;
            width:  100%;
            border: 1px solid #aaa;
            background-color: #fff;
            font-size: 14px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            z-index: 2;
          }

          .react-autosuggest__suggestions-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }

          .react-autosuggest__suggestion {
            cursor: pointer;
            padding: 5px 10px;
            overflow: hidden;
            white-space: nowrap;
          }

          .react-autosuggest__suggestion--highlighted {
            background-color: #ddd;
          }
          .react-es-rule > .react-es-rule-combinator {
            width: 55px;
          }
          .react-es-rule:first-of-type > .react-es-rule-field {
            margin-left: 60px;
          }
          .react-es-query-builder {
            margin-top: 25px;
          }
        `}</style>
      </div>
    );
  }
}

export default withRouter(SearchAdvanced);
