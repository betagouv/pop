import React from "react";
import { DataSearch } from "@appbaseio/reactivesearch";

class Search extends React.Component {
  render() {
    return (
      <DataSearch
        componentId="mainSearch"
        autosuggest={false}
        filterLabel="Résultats pour "
        dataField={["TICO", "TITR", "AUTP", "DENO", "AUTR", "AUTOR"]}
        iconPosition="left"
        className="mainSearch"
        placeholder="Saisissez un titre, une dénomination ou une localisation"
        URLParams={true}
        customQuery={(value, props) => {
          if (!value) {
            return {
              query: { match_all: {} }
            };
          }
          return {
            bool: {
              should: [
                {
                  multi_match: {
                    query: value,
                    type: "phrase",
                    fields: ["TICO", "TITRE", "TITR", "LEG"],
                    boost: 15
                  }
                },
                {
                  multi_match: {
                    query: value,
                    type: "most_fields",
                    fields: [
                      "TICO^10",
                      "AUTR^10",
                      "TITRE^9",
                      "TITR^9",
                      "LEG^9",
                      "LOCA^9",
                      "DENO^8",
                      "DOMN^8",
                      "EDIF^8",
                      "OBJT^8",
                      "REPR^8",
                      "AUTP^7",
                      "SERIE^7",
                      "PDEN^5",
                      "PERS^4",
                      "PAYS^3",
                      "REG^3",
                      "DEP^3",
                      "COM^3",
                      "DATE^1",
                      "EPOQ^1",
                      "SCLE^1",
                      "SCLD^1"
                    ]
                  }
                }
              ]
            }
          };
        }}
      />
    );
  }
}

export default Search;
