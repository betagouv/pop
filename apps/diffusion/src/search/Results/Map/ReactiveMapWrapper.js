import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import queryString from "query-string";

import Map from "./Map";

import { getESQuery } from "./utils";

/*
This file contain the Map wrapper. 
It does all links with elastic search -> Query the database and manage query
add give results to Map component in its props ( through reactive Component)
*/

export default class ReactiveMapWrapper extends React.Component {
  state = {
    query: { query: { match_all: {} } },
    isNewSearch: false,
    precision: 3
  };

  prevBounds = null;
  currentSearch = null;

  urlLocation = null;

  componentDidUpdate(prevProps) {
    try {
      if (location) {
        this.urlLocation = location.search;
      }
    } catch (error) {
      if (this.props.location) {
        // If window.location not defined use props
        this.urlLocation = this.props.location.search;
      } else {
        throw new Error("location is not defined");
      }
    }
    const parsed = queryString.parse(this.urlLocation);
    const nextSearch = JSON.stringify(parsed);
    if (this.currentSearch !== nextSearch) {
      // New Search
      this.currentSearch = nextSearch;
      this.setState({ isNewSearch: true });
    } else if (this.state.isNewSearch) {
      this.setState({ isNewSearch: false });
    }
  }

  onUpdateQuery(top_left_lat, top_left_lon, bottom_right_lat, bottom_right_lon, precision) {
    const query = getESQuery(
      top_left_lat,
      top_left_lon,
      bottom_right_lat,
      bottom_right_lon,
      precision
    );

    this.setState({ query });
  }

  render() {
    return (
      <div>
        <ReactiveComponent
          componentId="map" // a unique id we will refer to later
          URLParams={this.props.URLParams || true}
          react={{ and: this.props.filters }}
          defaultQuery={() => this.state.query}
        >
          <Map isNewSearch={this.state.isNewSearch} onUpdateQuery={this.onUpdateQuery.bind(this)} />
        </ReactiveComponent>
      </div>
    );
  }
}
