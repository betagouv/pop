import React from "react";
import Mapping from "../../../services/Mapping";
import Card from "../components/JocondeCard";
import { Row, Col, Container, Button, Modal, Input } from "reactstrap";
import AdvancedSearch from "./AdvancedSearch";
import { es_url } from "../../../config.js";
import {
  Elasticsearch,
  Results,
  toUrlQueryString,
  fromUrlQueryString,
  QueryBuilder
} from "react-elasticsearch";

export default function Joconde() {
  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  const fields = Object.entries(Mapping.joconde).map(([k, v]) => {
    return { value: `${k}.keyword`, text: `${k} - ${v.label}` };
  });
  console.log(fields);
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
        <Results
          id="result"
          initialPage={initialValues.get("resultPage")}
          item={s => <Card data={s} />}
        />
      </Elasticsearch>
    </Container>
  );
}
