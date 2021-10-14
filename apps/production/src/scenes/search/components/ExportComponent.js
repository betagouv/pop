import React, { useState, useEffect } from "react";
import qs from "qs";
import utils from "./utils";
import fetch from "isomorphic-fetch";
import { es_url } from "../../../config";
import excelIcon from "../../../assets/microsoftexcel.svg";
import { CustomWidget } from "react-elasticsearch-pop";

export default function ExportComponent({ collection, target, header }) {
  const [exporting, setExporting] = useState(false);

  if (exporting) {
    return (
      <CustomWidget>
        <Loading
          collection={collection}
          header={header}
          onFinish={() => setExporting(false)}
          target={target}
        />
      </CustomWidget>
    );
  }

  return (
    <button className="export-collection" onClick={() => setExporting(true)}>
      <img src={excelIcon} />
      Exporter
    </button>
  );
}

function Loading({ onFinish, collection, ctx, target, header }) {
  useEffect(() => {
    async function exportAndDownload(query) {
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
          body: `${JSON.stringify({ query, size: 1000 })}\n`
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
        // TODO: stream the result to preserve client memory and not to crash the browser.
        const d = new Date();
        const date = ("0" + d.getDate()).slice(-2);
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear();
        const minutes = ("0" + d.getMinutes()).slice(-2);
        const hours = ("0" + d.getHours()).slice(-2);
        const secondes = ("0" + d.getSeconds()).slice(-2);
        const fileName = `${collection}_${year}${month}${date}_${hours}h${minutes}m${secondes}s.csv`;
        exportData(fileName, docs, header);
        onFinish();
      } catch (e) {
        console.log(e);
        onFinish();
      }
    }

    const queries = [];
    for (let w of ctx.widgets.values()) {
      if (w && w.query) {
        queries.push(w.query);
      }
    }
    const query = { bool: { must: queries.length === 0 ? { match_all: {} } : queries } };
    exportAndDownload(query);
  }, []);

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

async function exportData(fileName, entities, header) {
  if (!entities.length) {
    return;
  }

  const columns = Object.keys(entities[0]).filter(e => {
    if (e.startsWith("_")) {
      return false;
    }
    if (e.startsWith("highlight")) {
      return false;
    }
    return true;
  });

  //Si export de museo, on enlève la colonne POP_COORDONNEES
  //Pour remplacer par POP_COORDONNEES.lat et lon
  if(entities[0].BASE == "Répertoire des Musées de France (Muséofile)"){
    columns.splice(columns.indexOf("POP_COORDONNEES"), 1);
    columns.push("POP_COORDONNEES.lat");
    columns.push("POP_COORDONNEES.lon");
  }

  columns.sort((a, b) => {
    if (a === "REF") {
      return -1;
    }
    if (b === "REF") {
      return 1;
    }
    if (a.startsWith("POP_") && !b.startsWith("POP_")) {
      return -1;
    }
    if (b.startsWith("POP_") && !a.startsWith("POP_")) {
      return 1;
    }
    return a.localeCompare(b);
  });

  const csv = [];

  // Add a first line with query parameters.
  const search = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  if (search && header) {
    if (search.qb) {
      // Get an array of queries with rules as text.
      const queries = JSON.parse(search.qb).map(s => {
        const operatorAsText = utils.operators.filter(o => s.operator === o.value)[0].text;
        const combinatorAsText = s.combinator.toLowerCase() === "and" ? "et" : "ou";
        return `${combinatorAsText} ${s.field.replace(".keyword", "")} ${operatorAsText} ${
          s.value
        }`;
      });

      // Transform the whole queries into readable text (Corrected for export mantis)
      const queryAsText = queries
        .join(" ")
        .replace(/"/g, '""')
        .replace(/^(et|ou) /, "");
      // Ads this text on first line
      csv.push(`"Critères de recherche : ${queryAsText.replace(/"/g,"")}"`);
    } else {
      const arr = Object.keys(search).map(e => `${e}=${search[e]}`);
      const queryAsText = arr.join(" ");
      csv.push(`"Critères de recherche : ${queryAsText.replace(/"/g,"")}"`);
    }
  }

  csv.push(columns.join(";"));

  for (let j = 0; j < entities.length; j++) {
    const arr = [];
    for (let i = 0; i < columns.length; i++) {
      let value = entities[j][columns[i]];
      if (Array.isArray(value)) {
        // MEMOIRE is now a complex object, we just want refs
        if (columns[i] === "MEMOIRE") {
          value = value.filter(e => e).map(e => e.ref);
        }
        if (value.length && typeof value[0] === "object") {
          value = JSON.stringify(value);
        } else {
          value = value.join(";");
        }
      }
      if (!value) value = "";

      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      value = ("" + value).replace(/"/g, '""');

      //Traitement spécifique pour la base Muséofile
      if(entities[j].BASE == "Répertoire des Musées de France (Muséofile)"){
        if(columns[i] == "POP_COORDONNEES.lat" ){
          value = entities[j].POP_COORDONNEES.lat || "";
        }
        if(columns[i] == "POP_COORDONNEES.lon" ){
          value = entities[j].POP_COORDONNEES.lon || "";
        }
      }
      
      if(typeof value == "string"){
        value = value.replace(/\0/g, '');
      }
      
      arr.push(`"${value}"`);
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
