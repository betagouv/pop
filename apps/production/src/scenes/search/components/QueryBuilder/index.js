import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import Mapping from "../../../../services/Mapping";
import QueryBuilder from "./QueryBuilder";

export default class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);

    const entity = Mapping[this.props.collection];

    //clean entity
    delete entity._id;
    delete entity.__v;
    delete entity["POP_COORDONNEES.lat"];
    delete entity["POP_COORDONNEES.lon"];
    delete entity["POP_COORDINATES_POLYGON.type"];
    delete entity["POP_COORDINATES_POLYGON.coordinates"];

    this.state = {
      entity
    };
  }

  render() {
    return (
      <ReactiveComponent componentId={this.props.componentId}>
        <QueryBuilder
          entity={this.state.entity}
          displayLabel={this.props.displayLabel}
          autocomplete={this.props.autocomplete === undefined ? true : this.props.autocomplete}
        />
      </ReactiveComponent>
    );
  }
}
