import React from "react";
import RuleGroup from "./RuleGroup";

import "./QueryBuilder.css";

export default class QueryBuilder extends React.Component {
  onUpdate(q) {
    if (!q) {
      this.props.setQuery({ query: {}, value: "hey" }); // ???
      return;
    }
    const query = { bool: { ...q } };
    console.log("QueryBuilder: ", JSON.stringify(query));
    this.props.setQuery({ query, value: "hey" }); // ???
  }

  render() {
    return (
      <div className="queryBuilder">
        <RuleGroup
          autocomplete={this.props.autocomplete}
          id="0"
          displayLabel={this.props.displayLabel}
          onUpdate={this.onUpdate.bind(this)}
          entity={this.props.entity}
        />
      </div>
    );
  }
}
