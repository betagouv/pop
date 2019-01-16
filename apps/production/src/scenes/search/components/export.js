import React from "react";
import { ReactiveComponent } from "@appbaseio/reactivesearch";
import { Button } from "reactstrap";
import { history } from "../../../redux/store";
import operators from "./QueryBuilder/operators";
import qs from "qs";

export default class ExportComponent extends React.Component {
  state = {
    page: 0,
    run: false,
    res: []
  };

  renderButton() {
    if (this.state.run) {
      return <div />;
    }
    return (
      <Button color="primary" onClick={this.run}>
        Exporter les résultats
      </Button>
    );
  }

  run = () => {
    this.setState({ res: [], page: 0, run: true });
  };

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
    this.setState({ res: [], page: 0, run: false });
  }

  renderExporting() {
    if (!this.state.run) {
      return <div />;
    }
    return (
      <ReactiveComponent
        componentId="export"
        react={{ and: this.props.FILTER }}
        onAllData={(results, streamResults, loadMoreData) => {
          const res = this.state.res.concat(results);
          if (!results.length || res.length >= 9980) {
            this.exec(res);
          } else {
            this.setState({ page: (this.state.page += 1), res });
          }
        }}
        defaultQuery={() => ({
          size: 20,
          from: this.state.page * 20,
          aggs: {}
        })}
      >
        <Exp len={this.state.res.length} />
      </ReactiveComponent>
    );
  }

  render() {
    return (
      <div className="text-center">
        {this.renderButton()}
        {this.renderExporting()}
      </div>
    );
  }
}

const Exp = ({ len }) => {
  return (
    <div>
      <div>Récuperation des notices... {len}</div>
    </div>
  );
};

async function exportData(fileName, entities) {
  if (!entities.length) {
    return;
  }

  const columns = ["REF"];
  for (let property in entities[0]) {
    if (
      property.indexOf("_") !== 0 &&
      property.indexOf("POP_") !== 0 && //because nobody ask for those fields and I think there gonna be complains if I export something people dont understand
      property.indexOf("highlight") !== 0 &&
      property !== "REF"
    ) {
      columns.push(property);
    }
  }

  const csv = [];

  // Add a first line with query parameters.
  const search = qs.parse(history.location.search, { ignoreQueryPrefix: true });
  if (search && search.q) {
    // Get an array of queries with rules as text.
    const queries = search.q.map(s => {
      const operatorAsText = operators.filter(o => s.operator === o.value)[0]
        .text;
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
  }

  csv.push(columns.join(";"));

  for (let j = 0; j < entities.length; j++) {
    const arr = [];
    for (let i = 0; i < columns.length; i++) {
      let value = entities[j][columns[i]];
      if (Array.isArray(value)) {
        value = value.join(";");
      }
      if (!value) value = "";
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
