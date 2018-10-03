import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import { Input, Label, FormGroup, Collapse } from "reactstrap";
import queryString from "query-string";
import "./multiList.css";

export default class MultiListUmbrellaUmbrella extends React.Component {
  state = {
    collapse: false
  };

  render() {
    return (
      <div className="multilist">
        <div
          className="topBar"
          onClick={() => this.setState({ collapse: !this.state.collapse })}
        >
          <div className="name">{this.props.name}</div>
          <div className="v">V</div>
        </div>
        <Collapse isOpen={this.state.collapse}>
          <ReactiveComponent
            componentId={this.props.componentId} // a unique id we will refer to later
            URLParams={this.props.URLParams || true}
            react={this.props.react || {}}
          >
            <MultiListUmbrella
              field={this.props.field}
              onCollapse={collapse => this.setState({ collapse })}
              limit={this.props.limit}
            />
          </ReactiveComponent>
        </Collapse>
      </div>
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
    // query string
    const values = queryString.parse(location.search);
    const field = this.props.field.toLowerCase()
    if (values[field]) {
      const str = values[field].slice(1, -1);
      const selected = str.split(", ");
      this.updateExternalQuery(selected);
      this.setState({ selected });
      this.props.onCollapse(true);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedValue === null &&
      this.props.selectedValue !== nextProps.selectedValue
    ) {
      const selected = [];
      this.setState({ selected });
      this.updateExternalQuery(selected);
      this.props.onCollapse(false);
    }
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
    // const query = `{"aggs": {"${value}.keyword": {"terms": {"field": "${value}.keyword","include" : ".*${search}.*","order": {"_count": "desc"},"size": ${limit}}}}}`;
    const query = `{"aggs": {"${value}.keyword": {"terms": {"field": "${value}.keyword","include" : ".*${search}.*","order": {"_key": "asc"},"size": ${limit}}}}}`;
    this.setState({ query: JSON.parse(query) });
  }

  render() {
    return (
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
          {`${e.key}`}
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
          className="searchBox"
          placeholder="Rechercher"
          value={this.props.search}
          onChange={e => this.props.onSearchChange(e.target.value)}
        />
        {this.renderSuggestion()}
      </div>
    );
  }
}
