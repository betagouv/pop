const Producteur = require("../../models/producteur");
const { capture } = require("./../../sentry.js");

// Creates a new ID for a notice of type "collection".
function getNewId(collection, prefix, dpt) {
  return new Promise((resolve, reject) => {
    let q = collection
      .findOne({ REF: { $regex: new RegExp("^" + prefix + dpt) } })
      .sort({ REF: -1 });
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

// Check if ES indexion is OK, capture error otherwise.
function checkESIndex(doc) {
  doc.on("es-indexed", (err, _res) => {
    if (err) capture(err);
  });
}

// Update a notice.
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

// Add "zeros" zeros to "v".
function addZeros(v, zeros) {
  return new Array(zeros)
    .concat([v])
    .join("0")
    .slice(-zeros);
}


// Identifie le producteur en fonction de la collection et de la référence
// Sinon retourne null
async function identifyProducteur(collection, REF, IDPROD, EMET) {
  let producteurs = [];
  await Producteur.find({ "BASE.base": collection}).then(listProducteurs => producteurs = listProducteurs);
  
  //Liste des producteurs donc le préfixe correspond au début de la REF de la notice
  let possibleProducteurs = [];
  let possibleProd = [];
  let defaultProducteur = "";

  producteurs.map((producteur) => {
    //Pour chaque champ BASE contenant la liste des base du producteur et la liste des préfixes
    producteur.BASE.map((baseItem) => {

      //Si la base correspond à la collection
      if(baseItem.base === collection){
        //Pour chaque préfixe
        if(baseItem.prefixes.length<1){
          defaultProducteur = producteur.LABEL;
        }
        baseItem.prefixes.map( prefix => {
          if(REF.startsWith(prefix.toString())){
            //Retourne le label du producteur
            let label = producteur.LABEL;
            possibleProd.push({prefix : prefix,label: label});
          }
        })
      }
    })
  });

  if(collection == "memoire") {
    if (String(REF).startsWith("AP") && String(IDPROD).startsWith("Service départemental")) {
      possibleProducteurs[0] = "UDAP";
    }
    else if (String(IDPROD).startsWith("SAP") || String(EMET).startsWith("SAP")) {
      possibleProducteurs[0] = "MAP";
    }
  }

  //Si la liste des producteurs est non vide, on retourne le 1er élément
  if(possibleProd.length>0){
    let PrefSize = possibleProd[0].prefix.length
    possibleProd.map( prod => {
      if(PrefSize < prod.prefix.length){
        PrefSize = prod.prefix.length
        possibleProducteurs[0] = prod.label
      }
    })
    return possibleProducteurs[0];
  }
  else if(defaultProducteur!=""){
    return defaultProducteur;
  }
  else{
    return null;
  }
}

// Get "producteur" for memoire notices.
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

// Get "producteur" for merimee notices.
function findMerimeeProducteur(notice) {
  switch (notice.REF.substring(0, 2)) {
    case "IA":
      return "Inventaire";
    case "PA":
      return "Monuments Historiques";
    case "EA":
      return "État";
    default:
      return "Autre";
  }
}

// Get "producteur" for palissy notices.
function findPalissyProducteur(notice) {
  switch (notice.REF.substring(0, 2)) {
    case "IM":
      return "Inventaire";
    case "PM":
      return "Monuments Historiques";
    case "EM":
      return "État";
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
  findPalissyProducteur,
  identifyProducteur
};
