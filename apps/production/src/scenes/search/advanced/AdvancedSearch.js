import React, { useState, useEffect } from "react";
import {
  Elasticsearch,
  Results,
  toUrlQueryString,
  fromUrlQueryString,
  QueryBuilder
} from "react-elasticsearch";
import Mapping from "../../../services/Mapping";
import { Container } from "reactstrap";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import ExportComponent from "../components/ExportComponent";
import utils from "../components/utils";

const operators = [
  { value: "==", text: "égal à", useInput: true },
  { value: "!=", text: "différent de", useInput: true },
  { value: ">=", text: "supérieur ou égal à", useInput: true },
  { value: "<=", text: "inférieur ou égal à", useInput: true },
  { value: ">", text: "strictement supérieur à", useInput: true },
  { value: "<", text: "strictement inférieur à", useInput: true },
  { value: "∃", text: "existe", useInput: false },
  { value: "!∃", text: "n'existe pas", useInput: false },
  { value: "*", text: "contient", useInput: true },
  { value: "^", text: "commence par", useInput: true }
];

export default function AdvancedSearch({ collection, card }) {
  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  const fields = Object.entries(Mapping[collection]).map(([k, v]) => {
    return { value: `${k}.keyword`, text: `${k} - ${v.label}` };
  });

  const [sortKey, setSortKey] = useState(initialValues.get("sortKey") || "REF.keyword");
  const [sortOrder, setSortOrder] = useState(initialValues.get("sortOrder") || "desc");
  const [sortQuery, setSortQuery] = useState([{ [sortKey]: { order: sortOrder } }]);

  useEffect(() => {
    setSortQuery([{ [sortKey]: { order: sortOrder } }]);
  }, [sortKey, sortOrder]);

  return (
    <Container className="search">
      <Header base={collection} normalMode={false} />
      <Elasticsearch
        url={`${es_url}/${collection}`}
        onChange={values => {
          if (values.size) {
            values.set("sortKey", sortKey);
            values.set("sortOrder", sortOrder);
          }
          const q = toUrlQueryString(values);
          if (q) {
            window.history.replaceState("x", "y", `?${q}`);
          }
        }}
      >
        <QueryBuilder
          initialValue={initialValues.get("qb")}
          id="qb"
          fields={fields}
          operators={operators}
          autoComplete={true}
          combinators={[{ value: "AND", text: "ET" }, { value: "OR", text: "OU" }]}
        />
        <div className="text-center my-3">
          Trier par:{" "}
          <select className="ml-2" onChange={e => setSortKey(e.target.value)} value={sortKey}>
            {Object.keys(Mapping[collection])
              .filter(e => !["TICO", "TITR", "__v", "__id"].includes(e))
              .map(e => (
                <option key={e} value={`${e}.keyword`}>
                  {e}
                </option>
              ))}
          </select>
          <select className="ml-2" onChange={e => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
          </select>
        </div>
        <Results
          sort={sortQuery}
          id="result"
          initialPage={initialValues.get("resultPage")}
          item={card}
          pagination={utils.pagination}
          stats={total => <div>{total} résultat{total === 1 ? "" : "s"}</div>}
        />
        <ExportComponent collection={collection} target="qb" />
      </Elasticsearch>
    </Container>
  );
}
