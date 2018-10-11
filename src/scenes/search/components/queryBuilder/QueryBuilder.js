import React from "react";
import RuleGroup from "./RuleGroup";

import "./QueryBuilder.css";

export default class QueryBuilder extends React.Component {
  onUpdate(q) {
    console.log("Set querqqqqqy", q);
    if (!q) {
      this.props.setQuery({ query: {}, value: "hey" });
      return;
    }
    const query = { bool: { ...q } };
    console.log("Set query", JSON.stringify(query));
    this.props.setQuery({ query, value: "hey" });
  }

  render() {
    return (
      <div className="queryBuilder">
        <RuleGroup
          id="0"
          onUpdate={this.onUpdate.bind(this)}
          fields={this.props.fields}
        />
      </div>
    );
  }
}
