import React from "react";
import qs from "qs";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import { Button } from "reactstrap";
import { QueryBuilder } from "pop-shared";
import fetch from "isomorphic-fetch";
import { history } from "../../../redux/store";
import { es_url } from "../../../config";
import excelIcon from "../../../assets/microsoftexcel.svg";

export default class ExportComponent extends React.Component {
  state = { run: false };

  renderButton() {
    if (this.state.run) {
      return <div />;
    }
    return (
      <Button
        color="success"
        onClick={() => {
          this.setState({ run: true });
        }}
      >
        <img src={excelIcon} />
        Exporter
      </Button>
    );
  }

  exec(res) {
    const d = new Date();
    const date = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    const minutes = ("0" + d.getMinutes()).slice(-2);
    const hours = ("0" + d.getHours()).slice(-2);
    const secondes = ("0" + d.getSeconds()).slice(-2);
    const fileName = `${
      this.props.collection
    }_${year}${month}${date}_${hours}h${minutes}m${secondes}s.csv`;
    exportData(fileName, res);
    this.setState({ run: false });
  }

  async onChange(next) {
    const { collection } = this.props;
    let docs = [];
    const headers = {
      Accept: "application/json",
      "User-Agent": "POP Prod",
      "Content-Type": "application/x-ndjson"
    };

    try {
      // First "iteration", send parameters, and get results + scroll_id.
      let rawResponse = await fetch(`${es_url}/scroll?index=${collection}`, {
        method: "POST",
        headers,
        body: `${JSON.stringify({ ...next, size: 1000 })}\n`
      });
      let response = await rawResponse.json();
      const scrollId = response._scroll_id;
      let hits = response.hits.hits.map(e => e._source);
      docs = hits;

      // Next iterations, send scroll_id, get results.
      while (hits && hits.length) {
        rawResponse = await fetch(`${es_url}/scroll?scroll_id=${scrollId}`, {
          method: "POST",
          headers
        });
        response = await rawResponse.json();
        hits = response.hits.hits.map(e => e._source);
        docs = [...docs, ...hits];
      }

      // We've got all docs, convert it now.
      // TODO: stream the result to preserve client memory and not to crash the browser.
      this.exec(docs);
    } catch (e) {
      this.setState({ run: false });
    }
  }

  renderExporting() {
    if (!this.state.run) {
      return <div />;
    }
    return (
      <ReactiveComponent
        componentId="export"
        react={{ and: this.props.FILTER }}
        defaultQuery={() => ({ aggs: {} })}
        onQueryChange={async (prev, next) => !prev && this.onChange(next)}
      >
        <Loading />
      </ReactiveComponent>
    );
  }

  render() {
    return (
      <div className="export-btn text-center">
        {this.renderButton()}
        {this.renderExporting()}
      </div>
    );
  }
}

function Loading() {
  const style = {
    border: "2px solid transparent",
    borderTop: "2px solid #720c32",
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    animation: "spin 2s linear infinite",
    display: "inline-block"
  };
  return (
    <div>
      <div>
        <span className="spin" style={style} /> Chargement en cours
      </div>
    </div>
  );
}

async function exportData(fileName, entities) {
  if (!entities.length) {
    return;
  }

  const columns = ["REF"];
  for (let property in entities[0]) {
    // Nobody ask for "POP_" fields and I think there gonna be complains if
    // I export something people dont understand
    if (property.indexOf("_") === 0) {
      continue;
    }
    if (property.indexOf("highlight") === 0) {
      continue;
    }
    //keep REF at the beginning
    if (property === "REF") {
      continue;
    }
    columns.push(property);
  }

  const csv = [];

  // Add a first line with query parameters.
  const search = qs.parse(history.location.search, { ignoreQueryPrefix: true });

  if (search) {
    if (search.q) {
      // Get an array of queries with rules as text.

      const queries = search.q.map(s => {
        const operatorAsText = QueryBuilder.operators.filter(o => s.operator === o.value)[0].text;
        const combinatorAsText = s.combinator.toLowerCase();
        return `${combinatorAsText} ${s.key} ${operatorAsText} ${s.value}`;
      });

      // Transform the whole queries into readable text.
      const queryAsText = queries
        .join(" ")
        .replace(/"/g, '""')
        .replace(/^(et|ou) /, "");
      // Ads this text on first line
      csv.push(`"Critères de recherche : ${queryAsText}"`);
    } else {
      const arr = Object.keys(search).map(e => `${e}=${search[e]}`);
      const queryAsText = arr.join(" ");
      csv.push(`"Critères de recherche : ${queryAsText}"`);
    }
  }

  csv.push(columns.join(";"));

  for (let j = 0; j < entities.length; j++) {
    const arr = [];
    for (let i = 0; i < columns.length; i++) {
      let value = entities[j][columns[i]];

      console.log("value", value);
      if (Array.isArray(value)) {
        // MEMOIRE is now a complex object, we just want refs
        if (columns[i] === "MEMOIRE") {
          value = value.filter(e => e).map(e => e.ref);
        }
        if (value.length && typeof value[0] === "object") {
          console.log("value", value);
          value = JSON.stringify(value);
        } else {
          value = value.join(";");
        }
      }
      if (!value) value = "";
      value = JSON.stringify(value);
      value = ("" + value).replace(/"/g, '""');
      arr.push('"' + value + '"');
    }
    csv.push(arr.join(";"));
  }

  initiateFileDownload(csv.join("\n"), fileName);
}

function initiateFileDownload(csv, fileName) {
  let blob = new Blob([csv]);
  if (window.navigator.msSaveOrOpenBlob)
    // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
    window.navigator.msSaveBlob(blob, fileName);
  else {
    let a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, {
      type: "text/plain;charset=UTF-8"
    });
    a.download = fileName;
    document.body.appendChild(a);
    a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
    document.body.removeChild(a);
  }
}
