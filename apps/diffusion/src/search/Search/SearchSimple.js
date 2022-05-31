import React from "react";
import { SearchBox } from "@popproject/pop-react-elasticsearch";

function customQuery(query, fields) {
  // No value, return all documents.
  if (!query) {
    return { match_all: {} };
  }

  // If it "seems" to be a query_string (contains `"foo"`, ` +bar` or ` -baz`)
  // treat it as a query_string (they will love that).
  if (query.match(/"[^"]*"| -| \+/)) {
    return { simple_query_string: { query, default_operator: "and", fields } };
  }

  // Otherwise build a complex query with these rules (by boost order):
  // 1 - strict term in fields (boost 5)
  const strict = {
    multi_match: {
      query,
      operator: "and",
      fields: fields.map(f => f.replace("^", ".strict^")),
      boost: 4
    }
  };

  // 2 - strict term in fields, cross_fields
  const strictCross = {
    multi_match: {
      query,
      operator: "and",
      fields: fields.map(f => f.replace("^", ".strict^")),
      type: "cross_fields",
      boost: 2
    }
  };

  // 3 - fuzzy (all terms must be present)
  const fuzzy = {
    multi_match: { query, operator: "and", fields, type: "cross_fields" }
  };

  // Return the whole query with all rules
  return { bool: { should: [strict, strictCross, fuzzy] } };
}

export default function SearchSimple({ initialValues }) {
  return (
    <SearchBox
      id="mainSearch"
      placeholder="Saisissez un titre, une dénomination ou une localisation"
      initialValue={initialValues.get("mainSearch")}
      customQuery={value =>
        customQuery(value, [
          "TICO^10",
          "AUTR^10",
          "NOM^10",
          "PREN^10",
          "TITRE^9",
          "TITR^9",
          "LEG^9",
          "LOCA^9",
          "AUTOEU^9",
          "AUTOR^9",
          "AUTG^9",
          "NOMOFF^9",
          "NOMUSAGE^9",
          "VILLE_M^9",
          "DPT^9",
          "DENO^8",
          "DOMN^8",
          "DOMPAL^8",
          "EDIF^8",
          "OBJT^8",
          "REPR^8",
          "FONC^8",
          "AUTP^7",
          "SERIE^7",
          "PDEN^5",
          "PERS^4",
          "PAYS^3",
          "REG^3",
          "COM^3",
          "SUJET^3",
          "HIST^2",
          "TYPE^1",
          "DATE^1",
          "EPOQ^1",
          "SCLE^1",
          "SCLD^1"
        ])
      }
    />
  );
}
