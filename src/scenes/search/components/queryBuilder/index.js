import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import QueryBuilder from "./QueryBuilder";

export default class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    const object = new props.entity({});
    this.state = {
      properties: object._fields
    };
  }

  render() {
    return (
      <ReactiveComponent
        componentId={this.props.componentId} // a unique id we will refer to later
      >
        <QueryBuilder
          fields={this.state.properties}
          autocomplete={
            this.props.autocomplete === undefined
              ? true
              : this.props.autocomplete
          }
        />
      </ReactiveComponent>
    );
  }
}
