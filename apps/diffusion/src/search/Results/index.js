import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import Results from "./Results";

class Main extends React.Component {
  render() {
    return (
      <ReactiveComponent
        componentId="results" // a unique id we will refer to later
        // defaultQuery={() => ({})}
        URLParams={true}
      >
        <Results location={this.props.location} />
      </ReactiveComponent>
    );
  }
}

export default Main;
