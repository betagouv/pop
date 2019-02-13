import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import Mapping from "../Mapping";
import QueryBuilder from "./QueryBuilder";
import operators from "./operators";

export default class AdvancedSearch extends React.Component {
  componentWillMount() {
    this.setEntity(this.props.collection);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collection && this.props.collection) {
      this.setEntity(nextProps.collection);
    }
  }

  setEntity(collection) {
    const entity = Mapping[collection];
    if (!entity) {
      console.log("Impossible de trouver la collection ", collection);
    }

    //clean entity
    delete entity._id;
    delete entity.__v;
    delete entity["POP_COORDONNEES.lat"];
    delete entity["POP_COORDONNEES.lon"];
    delete entity["POP_COORDINATES_POLYGON.type"];
    delete entity["POP_COORDINATES_POLYGON.coordinates"];

    this.setState({ entity });
  }

  render() {
    return (
      <ReactiveComponent componentId={this.props.componentId}>
        <QueryBuilder
          history={this.props.history}
          URLParams={true}
          displayLabel={this.props.displayLabel}
          autocomplete={this.props.autocomplete === undefined ? true : this.props.autocomplete}
          entity={this.state.entity}
          base={this.props.base}
        />
      </ReactiveComponent>
    );
  }
}

AdvancedSearch.operator = operators;
