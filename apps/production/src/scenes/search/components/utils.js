import React from "react";
import { Pagination } from "react-elasticsearch";
import { Alert } from "reactstrap";

function generateLoca(notice) {
  const arr = [];
  if (Array.isArray(notice.REG) && notice.REG.length > 0){ 
    for(let i=0; i<notice.REG.length; i++){
      arr.push(notice.REG[i]);
    }
  }
  if (Array.isArray(notice.DPT) && notice.DPT.length > 0){
    for(let i=0; i<notice.DPT.length; i++){
      arr.push(departmentText(notice.DPT[i]));
    }
  }

  //Si WCOM existe, on affiche WCOM, sinon on affiche COM s'il existe
  if ((Array.isArray(notice.WCOM) && notice.WCOM.length > 0) || (Array.isArray(notice.COM) && notice.COM.length > 0)) {
    if (Array.isArray(notice.WCOM) && notice.WCOM.length > 0){
      for(let i=0; i<notice.WCOM.length; i++){
        arr.push(notice.WCOM[i]);
      }
    }
    else {
      for(let i=0; i<notice.COM.length; i++){
        arr.push(notice.COM[i]);
      }
    }
  }

  if (notice.EDIF){
    arr.push(notice.EDIF);
  }

  //Si WADRS existe, on affiche WADRS, sinon on affiche ADRS s'il existe
  if (notice.WADRS || notice.ADRS) {
    if (notice.WADRS){
      arr.push(notice.WADRS);
    }
    else {
      arr.push(notice.ADRS);
    }
  }

  return arr.join(", ");
}

function departmentText(v) {
  return (
    {
      "01": "Ain",
      "02": "Aisne",
      "03": "Allier",
      "04": "Alpes-de-Haute-Provence",
      "05": "Hautes-Alpes",
      "06": "Alpes-Maritimes",
      "07": "Ardèche",
      "08": "Ardennes",
      "09": "Ariège",
      "10": "Aube",
      "11": "Aude",
      "12": "Aveyron",
      "13": "Bouches-du-Rhône",
      "14": "Calvados",
      "15": "Cantal",
      "16": "Charente",
      "17": "Charente-Maritime",
      "18": "Cher",
      "19": "Corrèze",
      "21": "Côte-d'Or",
      "22": "Côtes-d'Armor",
      "23": "Creuse",
      "24": "Dordogne",
      "25": "Doubs",
      "26": "Drôme",
      "27": "Eure",
      "28": "Eure-et-Loir",
      "29": "Finistère",
      "2A": "Corse-du-Sud",
      "2B": "Haute-Corse",
      "30": "Gard",
      "31": "Haute-Garonne",
      "32": "Gers",
      "33": "Gironde",
      "34": "Hérault",
      "35": "Ille-et-Vilaine",
      "36": "Indre",
      "37": "Indre-et-Loire",
      "38": "Isère",
      "39": "Jura",
      "40": "Landes",
      "41": "Loir-et-Cher",
      "42": "Loire",
      "43": "Haute-Loire",
      "44": "Loire-Atlantique",
      "45": "Loiret",
      "46": "Lot",
      "47": "Lot-et-Garonne",
      "48": "Lozère",
      "49": "Maine-et-Loire",
      "50": "Manche",
      "51": "Marne",
      "52": "Haute-Marne",
      "53": "Mayenne",
      "54": "Meurthe-et-Moselle",
      "55": "Meuse",
      "56": "Morbihan",
      "57": "Moselle",
      "58": "Nièvre",
      "59": "Nord",
      "60": "Oise",
      "61": "Orne",
      "62": "Pas-de-Calais",
      "63": "Puy-de-Dôme",
      "64": "Pyrénées-Atlantiques",
      "65": "Hautes-Pyrénées",
      "66": "Pyrénées-Orientales",
      "67": "Bas-Rhin",
      "68": "Haut-Rhin",
      "69": "Rhône",
      "70": "Haute-Saône",
      "71": "Saône-et-Loire",
      "72": "Sarthe",
      "73": "Savoie",
      "74": "Haute-Savoie",
      "75": "Paris",
      "76": "Seine-Maritime",
      "77": "Seine-et-Marne",
      "78": "Yvelines",
      "79": "Deux-Sèvres",
      "80": "Somme",
      "81": "Tarn",
      "82": "Tarn-et-Garonne",
      "83": "Var",
      "84": "Vaucluse",
      "85": "Vendée",
      "86": "Vienne",
      "87": "Haute-Vienne",
      "88": "Vosges",
      "89": "Yonne",
      "90": "Territoire de Belfort",
      "91": "Essonne",
      "92": "Hauts-de-Seine",
      "93": "Seine-Saint-Denis",
      "94": "Val-de-Marne",
      "95": "Val-d'Oise",
      "971": "Guadeloupe",
      "972": "Martinique",
      "973": "Guyane",
      "974": "La Réunion"
    }[v] || v
  );
}

