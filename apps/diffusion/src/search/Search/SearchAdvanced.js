import React from "react";
import { Row } from "reactstrap";
import { withRouter } from "next/router";
import Mapping from "../../services/mapping";
import { QueryBuilder } from "react-elasticsearch";

function notStrict(value) {
  return toFrenchRegex(value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"));
}

function suggestionQuery(key, value) {
  return {
    query: { match_all: {} },
    aggs: { [key]: { terms: { field: key, include: value, order: { _count: "desc" }, size: 10 } } },
    size: 0
  };
}

const operators = [
  {
    value: "===",
    text: "égal à (recherche stricte)",
    useInput: true,
    query: (key, value) => (value ? { term: { [key]: value } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${value}.*`)
  },
  {
    value: "!==",
    text: "différent de (recherche stricte)",
    useInput: true,
    query: (key, value) => (value ? { bool: { must_not: { term: { [key]: value } } } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${value}.*`)
  },
  {
    value: "===*",
    text: "contient (recherche stricte)",
    useInput: true,
    query: (key, value) => (value ? { wildcard: { [key]: `*${value}*` } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${value}.*`)
  },
  {
    value: "!==*",
    text: "ne contient pas (recherche stricte)",
    useInput: true,
    query: (key, value) =>
      value ? { bool: { must_not: { wildcard: { [key]: `*${value}*` } } } } : null,
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${value}.*`)
  },
  {
    value: "===^",
    text: "commence par (recherche stricte)",
    useInput: true,
    query: (key, value) => (value ? { wildcard: { [key]: `${value}*` } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${value}.*`)
  },
  {
    value: "==",
    text: "égal à",
    useInput: true,
    query: (key, value) => (value ? { regexp: { [key]: notStrict(value) } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${notStrict(value)}.*`)
  },
  {
    value: "!=",
    text: "différent de",
    useInput: true,
    query: (key, value) =>
      value ? { bool: { must_not: { regexp: { [key]: notStrict(value) } } } } : null,
    suggestionQuery: (key, value) => suggestionQuery(key, `${notStrict(value)}.*`)
  },
  {
    value: "*",
    text: "contient",
    useInput: true,
    query: (key, value) => (value ? { regexp: { [key]: `.*${notStrict(value)}.*` } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${notStrict(value)}.*`)
  },
  {
    value: "!*",
    text: "ne contient pas",
    useInput: true,
    query: (key, value) =>
      value ? { bool: { must_not: { regexp: { [key]: `.*${notStrict(value)}.*` } } } } : null,
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${notStrict(value)}.*`)
  },
  {
    value: "^",
    text: "commence par",
    useInput: true,
    query: (key, value) => (value ? { regexp: { [key]: `${notStrict(value)}.*` } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${notStrict(value)}.*`)
  },
  {
    value: ">=",
    text: "supérieur ou égal à",
    useInput: true,
    query: (key, value) => (value ? { range: { [key]: { gte: value } } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${value}.*`)
  },
  {
    value: "<=",
    text: "inférieur ou égal à",
    useInput: true,
    query: (key, value) => (value ? { range: { [key]: { lte: value } } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${value}.*`)
  },
  {
    value: ">",
    text: "strictement supérieur à",
    useInput: true,
    query: (key, value) => (value ? { range: { [key]: { gt: value } } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${value}.*`)
  },
  {
    value: "<",
    text: "strictement inférieur à",
    useInput: true,
    query: (key, value) => (value ? { range: { [key]: { lt: value } } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${value}.*`)
  },
  {
    value: "∃",
    text: "existe",
    useInput: false,
    query: key => ({
      bool: {
        // Must exists ...
        must: { exists: { field: key } },
        // ... and must be not empty.
        must_not: { term: { [key]: "" } }
      }
    })
  },
  {
    value: "!∃",
    text: "n'existe pas",
    useInput: false,
    query: key => ({
      bool: {
        // Should be ...
        should: [
          // ... empty string ...
          { term: { [key]: "" } },
          // ... or not exists.
          { bool: { must_not: { exists: { field: key } } } }
        ]
      }
    })
  }
];

const bases = [
  { key: "joconde", base: "Collections des musées de France (Joconde)" },
  { key: "mnr", base: "Récupération artistique (MNR Rose-Valland)" },
  { key: "merimee", base: "Patrimoine architectural (Mérimée)" },
  { key: "memoire", base: "Photographies (Mémoire)" },
  { key: "palissy", base: "Patrimoine mobilier (Palissy)" },
  { key: "enluminures", base: "Enluminures (Enluminures)" }
];

class SearchAdvanced extends React.Component {
  onBaseChange = e => {
    this.props.router.push(
      `/search?mode=advanced&view=list&base=${e.target.value}`,
      `/advanced-search/list/${e.target.value}`
    );
  };

  render() {
    const { base, key } = bases.find(e => e.key === this.props.base);
    const fields = Object.entries(Mapping[key]).map(([k, v]) => {
      return { value: `${k}.keyword`, text: `${k} - ${v.label}` };
    });
    console.log(fields);
    const initialValues = new Map();

    return (
      <div className="advanced-search">
        <div className="collection">
          <Row className="advanced-search-title">
            <div>Dans la base</div>
            <select value={this.props.base} onChange={this.onBaseChange}>
              {bases.map(e => (
                <option key={e.key} value={e.key}>
                  {e.base}
                </option>
              ))}
            </select>
            <div>je recherche:</div>
          </Row>
        </div>
        <QueryBuilder
          initialValue={initialValues.get("qb")}
          id="qb"
          fields={fields}
          operators={operators}
          autoComplete={true}
          combinators={[{ value: "AND", text: "ET" }, { value: "OR", text: "OU" }]}
        />
      </div>
    );
  }
}

/*
 <QueryBuilder
          collection={key}
          base={base}
          componentId="mainSearch"
          router={this.props.router}
          displayLabel={true}
          autocomplete={true}
        />*/

export default withRouter(SearchAdvanced);
