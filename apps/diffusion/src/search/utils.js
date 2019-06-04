import React, { useState } from "react";
import { Pagination, Facet } from "react-elasticsearch";
import { Alert } from "reactstrap";

export function pagination(total, itemsPerPage, page, setPage) {
  const pagination = (
    <Pagination onChange={p => setPage(p)} total={total} itemsPerPage={itemsPerPage} page={page} />
  );
  if (page === 1000) {
    return (
      <>
        <Alert color="warning">
          Afin de garantir une navigation fluide pour l'ensemble des utilisateurs, seules les 10.000
          premières notices sont affichées. Vous pouvez affiner votre recherche à l'aide des filtres
          de la recherche simple ou en ajoutant des critères dans la recherche avancée.
        </Alert>
        {pagination}
      </>
    );
  }
  if (total <= itemsPerPage) {
    return null;
  }
  return pagination;
}

// This function transforms a text to a french compatible regex.
// So this:
// "Voilà un château"
// Turns to that:
// "[Vv][oôöOÔÖ][iïîIÏÎ]l[àâäaÀÂÄA] [uùûüUÙÛÜ]n [cçÇC]h[àâäaÀÂÄA]t[éèêëeÉÈÊËE][àâäaÀÂÄA][uùûüUÙÛÜ]"
// It works (TM).
function toFrenchRegex(text) {
  return text
    .replace(/[éèêëeÉÈÊËE]/g, "[éèêëeÉÈÊËE]")
    .replace(/[àâäaÀÂÄA]/g, "[àâäaÀÂÄA]")
    .replace(/[cçÇC]/g, "[cçÇC]")
    .replace(/[iïîIÏÎ]/g, "[iïîIÏÎ]")
    .replace(/[oôöOÔÖ]/g, "[oôöOÔÖ]")
    .replace(/[uùûüUÙÛÜ]/g, "[uùûüUÙÛÜ]")
    .replace(/([bdfghjklmnpqrstvwxz])/gi, (w, x) => `[${x.toUpperCase()}${x.toLowerCase()}]`);
}

function notStrict(value) {
  return toFrenchRegex(escapeRegex(value));
}

function escapeRegex(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function suggestionQuery(key, value) {
  return {
    query: { match_all: {} },
    aggs: { [key]: { terms: { field: key, include: value, order: { _count: "desc" }, size: 10 } } },
    size: 0
  };
}

export const operators = [
  {
    value: "===",
    text: "égal à (recherche stricte)",
    useInput: true,
    query: (key, value) => (value ? { term: { [key]: value } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: "!==",
    text: "différent de (recherche stricte)",
    useInput: true,
    query: (key, value) => (value ? { bool: { must_not: { term: { [key]: value } } } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: "===*",
    text: "contient (recherche stricte)",
    useInput: true,
    query: (key, value) => (value ? { wildcard: { [key]: `*${value}*` } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${escapeRegex(value)}.*`)
  },
  {
    value: "!==*",
    text: "ne contient pas (recherche stricte)",
    useInput: true,
    query: (key, value) =>
      value ? { bool: { must_not: { wildcard: { [key]: `*${value}*` } } } } : null,
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${escapeRegex(value)}.*`)
  },
  {
    value: "===^",
    text: "commence par (recherche stricte)",
    useInput: true,
    query: (key, value) => (value ? { wildcard: { [key]: `${value}*` } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
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
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: "<=",
    text: "inférieur ou égal à",
    useInput: true,
    query: (key, value) => (value ? { range: { [key]: { lte: value } } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: ">",
    text: "strictement supérieur à",
    useInput: true,
    query: (key, value) => (value ? { range: { [key]: { gt: value } } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: "<",
    text: "strictement inférieur à",
    useInput: true,
    query: (key, value) => (value ? { range: { [key]: { lt: value } } } : null),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
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

export function CollapsableFacet({ initialCollapsed, title, ...rest }) {
  initialCollapsed = initialCollapsed !== undefined ? initialCollapsed : true;
  initialCollapsed = !(rest.initialValue && rest.initialValue.length);
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  function handleToggle(collapsed) {
    if (amplitude) {
      amplitude
        .getInstance()
        .logEvent(`search_filter_${collapsed ? "open" : "close"}`, { dataField: rest.id });
      setCollapsed(!collapsed);
    }
  }

  function FacetWrapper() {
    if (!collapsed) {
      return (
        <Facet
          {...rest}
          seeMore="Voir plus…"
          filterValueModifier={v => `.*${toFrenchRegex(v)}.*`}
          placeholder={"Filtrer…"}
          itemsPerBlock={10}
        />
      );
    }
    return <div />;
  }
  return (
    <div className="collapsable-facet">
      <div className="collapsable-facet-title" onClick={() => handleToggle(collapsed)}>
        {title}
        <button>⌄</button>
      </div>
      {FacetWrapper()}
    </div>
  );
}
