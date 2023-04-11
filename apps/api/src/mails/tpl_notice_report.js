const { formatDate } = require("../controllers/utils/date");

/**
 * Liste des personnes à contacter pour chaque collection
 */
const CONTACT_LIST = {
    "enluminures": "wilfried.muller@culture.gouv.fr",
    "memoire": "anne.cook@culture.gouv.fr",
    "monuments-historiques": "antonella.rotolo@culture.gouv.fr",
    "mnr": "isabelle.rouge-ducos@culture.gouv.fr",
    "inventaire": "geraud.buffa@culture.gouv.fr ; jean.davoigneau@culture.gouv.fr et ines.graillat@culture.gouv.fr",
    'joconde': "sophie.daenens@culture.gouv.fr et angelina.meslem@culture.gouv.fr"
}

function generateTemplateReport(params){
    let content = "";
    const {importedNotices, collection, email, institution, importId} = params;
    console.log("ENTRY generateTemplateReport : ", params)

    if(params.collection === "enluminures" || params.collection === "joconde"){
        content = customReport(importedNotices, collection, email, institution, importId)
    } else {
        content = generate(importedNotices, collection, email, institution, importId)
    }
    
    return content;
}


function customReport(notices, collection, email, institution, importId){

    console.log(notices)
    let arr = [];
 //   const dateStr = formatDate();
    const diffUrl = `${process.env.POP_URL}/search/list?import=["${importId}"]`;
    const fileUrl = `${process.env.BUCKET_URL}import/${importId}/import.csv`;

    const created = notices.filter(e => e._status === "created");
    const updated = notices.filter(e => e._status === "updated");
    const rejected = notices.filter(e => e._status === "rejected");

    const imagesNumber = notices.reduce((acc, val) => {
        if (val.status === "created" || val.status === "updated") {
        return acc + val.images.length;
        }
        return acc;
    }, 0);

   // let contact = "wilfried.muller@culture.gouv.fr";

    arr = [arr, ...addHeader(collection, institution, email)];
 /*   arr.push(`<h1>Rapport de chargement ${collection} du ${dateStr}</h1>`);
    arr.push(`<h2>Établissement : ${institution}</h2>`);
    arr.push(`<h2>Producteur : ${email}</h2>`);
    arr.push(`<h2>Contact : ${contact}</h2>`);
*/

    arr.push(`<p>Nombre de notices chargées: ${notices.length}</p>`);
    arr.push(`<ul>`);
    arr.push(`<li>${notices.length - rejected.length} notice(s) valide(s)</li>`);
    arr.push(`<li style="list-style-type:none">`);
    arr.push(`<ul>`);
    arr.push(`<li>${created.length} notice(s) créée(s)</li>`);
    arr.push(`<li>${updated.length} notice(s) mise(s) à jour</li>`);
    arr.push(
        `<li>${notices.length -
        rejected.length -
        created.length -
        updated.length} notice(s) importée(s) sans mise à jour</li>`
    );
    arr.push(`<li>${imagesNumber} image(s) chargée(s)</li>`);
    arr.push(`</ul>`);
    arr.push(`</li >`);
    arr.push(`<li>${rejected.length} notice(s) rejetée(s)</li>`);
    arr.push(`</ul>`);

    let obj = {};
    let count = 0;

    const URL = `${process.env.POP_URL}/notice/enluminures/`;

    for (let i = 0; i < notices.length; i++) {
        for (let j = 0; j < notices[i]._warnings.length; j++) {
            count++;
            if (obj[notices[i]._warnings[j]] !== undefined) {
                obj[notices[i]._warnings[j]].count = obj[notices[i]._warnings[j]].count + 1;
                obj[notices[i]._warnings[j]].notices.push(
                `<a href="${URL}${notices[i].REF}">${notices[i].REF}<a/> (${notices[i].INV})`
                );
            } else {
                obj[notices[i]._warnings[j]] = {
                count: 1,
                notices: [`<a href="${URL}${notices[i].REF}">${notices[i].REF}<a/> (${notices[i].INV})`]
                };

                let idThesaurus = notices[i]._warnings[j].substr(notices[i]._warnings[j].indexOf(')]') -3, 3);
                if(!Number.isNaN(parseInt(idThesaurus))){
                obj[notices[i]._warnings[j]].idThesaurus = idThesaurus;
                }
            }
        }
    }

    arr = [...arr, ...addFooter(importId)];

 /*   arr.push(`<h1>Liens</h1>`);
    arr.push(`<a href='${diffUrl}'>Consulter les notices en diffusion</a><br/>`);
    arr.push(`<a href='${fileUrl}'>Télécharger le détail de l'import</a>`);
    */
    return arr.join("");
}

