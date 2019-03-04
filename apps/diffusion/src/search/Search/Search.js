import React from "react";
import { DataSearch } from "@appbaseio/reactivesearch";
import amplitudeService from "../../services/amplitude";
import { pushSearchRoute } from "../../services/url";

class Search extends React.Component {
  componentDidMount() {
    amplitudeService.logEvent("search_open");
  }
  render() {
    let defaultSelected = "";
    if (this.props.mainSearch) {
      defaultSelected = JSON.parse(this.props.mainSearch)
    }
    return (
      <DataSearch
        componentId="mainSearch"
        autosuggest={false}
        filterLabel="Résultats pour "
        dataField={["TICO", "TITR", "AUTP", "DENO", "AUTR", "AUTOR"]}
        iconPosition="left"
        className="mainSearch"
        placeholder="Saisissez un titre, une dénomination ou une localisation"
        defaultSelected={defaultSelected}
        onValueChange={v => {
          pushSearchRoute({
            mode: this.props.mode,
            view: this.props.view,
            params: { mainSearch: v }
          });
        }}
        customQuery={(value, props) => {
          if (!value) {
            return {
              query: { match_all: {} }
            };
          }

          const fields = [
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
          ];

          if (value.match(/"[^"]*"| -| \+/)) {
            return {
              query: { simple_query_string: { query: value, default_operator: "and", fields } }
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
                    fields
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
