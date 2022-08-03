import React, { useState, useRef, useEffect } from "react";
import { Pagination, Facet } from "@popproject/pop-react-elasticsearch";
import { Alert } from "reactstrap";

export function pagination(total, itemsPerPage, page, setPage) {
  const titles = { 
    previousPage: "Page précédente",
    nextPage: "Page suivante",
    firstPage: "Première page",
    lastPage: "Dernière page"
  }
  const pagination = (
    <Pagination onChange={p => setPage(p)} total={total} itemsPerPage={itemsPerPage} page={page} toolTipsBtn={titles}/>
  );
  if (page === 400) {
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
    .replace(/&/g, "\\&")
    .replace(/[éèêëeÉÈÊËE]/g, "[éèêëeÉÈÊËE]")
    .replace(/[àâäaÀÂÄA]/g, "[àâäaÀÂÄA]")
    .replace(/[cçÇC]/g, "[cçÇC]")
    .replace(/[iïîIÏÎ]/g, "[iïîIÏÎ]")
    .replace(/[oôöOÔÖ]/g, "[oôöOÔÖ]")
    .replace(/[uùûüUÙÛÜ]/g, "[uùûüUÙÛÜ]")
    .replace(/[yÿýŷYŸÝŶ]/g, "[yÿýŷYŸÝŶ]")
    .replace(/([bdfghjklmnpqrstvwxz])/gi, (w, x) => `[${x.toUpperCase()}${x.toLowerCase()}]`)
}

function notStrict(value) {
  return toFrenchRegex(escapeRegex(value));
}

function escapeRegex(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function suggestionQuery(key, value) {
  if (Array.isArray(key)) {
    return;
  }
  return {
    query: { match_all: {} },
    aggs: { [key]: { terms: { field: key, include: value, order: { _count: "desc" }, size: 10 } } },
    size: 0
  };
}

function query(key, value, cb, shouldOrMust = "should") {
  if (Array.isArray(key)) {
    console.log({ bool: { [shouldOrMust]: key.map(k => cb(k, value)) } })
    return { bool: { [shouldOrMust]: key.map(k => cb(k, value)) } };
  }
  return cb(key, value);
}

export const operators = [
  {
    value: "*",
    text: "contient",
    useInput: true,
    query: (key, value) =>
      value && query(key, value, (k, v) => ({ regexp: { [k]: `.*${notStrict(v)}.*` } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${notStrict(value)}.*`)
  },
  {
    value: "==",
    text: "égal à",
    useInput: true,
    query: (key, value) =>
      value && query(key, value, (k, v) => ({ regexp: { [k]: notStrict(v) } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${notStrict(value)}.*`)
  },
  {
    value: "^",
    text: "commence par",
    useInput: true,
    query: (key, value) =>
      value && query(key, value, (k, v) => ({ regexp: { [k]: `${notStrict(v)}.*` } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${notStrict(value)}.*`)
  },
  {
    value: "!*",
    text: "ne contient pas",
    useInput: true,
    query: (key, value) =>
      value &&
      query(key, value, (k, v) => ({
        bool: { must_not: { regexp: { [k]: `.*${notStrict(v)}.*` } } }
      })),
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${notStrict(value)}.*`)
  },
  {
    value: "!=",
    text: "différent de",
    useInput: true,
    query: (key, value) =>
      value &&
      query(key, value, (k, v) => ({ bool: { must_not: { regexp: { [k]: notStrict(v) } } } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${notStrict(value)}.*`)
  },
  {
    value: "===*",
    text: "contient (strictement)",
    useInput: true,
    query: (key, value) => value && query(key, value, (k, v) => ({ wildcard: { [k]: `*${v}*` } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${escapeRegex(value)}.*`)
  },
  {
    value: "===",
    text: "égal à (strictement)",
    useInput: true,
    query: (key, value) => value && query(key, value, (k, v) => ({ term: { [k]: v } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },

  {
    value: "===^",
    text: "commence par (strictement)",
    useInput: true,
    query: (key, value) => value && query(key, value, (k, v) => ({ wildcard: { [k]: `${v}*` } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: "!==*",
    text: "ne contient pas (strictement)",
    useInput: true,
    query: (key, value) =>
      value &&
      query(key, value, (k, v) => ({ bool: { must_not: { wildcard: { [k]: `*${v}*` } } } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${escapeRegex(value)}.*`)
  },
  {
    value: "!==",
    text: "différent de (strictement)",
    useInput: true,
    query: (key, value) =>
      value && query(key, value, (k, v) => ({ bool: { must_not: { term: { [k]: v } } } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: ">=",
    text: "supérieur ou égal à",
    useInput: true,
    query: (key, value) => value && query(key, value, (k, v) => ({ range: { [k]: { gte: v } } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: "<=",
    text: "inférieur ou égal à",
    useInput: true,
    query: (key, value) => value && query(key, value, (k, v) => ({ range: { [k]: { lte: v } } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: ">",
    text: "strictement supérieur à",
    useInput: true,
    query: (key, value) => value && query(key, value, (k, v) => ({ range: { [k]: { gt: v } } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: "<",
    text: "strictement inférieur à",
    useInput: true,
    query: (key, value) => value && query(key, value, (k, v) => ({ range: { [k]: { lt: v } } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: "∃",
    text: "existe",
    useInput: false,
    query: key =>
      query(key, null, k => ({
        bool: {
          // Must exists ...
          must: { exists: { field: k } },
          // ... and must be not empty.
          must_not: { term: { [k]: "" } }
        }
      }))
  },
  {
    value: "!∃",
    text: "n'existe pas",
    useInput: false,
    query: key =>
      query(key, null, k => ({
        bool: {
          // Should be ...
          should: [
            // ... empty string ...
            { term: { [k]: "" } },
            // ... or not exists.
            { bool: { must_not: { exists: { field: k } } } }
          ],
          filter:[{
            script: {
                script : "doc['"+k+"'].values.length <= 1"
            }
          }],
          minimum_should_match: 1
        }
      }))
  }
];

export function CollapsableFacet({ initialCollapsed, title, ...rest }) {
  initialCollapsed = initialCollapsed !== undefined ? initialCollapsed : true;
  initialCollapsed = !(rest.initialValue && rest.initialValue.length);
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  function handleToggle(collapsed) {
    setCollapsed(!collapsed);
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

export function useEventListener(eventName, handler, element) {
  // Create a ref that stores handler
  const savedHandler = useRef();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    if(!element){
      element = window;
    }
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);
      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}