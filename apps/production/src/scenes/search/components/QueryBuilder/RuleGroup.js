import React from "react";
import Rule from "./Rule";
import { history } from "../../../../redux/store";
import qs from "qs";
import ruleQuery from "./ruleQuery";

// Merge unit queries
function getMergedQueries(q) {
  let obj = {
    must: [],
    must_not: [],
    should: [],
    should_not: []
  };
  for (let i = 0; i < q.length; i++) {
    // This algo could be better ;)
    let combinator = "ET";
    if (i === 0) {
      if (q.length === 1) {
        combinator = "ET";
      } else {
        combinator = q[1].combinator;
      }
    } else {
      combinator = q[i].combinator;
    }

    if (combinator === "ET") {
      obj.must.push(q[i].query);
    } else {
      obj.should.push(q[i].query);
    }
  }
  return obj;
}

export default class RuleGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: []
    };
  }

  updateStateQueries = queries => {
    this.setState({ queries }, () => {
      this.updateUrlParams(queries);
      this.props.onUpdate(getMergedQueries(queries));
    });
  };

  updateUrlParams = q => {
    const currentUrlParams = history.location.search;
    const targetUrlParams = qs.stringify(
      { q: q.map(e => e.data) },
      { addQueryPrefix: true }
    );
    if (currentUrlParams !== targetUrlParams) {
      history.replace(targetUrlParams);
    }
  };

  componentDidMount() {
    const search = qs.parse(history.location.search, {
      ignoreQueryPrefix: true
    });
    if (search && search.q) {
      let id = 0;
      const queries = search.q.map(s => {
        return {
          id: id++,
          data: s,
          combinator: s.combinator,
          query: ruleQuery(s.key, s.operator, s.value)
        };
      });
      this.updateStateQueries(queries);
    }
  }

  onRuleAdd() {
    this.setState({
      queries: this.state.queries.concat({ id: this.state.queries.length })
    });
  }

  onRemove(id) {
    let queries = this.state.queries.filter(e => e.id !== id);
    queries = queries.map((q, i) => ({ ...q, id: i }));
    this.updateStateQueries(queries);
  }

  onUpdate(obj) {
    const queries = [
      ...this.state.queries.slice(0, obj.id),
      obj,
      ...this.state.queries.slice(obj.id + 1)
    ];
    this.updateStateQueries(queries);
  }

  renderChildren() {
    return this.state.queries.map(({ id, data }) => {
      return (
        <Rule
          autocomplete={this.props.autocomplete}
          displayLabel={this.props.displayLabel}
          key={id}
          id={id}
          data={data || {}}
          onRemove={this.onRemove.bind(this)}
          onUpdate={this.onUpdate.bind(this)}
          entity={this.props.entity}
        />
      );
    });
  }

  render() {
    return (
      <div className="ruleGroup">
        <button onClick={this.onRuleAdd.bind(this)}>Ajouter une règle</button>
        {this.renderChildren()}
      </div>
    );
  }
}
