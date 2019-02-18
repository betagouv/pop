import React from "react";
import RuleGroup from "./RuleGroup";

import "./QueryBuilder.css";

export default class QueryBuilder extends React.Component {
  componentWillMount() {
    this.setQuery();
  }

  onUpdate(q) {
    this.setQuery(q);
  }

  setQuery(q) {
    if (!q) {
      this.props.setQuery({ query: { match_all: {} }, value: "" });
      return;
    }
    const query = { bool: { ...q } };
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
          id="0"
        />
      </div>
    );
  }
}
