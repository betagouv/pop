export function generateCSVFile(
  notices,
  base,
  fieldToExport = [{ name: "Identifiant", key: "REF" }]
) {
  let csv = "";
  // Add columns ETAT(create, updated, rejected) and informations about warning or errors
  const columns = [...fieldToExport.map(e => e.name), "Etat", "Details"]; 
  csv += columns.join(",") + "\n";

  const created = notices.filter(e => e._status === "created");
  const updated = notices.filter(e => e._status === "updated");
  const rejected = notices.filter(e => e._status === "rejected");

  const lines = [];

  for (var i = 0; i < created.length; i++) {
    const fields = fieldToExport.map(e => `"${created[i][e.key] ? created[i][e.key] : ""}"`);
    lines.push([...fields, "Création", ""].join(","));
    for (var j = 0; j < created[i]._warnings.length; j++) {
      lines.push(
        [...fields, "Avertissement", `"${doubleBrakets(created[i]._warnings[j])}"`].join(",")
      );
    }
  }

  for (var i = 0; i < updated.length; i++) {
    const fields = fieldToExport.map(e => `"${updated[i][e.key] ? updated[i][e.key] : ""}"`);
    lines.push([...fields, "Modification", ""].join(","));
    for (var j = 0; j < updated[i]._messages.length; j++) {
      lines.push(
        [...fields, "Changement", `"${doubleBrakets(updated[i]._messages[j])}"`].join(",")
      );
    }
    for (var j = 0; j < updated[i]._warnings.length; j++) {
      lines.push(
        [...fields, "Avertissement", `"${doubleBrakets(updated[i]._warnings[j])}"`].join(",")
      );
    }
  }

  for (var i = 0; i < rejected.length; i++) {
    const fields = fieldToExport.map(e => `"${rejected[i][e.key] ? rejected[i][e.key] : ""}"`);

    lines.push([...fields, "Rejet", ""].join(","));
    for (var j = 0; j < rejected[i]._errors.length; j++) {
      lines.push([...fields, "Erreur", `"${doubleBrakets(rejected[i]._errors[j])}"`].join(","));
    }
    for (var j = 0; j < rejected[i]._warnings.length; j++) {
      lines.push(
        [...fields, "Avertissement", `"${doubleBrakets(rejected[i]._warnings[j])}"`].join(",")
      );
    }
  }

  csv += lines.join("\n");
  return new Blob([csv]);
}

export function downloadDetails(
  notices,
  base,
  fieldToExport = [{ name: "Identifiant", key: "REF" }]
) {
  const file = generateCSVFile(notices, base, fieldToExport);

  const d = new Date();
  const date = ("0" + d.getDate()).slice(-2);
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  const minutes = ("0" + d.getMinutes()).slice(-2);
  const hours = ("0" + d.getHours()).slice(-2);
  const secondes = ("0" + d.getSeconds()).slice(-2);
  const fileName = `Import${base}_${year}${month}${date}_${hours}h${minutes}m${secondes}s.csv`;

  initiateFileDownload(file, fileName);
}

function doubleBrakets(str) {
  return str.replace(/"/g, '""');
}

function initiateFileDownload(blob, fileName) {
  if (window.navigator.msSaveOrOpenBlob)
    // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
    window.navigator.msSaveBlob(blob, fileName);
  else {
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, {
      type: "text/plain;charset=UTF-8"
    });
    a.download = fileName;
    document.body.appendChild(a);
    a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
    document.body.removeChild(a);
  }
}
