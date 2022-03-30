import utils from "../utils";
import { bucket_url, pop_url } from "../../../config"

export default function generate(
  notices,
  collection,
  email,
  institution,
  importId,
  fileNames = []
) {
  const fieldToExport = [{ name: "Identifiant", key: "REF" }];
  const arr = [];

  const dateStr = utils.formatDate();

  const created = notices.filter(e => e._status === "created");
  const updated = notices.filter(e => e._status === "updated");
  const rejected = notices.filter(e => e._status === "rejected");

  const diffUrl = `${pop_url}/search/list?import=["${importId}"]`;

  const fileUrl = `${bucket_url}/import/${importId}/import.csv`;

  const imagesNumber = notices.reduce((acc, val) => {
    if (val.status === "created" || val.status === "updated") {
      return acc + val.images.length;
    }
    return acc;
  }, 0);

  let contact = "";
  switch (collection) {
    case "monuments-historiques":
      contact = "gaelle.pichon-meunier@culture.gouv.fr";
      break;
    case "mnr":
      contact = "isabelle.rouge-ducos@culture.gouv.fr";
      break;
    case "memoire":
      contact = "anne.cook@culture.gouv.fr";
      break;
    case "inventaire":
      contact = "geraud.buffa@culture.gouv.fr et jean.davoigneau@culture.gouv.fr";
      break;
    case "joconde":
      contact = "sophie.daenens@culture.gouv.fr et angelina.meslem@culture.gouv.fr";
      break;
    default:
      break;
  }

  arr.push(`<h1>Rapport de chargement ${collection} du ${dateStr}</h1>`);
  arr.push(`<h2>Établissement : ${institution}</h2>`);
  arr.push(`<h2>Producteur : ${email}</h2>`);
  arr.push(`<h2>Contact : ${contact}</h2>`);

  if (fileNames.length) {
    arr.push(`<h2>Fichier(s) importé(s) :</h2>`);
    arr.push(`<ul>`);
    arr.push(...fileNames.map(e => `<li>${e}</li>`));
    arr.push(`</ul>`);
  }

  arr.push(`<p>Nombre de notices chargées : ${notices.length}</p>`);
  arr.push(`<ul>`);
  arr.push(`<li>${notices.length - rejected.length} notices valides</li>`);
  arr.push(`<li style="list-style-type:none">`);
  arr.push(`<ul>`);
  arr.push(`<li>${created.length} notices créées</li>`);
  arr.push(`<li>${updated.length} notices mises à jour</li>`);
  arr.push(
    `<li>${notices.length -
      rejected.length -
      created.length -
      updated.length} notices importées sans mise à jour</li>`
  );
  arr.push(`</ul>`);
  arr.push(`</li >`);
  arr.push(`<li>${rejected.length} notices rejetées</li>`);
  arr.push(`</ul>`);
  arr.push(`<p>Nombre d'images chargées : ${imagesNumber}</p>`);

  arr.push(`<h1>Notices créées</h1>`);
  {
    const columns = [...fieldToExport.map(e => e.name), "Etat", "Details"];
    const lines = [];
    for (var i = 0; i < created.length; i++) {
      const fields = fieldToExport.map(e => `"${created[i][e.key]}"`);
      lines.push([...fields, "Création", ""]);
      for (var j = 0; j < created[i]._warnings.length; j++) {
        lines.push([...fields, "Avertissement", created[i]._warnings[j]]);
      }
    }
    const table = createHTMLTable(columns, lines);
    arr.push(...table);
  }
  {
    arr.push(`<h1>Notices modifiées</h1>`);
    const columns = [...fieldToExport.map(e => e.name), "Etat", "Details"];
    const lines = [];
    for (var i = 0; i < updated.length; i++) {
      const fields = fieldToExport.map(e => `"${updated[i][e.key]}"`);
      lines.push([...fields, "Modification", ""]);
      for (var j = 0; j < updated[i]._warnings.length; j++) {
        lines.push([...fields, "Avertissement", updated[i]._warnings[j]]);
      }
    }
    const table = createHTMLTable(columns, lines);
    arr.push(...table);
  }
  {
    arr.push(`<h1>Notices rejetées</h1>`);
    const columns = [...fieldToExport.map(e => e.name), "Etat", "Details"];
    const lines = [];
    for (var i = 0; i < rejected.length; i++) {
      const fields = fieldToExport.map(e => `"${rejected[i][e.key]}"`);

      lines.push([...fields, "Rejet", ""]);
      for (var j = 0; j < rejected[i]._warnings.length; j++) {
        lines.push([...fields, "Avertissement", rejected[i]._warnings[j]]);
      }
      for (var j = 0; j < rejected[i]._errors.length; j++) {
        lines.push([...fields, "Erreur", rejected[i]._errors[j]]);
      }
    }

    const table = createHTMLTable(columns, lines);
    arr.push(...table);
    {
      arr.push(`<h1>Liens</h1>`);
      arr.push(`<a href='${diffUrl}'>Consulter les notices en diffusion</a><br/>`);
      arr.push(`<a href='${fileUrl}'>Télécharger le détail de l'import</a>`);
    }
  }
  return arr.join("");
}

function createHTMLTable(columns, objs) {
  if (!objs.length) {
    return ["<div >Aucune</div>"];
  }
  const arr = [];
  arr.push(`<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">`);
  arr.push(`<tr>`);
  arr.push(
    ...columns.map(
      e =>
        `<th style="font-family:Arial, Helvetica, sans-serif; font-size:14px;border:1px solid black;">${e}</th>`
    )
  );
  arr.push(`</tr>`);
  arr.push(
    ...objs.map(line => {
      const arr2 = [];
      arr2.push("<tr>");
      arr2.push(
        line
          .map(
            d =>
              `<td style="font-family:Arial, Helvetica, sans-serif; padding: 10px; font-size:14px;border:1px solid black;">${d}</td>`
          )
          .join("")
      );
      arr2.push("</tr>");
      return arr2.join("");
    })
  );
  arr.push(`</table > `);
  return arr;
}
