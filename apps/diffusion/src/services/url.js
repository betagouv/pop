import Router from "next/router";
import queryString from "query-string";

// Stringify an object in order to convert it to URL params
// Ex: convert `{foo: ["bar"]}` to `{foo: "[\"bar\"]"}`
const JsonStringifyValues = object => {
  const entries = Object.entries(object)
    .filter(([_k, v]) => (Array.isArray(v) ? v.length : v))
    .map(([k, v]) => v && { [k]: JSON.stringify(v) });
  return entries.length ? Object.assign(...entries) : null;
};

// Convert JSON stringified values to JS real values.
// Ex: convert `{foo: "[\"bar\"]"}` to `{foo: ["bar"]}`
const JsonParseValues = values => {
  const entries =
    values &&
    Object.entries(values).map(([k, v]) => {
      try {
        v = JSON.parse(v);
      } catch (e) {}
      return { [k]: v };
    });
  return entries.length ? Object.assign(...entries) : {};
};

const modeToRoute = mode => {
  return mode === "advanced" ? "advanced-search" : "search";
};

const differsByOneCharInMainSearch = (previous, current) => {
  return (
    previous &&
    current &&
    previous.mainSearch &&
    current.mainSearch &&
    previous.mainSearch.length &&
    Math.abs(previous.mainSearch.length - current.mainSearch.length) === 1
  );
};

export function paramsToUrlAlias(mode, view, base, qs) {
  return `/${modeToRoute(mode)}/${view}${mode === "advanced" ? `/${base}` : ""}${
    qs ? "?" + qs : ""
  }`;
}

export function replaceSearchRouteWithUrl(options = {}) {
  const { mode, view, base, url } = options;

  // Extract query string
  const qs = url.includes("?") ? url.replace(/.*?\?/, "") : "";

  // Add mode and view (because Next.js' router needs it)
  const searchFullParams = { mode, view, ...queryString.parse(qs) };
  if (mode === "advanced") {
    searchFullParams.base = base;
  }

  // Goto route
  return Router.replace(
    `/search${searchFullParams ? "?" + queryString.stringify(searchFullParams) : ""}`,
    paramsToUrlAlias(mode, view, base, qs)
  );
}

export function pushSearchRoute(options = {}) {
  const { mode, view, base } = options;
  let { params } = options;

  // Get all search params displayed in current URL as real JS values (not stringified).
  const prevParams = JsonParseValues(queryString.parse(window.location.search));

  // If it's differs by one letter in main search, just *replace* route.
  const method = differsByOneCharInMainSearch(prevParams, params) ? Router.replace : Router.push;

  // New params
  const searchParams = JsonStringifyValues({
    ...prevParams,
    ...params
  });
  // Add mode and view (because Next.js' router needs it)
  const searchFullParams = { mode, view, ...searchParams };
  if (mode === "advanced") {
    searchFullParams.base = base;
  }
  return method(
    `/search${searchFullParams ? "?" + queryString.stringify(searchFullParams) : ""}`,
    paramsToUrlAlias(mode, view, base, searchParams ? queryString.stringify(searchParams) : "")
  );
}
