import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import { Input, Label, FormGroup, Collapse } from "reactstrap";
import queryString from "query-string";
import "./MultiList.css";
import { toFrenchRegex } from "./utils";

export default class MultiList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true
    };
  };

  onListClicked = () => {
    this.onCollapseChange(!this.state.collapse);
  };

  onCollapseChange = nextCollapseState => {
    this.setState({ collapse: nextCollapseState });
    if (this.props.onCollapseChange) {
      this.props.onCollapseChange(nextCollapseState, this.props.componentId);
    }
  };

  componentWillMount() {
    const values = queryString.parse(location.search);
    const field = this.props.componentId;
    if (values[field]) {
      this.onCollapseChange(false);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultSelected !== this.props.defaultSelected) {
      if (this.props.defaultSelected && this.props.defaultSelected.length > 0) {
        this.onCollapseChange(false);
      } else if (!this.state.collapse) {
        this.onCollapseChange(true);
      }
    }
  }

  render() {
    const style = this.props.show === false ? { display: "none" } : {};

    return (
      <div className="multilist" style={style}>
        <div className="topBar" onClick={this.onListClicked}>
          <div className="name">{this.props.title}</div>
          <div className="v">⌄</div>
        </div>
        <Collapse isOpen={!this.state.collapse}>
          {!this.state.collapse ? (
            <ReactiveComponent
              componentId={this.props.componentId} // a unique id we will refer to later
              URLParams={this.props.URLParams || true}
              react={this.props.react || {}}
              data={this.props.data || []}
            >
              <MultiListReactiveComponent
                placeholder={this.props.placeholder}
                showSearch={this.props.showSearch}
                displayCount={this.props.displayCount}
                renderListItem={this.props.renderListItem}
                filterListItem={this.props.filterListItem}
                defaultSelected={this.props.defaultSelected}
                dataField={this.props.dataField}
                componentId={this.props.componentId}
                sortByName={this.props.sortByName}
                limit={this.props.limit}
              />
            </ReactiveComponent>
          ) : null}
        </Collapse>
      </div>
    );
  }
}

class MultiListReactiveComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {},
      search: "",
      selected: []
    };
  }

  componentWillMount() {
    this.updateInternalQuery("");
    const values = queryString.parse(location.search);
    const field = this.props.componentId;
    if (values[field]) {
      const str = values[field].slice(1, -1);
      const selected = str.split(", ");
      this.updateExternalQuery(selected);
      this.setState({ selected });
    } else if (this.props.defaultSelected) {
      const selected = this.props.defaultSelected;
      this.updateExternalQuery(selected);
      this.setState({ selected });
    }
  }
  componentWillReceiveProps(nextProps) {
    //get from url
    if (
      nextProps.selectedValue === null &&
      this.props.selectedValue !== nextProps.selectedValue
    ) {
      const selected = [];
      this.setState({ selected });
      this.updateExternalQuery(selected);
    }

    //default selected
    if (
      nextProps.defaultSelected &&
      this.props.defaultSelected !== nextProps.defaultSelected
    ) {
      const selected = nextProps.defaultSelected;
      // this.setState({ selected });
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
      if (
        selected.includes("Photographies (Mémoire)") ||
        selected.includes("Patrimoine mobilier (Palissy)")
      ) {
        if (selected.includes("Photographies (Mémoire)")) {
          should = ["Photographies (Mémoires)", ...selected].map(e => ({
            term: { [this.props.dataField]: e }
          }));
        }
        if (selected.includes("Patrimoine mobilier (Palissy)")) {
          should = [
            "Inventaire patrimoine mobilier (Palissy)",
            ...selected
          ].map(e => ({ term: { [this.props.dataField]: e } }));
        }
      } else {
        should = selected.map(e => ({ term: { [this.props.dataField]: e } }));
      }
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
    this.props.setQuery({ query, value: selected.join(", ") });
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
        <MultiListReactiveSubComponent
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

class MultiListReactiveSubComponent extends React.Component {
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
    return this.props.displayCount
      ? `${label} (${item.doc_count})`
      : `${label} `;
  }
  renderSuggestion() {
    if (
      this.props.aggregations &&
      Object.keys(this.props.aggregations).length
    ) {
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
