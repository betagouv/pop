import React, { useState, useEffect } from "react";
import Mapping from "../../../services/Mapping";
import Card from "../components/JocondeCard";
import { Container } from "reactstrap";
import { es_url } from "../../../config.js";
import {
  Elasticsearch,
  Results,
  toUrlQueryString,
  fromUrlQueryString,
  QueryBuilder
} from "react-elasticsearch";
import ExportComponent from "../components/export";

export default function Joconde() {
  const [sortKey, setSortKey] = useState("PRODUCTEUR.keyword");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortQuery, setSortQuery] = useState([{ [sortKey]: { order: sortOrder } }]);

  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  const fields = Object.entries(Mapping.joconde).map(([k, v]) => {
    return { value: `${k}.keyword`, text: `${k} - ${v.label}` };
  });

  useEffect(() => {
    setSortQuery([{ [sortKey]: { order: sortOrder } }]);
  }, [sortKey, sortOrder]);

  return (
    <Container className="search">
      <Elasticsearch
        url={`${es_url}/joconde`}
        onChange={values => {
          const q = toUrlQueryString(values);
          if (q) {
            window.history.replaceState("x", "y", `?${q}`);
          }
        }}
      >
        <QueryBuilder initialValue={initialValues.get("qb")} id="qb" fields={fields} />
        Trier par:{" "}
        <select onChange={e => setSortKey(e.target.value)} value={sortKey}>
          {Object.keys(Mapping.joconde)
            .filter(e => !["TICO", "TITR"].includes(e))
            .map(e => (
              <option key={e} value={`${e}.keyword`}>
                {e}
              </option>
            ))}
        </select>
        <select onChange={e => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Ascendant</option>
          <option value="desc">Descendant</option>
        </select>
        <Results
          sort={sortQuery}
          id="result"
          initialPage={initialValues.get("resultPage")}
          item={(s, _s, id) => <Card key={id} data={s} />}
        />
        <ExportComponent collection="joconde" target="qb" />
      </Elasticsearch>
    </Container>
  );
}
