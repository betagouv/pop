import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import { Input, Label, FormGroup } from "reactstrap";
import "./multiList.css";

export default class MultiListUmbrellaUmbrella extends React.Component {
  render() {
    return (
      <ReactiveComponent
        componentId={this.props.componentId} // a unique id we will refer to later
      >
        <MultiListUmbrella field={this.props.field} limit={this.props.limit} />
      </ReactiveComponent>
    );
  }
}

class MultiListUmbrella extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {},
      search: "",
      selected: []
    };
  }

  componentWillMount() {
    this.updateInternalQuery();
  }

  select(elt) {
    const index = this.state.selected.indexOf(elt);
    let selected = null;
    if (index > -1) {
      selected = this.state.selected.filter(e => e !== elt);
      this.setState({ selected });
    } else {
      selected = [...this.state.selected, elt];
      this.setState({ selected });
    }
    this.updateExternalQuery(selected);
  }

  updateExternalQuery(selected) {
    const query = {
      bool: {
        should: selected.map(e =>
          JSON.parse(`{"term":{"${this.props.field}.keyword":"${e}"}}`)
        )
      }
    };
    this.props.setQuery({ query, value: selected.join(", ") });
  }

  updateInternalQuery() {
    const value = this.props.field;
    const limit = this.props.limit || 20;
    const search = this.state.search;
    const query = `{"aggs": {"${value}.keyword": {"terms": {"field": "${value}.keyword","include" : ".*${search}.*","order": {"_count": "desc"},"size": ${limit}}}}}`;
    this.setState({ query: JSON.parse(query) });
  }

  render() {
    return (
      <div className="multilist">
        <ReactiveComponent
          componentId={`MultiList-${this.props.field}`}
          defaultQuery={() => this.state.query}
        >
          <MultiList
            onSelect={this.select.bind(this)}
            selected={this.state.selected}
            search={this.state.search}
            onSearchChange={search =>
              this.setState({ search }, this.updateInternalQuery())
            }
          />
        </ReactiveComponent>
      </div>
    );
  }
}

class MultiList extends React.Component {
  renderSuggestion() {
    if (
      this.props.aggregations &&
      Object.keys(this.props.aggregations).length
    ) {
      const key = Object.keys(this.props.aggregations)[0];
      const options = this.props.aggregations[key].buckets.map(e => (
        <Label check key={e.key}>
          <Input
            checked={this.props.selected.includes(e.key)}
            type="checkbox"
            onChange={event => this.props.onSelect(e.key)}
          />
          {`${e.key} (${e.doc_count})`}
        </Label>
      ));
      return <FormGroup check>{options}</FormGroup>;
    }
    return <div />;
  }

  render() {
    return (
      <div>
        <Input
          value={this.props.search}
          onChange={e => this.props.onSearchChange(e.target.value)}
        />
        {this.renderSuggestion()}
      </div>
    );
  }
}
