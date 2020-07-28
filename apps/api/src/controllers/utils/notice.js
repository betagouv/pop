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
    collection.findOneAndUpdate({ REF }, notice, { upsert: true, new: true, useFindAndModify: false }, (err, doc) => {
      if (err) {
        reject(err);
        return;
      }
      checkESIndex(doc);
      resolve(doc);
    });
  });
}

// Update a OAI Notice.
function updateOaiNotice(collection, REF, dmaj) {
  return new Promise((resolve, reject) => {
    collection.findOneAndUpdate({ REF }, dmaj, { upsert: true, new: true, useFindAndModify: false}, (err, doc) => {
      if (err) {
        reject(err);
        return;
      }
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
  let finalProd = "";
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
            //Cas particulier pour memoire : le prefixe AP n'est pas suffisant pour déterminer le producteur
            //Dans ce cas, le producteur "AUTRE" est ajouté et le cas particulier est géré plus bas pour déterminer
            //si le producteur reste "AUTRE", ou s'il devient UDAP ou MAP
            if(prefix=="AP" && collection == "memoire"){
              possibleProducteurs.push({prefix : prefix,label: "AUTRE"});
            }
            else{
              possibleProducteurs.push({prefix : prefix,label: label});
            }
          }
        })
      }
    })
  });

  if(collection == "memoire") {
    if (IDPROD != null && String(REF).startsWith("AP") && String(IDPROD).startsWith("Service départemental")) {
      return "UDAP";
    }
    else if (IDPROD != null && EMET != null && (String(IDPROD).startsWith("SAP") || String(EMET).startsWith("SAP"))) {
      return "MAP";
    }
  }

  //Si la liste des producteurs est non vide, on parcourt la liste pour déterminer le préfixe le plus précis
  if(possibleProducteurs.length>0){
    let PrefSize = possibleProducteurs[0].prefix.length
    finalProd = possibleProducteurs[0].label;
    possibleProducteurs.map( prod => {
      if(PrefSize < prod.prefix.length){
        PrefSize = prod.prefix.length
        finalProd = prod.label
      }
    })
    return finalProd;
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

async function checkValidRef(refList, collection, POP_FLAGS, fieldName){
  if(refList){
    for(let i=0; i<refList.length; i++){
      const ref = refList[i];
      const notice = await collection.findOne({REF: ref});
      if(!notice){
        POP_FLAGS.push(fieldName + "_MATCH_FAIL");
      }
    }
  }

  return POP_FLAGS;
}

module.exports = {
  getNewId,
  checkESIndex,
  updateNotice,
  updateOaiNotice,
  findMemoireProducteur,
  findMerimeeProducteur,
  findPalissyProducteur,
  identifyProducteur,
  checkValidRef
};