function customQuery(query, primaryFields, secondaryFields = []) {
  const fields = [...primaryFields, ...secondaryFields];

  // No value, return all documents.
  if (!query) {
    return { match_all: {} };
  }

  // If it "seems" to be to be a query_string (contains `"foo"`, ` +bar` or ` -baz`)
  // treat it as a query_string (they will love that).
  if (query.match(/"[^"]*"| -| \+/)) {
    return { simple_query_string: { query, default_operator: "and", fields } };
  }

  // Otherwise build a complex query with these rules (by boost order):
  // 1 - exact ref (boost 10)
  const exactRef = { term: { "REF.keyword": { value: query, boost: 10 } } };

  // 2 - exact term in fields (boost 10)
  const exactTerm = fields.map(f => ({
    term: { [`${f}.keyword`]: { value: query, boost: 10 } }
  }));

  // 3 - strict term in fields (boost 5)
  const strict = {
    multi_match: { query, operator: "and", fields: fields.map(f => `${f}.strict`), boost: 5 }
  };

  // 4 - strict term in fields, cross_fields
  const strictCross = {
    multi_match: {
      query,
      operator: "and",
      fields: fields.map(f => `${f}.strict`),
      type: "cross_fields",
      boost: 2
    }
  };

  // 5 - fuzzy (all terms must be present)
  const fuzzy = {
    multi_match: { query, operator: "and", fields, type: "cross_fields" }
  };

  // Return the whole query with all rules
  return { bool: { should: [exactRef, ...exactTerm, strict, strictCross, fuzzy] } };
}

// This function transforms a text to a french compatible regex.
// So this:
// "Voilà un château éloigné"
// Turns to that:
// "[Vv][oôöOÔÖ][iïîIÏÎ]l[àâäaÀÂÄA] [uùûüUÙÛÜ]n [cçÇC]h[àâäaÀÂÄA]t[éèêëeÉÈÊËE][àâäaÀÂÄA][uùûüUÙÛÜ] [éèêëeÉÈÊËE]l[oôöOÔÖ][iïîIÏÎ]gn[éèêëeÉÈÊËE]"
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

function pagination(total, itemsPerPage, page, setPage) {
  const pagination = (
    <Pagination onChange={p => setPage(p)} total={total} itemsPerPage={itemsPerPage} page={page} />
  );
  if (page === 1000) {
    return (
      <>
        <Alert color="warning">
          Afin de garantir une navigation fluide pour l'ensemble des utilisateurs, seules les 10.000
          premières notices sont affichées. Cliquez sur « Exporter » pour obtenir la liste complète
          ou affinez votre recherche.
        </Alert>
        {pagination}
      </>
    );
  }
  return pagination;
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
    return { bool: { [shouldOrMust]: key.map(k => cb(k, value)) } };
  }
  return cb(key, value);
}
const operators = [
  {
    value: "===",
    text: "égal à (recherche stricte)",
    useInput: true,
    query: (key, value) => value && query(key, value, (k, v) => ({ term: { [k]: v } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: "!==",
    text: "différent de (recherche stricte)",
    useInput: true,
    query: (key, value) =>
      value && query(key, value, (k, v) => ({ bool: { must_not: { term: { [k]: v } } } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
  },
  {
    value: "===*",
    text: "contient (recherche stricte)",
    useInput: true,
    query: (key, value) => value && query(key, value, (k, v) => ({ wildcard: { [k]: `*${v}*` } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${escapeRegex(value)}.*`)
  },
  {
    value: "!==*",
    text: "ne contient pas (recherche stricte)",
    useInput: true,
    query: (key, value) =>
      value &&
      query(key, value, (k, v) => ({ bool: { must_not: { wildcard: { [k]: `*${v}*` } } } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${escapeRegex(value)}.*`)
  },
  {
    value: "===^",
    text: "commence par (recherche stricte)",
    useInput: true,
    query: (key, value) => value && query(key, value, (k, v) => ({ wildcard: { [k]: `${v}*` } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${escapeRegex(value)}.*`)
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
    value: "!=",
    text: "différent de",
    useInput: true,
    query: (key, value) =>
      value &&
      query(key, value, (k, v) => ({ bool: { must_not: { regexp: { [k]: notStrict(v) } } } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${notStrict(value)}.*`)
  },
  {
    value: "*",
    text: "contient",
    useInput: true,
    query: (key, value) =>
      value && query(key, value, (k, v) => ({ regexp: { [k]: `.*${notStrict(v)}.*` } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `.*${notStrict(value)}.*`)
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
    value: "^",
    text: "commence par",
    useInput: true,
    query: (key, value) =>
      value && query(key, value, (k, v) => ({ regexp: { [k]: `${notStrict(v)}.*` } })),
    suggestionQuery: (key, value) => suggestionQuery(key, `${notStrict(value)}.*`)
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

export default {
  pagination,
  generateLoca,
  customQuery,
  toFrenchRegex,
  operators
};
