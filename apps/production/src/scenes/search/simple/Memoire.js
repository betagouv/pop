import React from "react";
import { Row, Col, Container } from "reactstrap";
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  SelectedFilters
} from "@appbaseio/reactivesearch/lib";
import { MultiList } from "pop-shared";
import ExportComponent from "../components/export";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import Card from "../components/MemoireCard";
import utils from "../components/utils";

const FILTER = [
  "mainSearch",
  "dom",
  "autp",
  "producteur",
  "loca",
  "region",
  "departement",
  "commune",
  "pays"
];

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortOrder: "asc",
      sortKey: "REF"
    };
  }

  render() {
    return (
      <Container className="search">
        <Header base="memoire" normalMode={true} />
        <ReactiveBase url={`${es_url}/memoire`} app="memoire">
          <div>
            <div className="search-and-export-zone">
              <DataSearch
                componentId="mainSearch"
                dataField={[]}
                iconPosition="left"
                className="mainSearch"
                placeholder="Saisissez un titre, une dénomination, une reference ou une localisation"
                URLParams={true}
                customQuery={(value, props) => utils.customQuery(value, ["COM", "TICO", "DENO", "LOCA"], ["EDIF"])
                  /*
                  if (!value) {
                    return {
                      query: { match_all: {} }
                    };
                  }
                  if (value.match(/"[^"]*"| -| \+/)) {
                    return {
                      query: {
                        simple_query_string: {
                          query: value,
                          default_operator: "and",
                          fields: ["COM", "TICO", "DENO", "REF", "LOCA", "EDIF"]
                        }
                      }
                    };
                  }
                  return {
                    bool: {
                      should: [
                        // 1 - exact ref
                        { term: { "REF.keyword": { value, boost: 5 } } },
                        
                        // 2 - exact term
                        { term: { "COM.keyword": { value, boost: 5 } } },
                        { term: { "TICO.keyword": { value, boost: 5 } } },
                        { term: { "DENO.keyword": { value, boost: 5 } } },
                        { term: { "LOCA.keyword": { value, boost: 5 } } },

                        // 3 - fuzzy term
                        { fuzzy: { "COM.keyword": { value, boost: 2 } } },
                        { fuzzy: { "TICO.keyword": { value, boost: 2 } } },
                        { fuzzy: { "DENO.keyword": { value, boost: 2 } } },
                        { fuzzy: { "LOCA.keyword": { value, boost: 2 } } },

                        // 4 - contains all words
                        {
                          simple_query_string: {
                            query: value.replace(/ +?/g, " +"),
                            default_operator: "and",
                            fields: ["COM", "TICO", "DENO", "LOCA"]
                          }
                        },

                        // 5 - contains "something"
                        {
                          multi_match: {
                            query: value,
                            type: "best_fields",
                            fields: ["COM", "EDIF", "DENO", "LOCA", "EDIF"],
                            boost: 0.5
                          }
                        }
                      ]
                    }
                  };
                  */
                }
              />
              <ExportComponent FILTER={FILTER} collection="memoire" />
            </div>
            <Row>
              <Col xs="3">
                <MultiList
                  componentId="dom"
                  dataField="DOM.keyword"
                  title="Domaine"
                  className="filters"
                  URLParams={true}
                  displayCount
                  react={{ and: FILTER.filter(e => e !== "dom") }}
                />
                <MultiList
                  componentId="producteur"
                  dataField="PRODUCTEUR.keyword"
                  title="Producteur"
                  className="filters"
                  displayCount
                  URLParams={true}
                  react={{ and: FILTER.filter(e => e !== "producteur") }}
                />
                <MultiList
                  componentId="autp"
                  dataField="AUTP.keyword"
                  title="Auteurs"
                  className="filters"
                  displayCount
                  sortByName={true}
                  URLParams={true}
                  react={{ and: FILTER.filter(e => e !== "autp") }}
                />
                <MultiList
                  componentId="loca"
                  dataField="LOCA.keyword"
                  title="Localisation"
                  displayCount
                  sortByName={true}
                  className="filters"
                  URLParams={true}
                  react={{ and: FILTER.filter(e => e !== "loca") }}
                />
                <MultiList
                  componentId="pays"
                  dataField="PAYS.keyword"
                  title="Pays"
                  displayCount
                  sortByName={true}
                  className="filters"
                  URLParams={true}
                  react={{ and: FILTER.filter(e => e !== "pays") }}
                />

                <MultiList
                  componentId="region"
                  dataField="REG.keyword"
                  title="Région"
                  displayCount
                  sortByName={true}
                  className="filters"
                  URLParams={true}
                  react={{ and: FILTER.filter(e => e !== "region") }}
                />
                <MultiList
                  componentId="departement"
                  dataField="DPT.keyword"
                  title="Département"
                  displayCount
                  sortByName={true}
                  className="filters"
                  URLParams={true}
                  react={{ and: FILTER.filter(e => e !== "departement") }}
                />
                <MultiList
                  componentId="commune"
                  dataField="COM.keyword"
                  title="Commune"
                  displayCount
                  sortByName={true}
                  className="filters"
                  URLParams={true}
                  react={{ and: FILTER.filter(e => e !== "commune") }}
                />
              </Col>
              <Col xs="9">
                <SelectedFilters clearAllLabel="Tout supprimer" />
                <ReactiveList
                  componentId="results"
                  react={{ and: FILTER }}
                  onResultStats={(total, took) => {
                    if (total === 1) {
                      return `1 résultat`;
                    }
                    return `${total} résultats`;
                  }}
                  onNoResults="Aucun résultat trouvé."
                  loader="Préparation de l'affichage des résultats..."
                  dataField=""
                  URLParams={true}
                  size={20}
                  onData={data => <Card key={data.REF} data={data} />}
                  pagination={true}
                />
              </Col>
            </Row>
          </div>
        </ReactiveBase>
      </Container>
    );
  }
}
