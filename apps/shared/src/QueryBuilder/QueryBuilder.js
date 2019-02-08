import React from "react";
import RuleGroup from "./RuleGroup";

import "./QueryBuilder.css";

export default class QueryBuilder extends React.Component {
  onUpdate(q) {
    if (!q) {
      this.props.setQuery({ query: {}, value: "querybuilder" }); // ???
      return;
    }
    const query = { bool: { ...q } };
    this.props.setQuery({ query, value: "querybuilder" });
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
          id="0"
        />
      </div>
    );
  }
}