/**
 * Ajoute le Header dans le mail
 * @param {String} collection 
 * @param {String} institution 
 * @param {String} email 
 * @returns 
 */
function addHeader(collection, institution, email){
    const contact = CONTACT_LIST[collection] || "";
    const arr = [];
    arr.push(`<h1>Rapport de chargement ${collection} du ${formatDate()}</h1>`);
    arr.push(`<h2>Établissement : ${institution}</h2>`);
    arr.push(`<h2>Producteur : ${email}</h2>`);
    arr.push(`<h2>Contact : ${contact}</h2>`);
    return arr
}

function addFooter(importId) {
    const arr = [];
    const diffUrl = `${process.env.POP_URL}/search/list?import=["${importId}"]`;
    const fileUrl = `${process.env.BUCKET_URL}import/${importId}/import.csv`;
    arr.push(`<h1>Liens</h1>`);
    arr.push(`<a href='${diffUrl}'>Consulter les notices en diffusion</a><br/>`);
    arr.push(`<a href='${fileUrl}'>Télécharger le détail de l'import</a>`);
    return arr
}


function generate(notices, collection, email, institution, importId, fileNames = []) {
    const fieldToExport = [{ name: "Identifiant", key: "REF" }];
    let arr = [];
  
  //  const dateStr = formatDate();
  
    const created = notices.filter(e => e._status === "created");
    const updated = notices.filter(e => e._status === "updated");
    const rejected = notices.filter(e => e._status === "rejected");
    
  /*
    const diffUrl = `${process.env.POP_URL}/search/list?import=["${importId}"]`;
    const fileUrl = `${process.env.BUCKET_URL}import/${importId}/import.csv`;
  */
    const imagesNumber = notices.reduce((acc, val) => {
      if (val.status === "created" || val.status === "updated") {
        return acc + val.images.length;
      }
      return acc;
    }, 0);
/*  
    let contact = "";
    switch (collection) {
      case "monuments-historiques":
        contact = " antonella.rotolo@culture.gouv.fr";
        break;
      case "mnr":
        contact = "isabelle.rouge-ducos@culture.gouv.fr";
        break;
      case "memoire":
        contact = "anne.cook@culture.gouv.fr";
        break;
      case "inventaire":
        contact = "geraud.buffa@culture.gouv.fr ; jean.davoigneau@culture.gouv.fr et ines.graillat@culture.gouv.fr";
        break;
      case "joconde":
        contact = "sophie.daenens@culture.gouv.fr et angelina.meslem@culture.gouv.fr";
        break;
      default:
        break;
    }
*/
    // Ajout du Header
    arr = addHeader(collection, institution, email);

  /*
    arr.push(`<h1>Rapport de chargement ${collection} du ${dateStr}</h1>`);
    arr.push(`<h2>Établissement : ${institution}</h2>`);
    arr.push(`<h2>Producteur : ${email}</h2>`);
    arr.push(`<h2>Contact : ${contact}</h2>`);
    */
  
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

      // Ajout du footer
      arr = [...arr, ...addFooter(importId)];
     /* 
      {
        arr.push(`<h1>Liens</h1>`);
        arr.push(`<a href='${diffUrl}'>Consulter les notices en diffusion</a><br/>`);
        arr.push(`<a href='${fileUrl}'>Télécharger le détail de l'import</a>`);
      }
      */
      
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
  

module.exports = {
    generateTemplateReport
}