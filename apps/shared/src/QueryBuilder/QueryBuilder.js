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
      const query = { bool: { filter: [baseMatchQuery] } };
      this.props.setQuery({ query, value: "" });
      return;
    }
    const query = { bool: { ...q } };
    query.bool.filter = [baseMatchQuery];
    if (query.bool.should.length) {
      query.bool.minimum_should_match = 1; // MOUAAHHAHAHAH . Sinon le filter marche pas . Les résultats avec un score a 0 sont retournés
    }

    this.props.setQuery({ query, value: "" });
  }

  render() {
    return (
      <div className="queryBuilder">
        <RuleGroup
          history={this.props.history}
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
