import React from "react";
import Rule from "./Rule";
import qs from "qs";
import { Container } from "reactstrap";
import ruleQuery from "./ruleQuery";
import { Tooltip } from "reactstrap";

// Merge unit queries
function getMergedQueries(q) {
  let obj = {
    must: [],
    must_not: [],
    should: [],
    should_not: []
  };
  for (let i = 0; i < q.length; i++) {
    if (!q[i].query) {
      continue;
    }
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

function guidGenerator() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

export default class RuleGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: [{ id: guidGenerator() }],
      tooltipOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.base !== this.props.base) {
      this.setState({ queries: [{ id: guidGenerator() }] });
    }
  }

  updateStateQueries = queries => {
    this.setState({ queries }, () => {
      this.updateUrlParams(queries);
      this.props.onUpdate(getMergedQueries(queries));
    });
  };

  updateUrlParams = q => {
    const { history, router } = this.props;
    if (router) {
      const { view, mode, base, gallery, ...query } = router.query;
      const currentUrlParams = qs.stringify(query);
      const targetUrlParams = qs.stringify({ q: q.map(e => e.data) });
      if (currentUrlParams !== targetUrlParams) {
        router.replace(
          `/search?base=${base}&view=${view}&mode=advanced&${targetUrlParams}`,
          `/advanced-search/${view}/${base}?${targetUrlParams}`
        );
      }
    } else if (history) {
      const currentUrlParams = history.location.search;
      const targetUrlParams = qs.stringify({ q: q.map(e => e.data) }, { addQueryPrefix: true });
      if (currentUrlParams !== targetUrlParams) {
        history.replace(targetUrlParams);
      }
    }
  };

  componentDidMount() {
    const { history, router } = this.props;
    let search;
    if (router) {
      search = qs.parse(router.asPath.split("?")[1], { ignoreQueryPrefix: true });
    } else if (history) {
      search = qs.parse(history.location.search, { ignoreQueryPrefix: true });
    } else {
      return;
    }

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
    } else {
      //put default value when you run the page. But It should be done differently.
      //Actually, this component needs some optimisation
      this.updateStateQueries([{ id: 0 }]);
    }
  }

  onRuleAdd() {
    this.setState({
      queries: [...this.state.queries.concat({ id: guidGenerator() })]
    });
  }

  onRemove(id) {
    let queries = this.state.queries.filter(e => e.id !== id);
    this.updateStateQueries(queries);
  }

  onUpdate(obj) {
    const queries = this.state.queries.map(e => (e.id === obj.id ? obj : e));
    this.updateStateQueries(queries);
  }

  renderChildren() {
    // console.log("this.state.queries", this.state.queries);
    return this.state.queries.map(({ id, data }, i) => {
      return (
        <Rule
          autocomplete={this.props.autocomplete}
          key={`key_${id}`}
          id={id}
          first={!i}
          last={this.state.queries.length === 1}
          data={data || {}}
          displayLabel={this.props.displayLabel}
          onRuleAdd={this.onRuleAdd.bind(this)}
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
        <Tooltip
          placement="right"
          className="tooltipInfo"
          isOpen={this.state.tooltipOpen}
          target="aboutSearch"
          toggle={() =>
            this.setState({
              tooltipOpen: !this.state.tooltipOpen
            })
          }
        >
          <h4>Définition de certains opérateurs :</h4>
          <dl>
            <dt>Égal à</dt>
            <dd>
              Stricte égalité. Entrer ici un champ de texte avec respect de la casse ou un code
              alphanumérique.
            </dd>
            <dt>Contient</dt>
            <dd>
              Entrer ici un champ de texte ou un code alphanumérique ou numérique. Ressortiront les
              notices pour lesquelles le champ contient les valeurs entrées, indépendamment de ce
              précède ou suit.
            </dd>
            <dt>Existe</dt>
            <dd>
              Cet opérateur permet d'indiquer la liste des notices pour lesquelles le champ
              "existe", i.e. le champ "est non vide".
            </dd>
          </dl>
        </Tooltip>
        <span id="aboutSearch" className="badge badge-info">?</span>
        <Container>{this.renderChildren()}</Container>
      </div>
    );
  }
}
