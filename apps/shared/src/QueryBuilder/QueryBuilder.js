import React from "react";
import RuleGroup from "./RuleGroup";

import "./QueryBuilder.css";

export default class QueryBuilder extends React.Component {
  componentWillMount() {
    this.setQuery();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.base !== this.props.base) {
      this.setQuery(null, nextProps.base);
    }
  }
  onUpdate(q) {
    this.setQuery(q);
  }

  setQuery(q, base = this.props.base) {
    const baseMatchQuery = JSON.parse('{"term": { "BASE.keyword": "' + base + '" }}');
    if (!q) {
      if (this.props.base) {
        this.props.setQuery({ query: { bool: { filter: [baseMatchQuery] } }, value: "" });
      } else {
        this.props.setQuery({ query: { match_all: {} }, value: "" });
      }
      return;
    }

    const query = { bool: { ...q } };
    if (this.props.base) {
      query.bool.filter = [baseMatchQuery];
      if (query.bool.should.length) {
        query.bool.minimum_should_match = 1; // MOUAAHHAHAHAH . Sinon le filter marche pas . Les résultats avec un score a 0 sont retournés
      }
    }
    this.props.setQuery({ query, value: "" });
  }

  render() {
    return (
      <div className="queryBuilder">
        <RuleGroup
          history={this.props.history}
          router={this.props.router}
          autocomplete={this.props.autocomplete}
          displayLabel={this.props.displayLabel}
          onUpdate={this.onUpdate.bind(this)}
          entity={this.props.entity}
          base={this.props.base}
          id="0"
        />
      </div>
    );
  }
}
