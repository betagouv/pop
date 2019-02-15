import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import { Input, Label, FormGroup, Collapse } from "reactstrap";
import queryString from "query-string";
import "./MultiList.css";
import { toFrenchRegex } from "./utils";

export default class MultiListUmbrellaUmbrella extends React.Component {
  state = { collapse: null };
  urlLocation = null;

  onListClicked = () => {
    this.onCollapseChange(!this.state.collapse);
  };

  onCollapseChange = nextCollapseState => {
    this.setState({ collapse: nextCollapseState });
  };

  componentWillMount() {
    if (this.props.location) {
      this.urlLocation = this.props.location;
    } else {
      this.urlLocation = location.search;
    }
  }

  componentDidMount() {
    this.onCollapseChange(this.shouldCollapse());
  }

  shouldCollapse = () => {
    const { componentId } = this.props;
    const values = queryString.parse(this.urlLocation);
    const field = componentId;
    return Boolean(!values[field]);
  };

  render() {
    const style = this.props.show === false ? { display: "none" } : {};
    const collapse = this.state.collapse === null ? this.shouldCollapse() : this.state.collapse;
    return (
      <div className="multilist" style={style}>
        <div className="topBar" onClick={this.onListClicked}>
          <div className="name">{this.props.title}</div>
          <div className="v">⌄</div>
        </div>
        <Collapse isOpen={!collapse}>
          {!collapse ? (
            <ReactiveComponent
              componentId={this.props.componentId} // a unique id we will refer to later
              URLParams={this.props.URLParams || true}
              react={this.props.react || {}}
              data={this.props.data || []}
            >
              <MultiListUmbrella
                placeholder={this.props.placeholder}
                showSearch={this.props.showSearch}
                displayCount={this.props.displayCount}
                renderListItem={this.props.renderListItem}
                filterListItem={this.props.filterListItem}
                dataField={this.props.dataField}
                componentId={this.props.componentId}
                sortByName={this.props.sortByName}
                limit={this.props.limit}
                location={this.urlLocation}
              />
            </ReactiveComponent>
          ) : null}
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

  componentDidMount() {
    const { location, componentId } = this.props;
    this.updateInternalQuery("");
    const values = queryString.parse(location);
    const field = componentId;
    if (values[field]) {
      try {
        const selected = JSON.parse(values[field]);
        this.updateExternalQuery(selected);
        this.setState({ selected });
      } catch (e) {}
    }
  }
  componentWillReceiveProps(nextProps) {
    //get from url
    if (nextProps.selectedValue === null && this.props.selectedValue !== nextProps.selectedValue) {
      const selected = [];
      this.setState({ selected });
      this.updateExternalQuery(selected);
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
    let should;
    if (!Array.isArray(this.props.dataField)) {
      should = selected.map(e => ({ term: { [this.props.dataField]: e } }));
    } else {
      should = selected
        .map(e => this.props.dataField.map(d => ({ term: { [d]: e } })))
        .reduce((a, b) => a.concat(b), []);
    }

    const query = {
      bool: {
        should
      }
    };
    this.props.setQuery({ query, value: selected });
  }

  updateInternalQuery(search) {
    const value = this.props.dataField;
    const size = this.props.limit || 20;
    const sort =
      this.props.sortByName !== undefined
        ? { order: { _key: "asc" } }
        : { order: { _count: "desc" } };

    const fields = Array.isArray(value) ? value : [value];
    const query = {
      aggs: fields.reduce(
        (acc, field) => ({
          ...acc,
          [field]: {
            terms: {
              field,
              include: `.*${toFrenchRegex(search)}.*`,
              ...sort,
              size
            }
          }
        }),
        {}
      ),
      size: 0
    };
    this.setState({ query });
  }

  render() {
    return (
      <ReactiveComponent
        componentId={`MultiList-${this.props.dataField}`}
        defaultQuery={() => this.state.query}
        react={this.props.react}
        data={this.props.data}
      >
        <MultiList
          onSelect={this.select.bind(this)}
          placeholder={this.props.placeholder}
          displayCount={this.props.displayCount}
          showSearch={this.props.showSearch}
          renderListItem={this.props.renderListItem}
          filterListItem={this.props.filterListItem}
          selected={this.state.selected}
          search={this.state.search}
          react={this.props.react}
          data={this.props.data}
          onSearchChange={search => {
            this.setState({ search });
            this.updateInternalQuery(search);
          }}
        />
      </ReactiveComponent>
    );
  }
}

class MultiList extends React.Component {
  renderListItem(item) {
    if (this.props.renderListItem) {
      return this.props.renderListItem(item.key, item.doc_count);
    }

    let label = item.key;
    if (this.props.data && this.props.data.length > 0) {
      for (let i = 0; i < this.props.data.length; i++) {
        const data = this.props.data[i];
        if (data.value === item.key) {
          label = data.label;
          break;
        }
      }
    }
    return this.props.displayCount ? `${label} (${item.doc_count})` : `${label} `;
  }
  renderSuggestion() {
    if (this.props.aggregations && Object.keys(this.props.aggregations).length) {
      // Flat buckets (it may contain more than one aggregation)
      const aggs = this.props.aggregations;
      let buckets = [].concat.apply(
        [],
        Object.keys(aggs).map(key => {
          return aggs[key].buckets.filter(item => item.key);
        })
      );
      if (this.props.filterListItem) {
        buckets = buckets.filter(this.props.filterListItem);
      }

      const options = buckets.map(item => (
        <Label check key={item.key}>
          <Input
            checked={this.props.selected.includes(item.key)}
            type="checkbox"
            onChange={() => this.props.onSelect(item.key)}
          />
          {this.renderListItem(item)}
        </Label>
      ));
      return <FormGroup check>{options}</FormGroup>;
    }
    return <div />;
  }

  render() {
    return (
      <div className="searchBoxContainer">
        {this.props.showSearch === false ? (
          <div />
        ) : (
          <Input
            className="searchBox"
            placeholder={this.props.placeholder}
            value={this.props.search}
            onChange={e => this.props.onSearchChange(e.target.value)}
          />
        )}
        {this.renderSuggestion()}
      </div>
    );
  }
}
