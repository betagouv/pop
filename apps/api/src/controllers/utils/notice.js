const { capture } = require("./../../sentry.js");

function getNewId(object, prefix, dpt) {
  return new Promise((resolve, reject) => {
    let q = object.findOne({ REF: { $regex: new RegExp("^" + prefix + dpt) } }).sort({ REF: -1 });
    q.exec((error, doc) => {
      if (error) {
        reject(error);
      }
      if (doc) {
        const ref = doc.REF.substring((prefix + dpt).length);
        const newId = addZeros(parseInt(ref) + 1, ref.length);
        resolve(prefix + dpt + newId);
      } else {
        const ln = 10 - (prefix + dpt).length;
        const newId = addZeros(1, ln);
        resolve(prefix + dpt + newId);
      }
    });
  });
}

function checkESIndex(doc) {
  doc.on("es-indexed", (err, res) => {
    if (err) capture(err);
  });
}

function updateNotice(collection, REF, notice) {
  return new Promise((resolve, reject) => {
    collection.findOneAndUpdate({ REF }, notice, { upsert: true, new: true }, (err, doc) => {
      if (err) {
        reject(err);
        return;
      }
      checkESIndex(doc);
      resolve(doc);
    });
  });
}

function addZeros(v, zeros) {
  return new Array(zeros)
    .concat([v])
    .join("0")
    .slice(-zeros);
}

function findMemoireProducteur(REF, IDPROD, EMET) {
  if (
    String(REF).startsWith("IVN") ||
    String(REF).startsWith("IVR") ||
    String(REF).startsWith("IVD") ||
    String(REF).startsWith("IVC")
  ) {
    return "INV";
  } else if (String(REF).startsWith("OA")) {
    return "CAOA";
  } else if (String(REF).startsWith("MH")) {
    return "CRMH";
  } else if (String(REF).startsWith("AR")) {
    return "ARCH";
  } else if (String(REF).startsWith("AP") && String(IDPROD).startsWith("Service départemental")) {
    return "UDAP";
  } else if (String(IDPROD).startsWith("SAP") || String(EMET).startsWith("SAP")) {
    return "MAP";
  }
  return "AUTRE";
}

function findMerimeeProducteur(notice) {
  switch (notice.REF.substring(0, 2)) {
    case "IA":
      return "Inventaire";
    case "PA":
      return "Monuments Historiques";
    case "EA":
      return "Architecture";
    default:
      return "Autre";
  }
}

function findPalissyProducteur(notice) {
  switch (notice.REF.substring(0, 2)) {
    case "IM":
      return "Inventaire";
    case "PM":
      return "Monuments Historiques";
    case "EM":
      return "Architecture";
    default:
      return "Autre";
  }
}

module.exports = {
  getNewId,
  checkESIndex,
  updateNotice,
  findMemoireProducteur,
  findMerimeeProducteur,
  findPalissyProducteur
};
