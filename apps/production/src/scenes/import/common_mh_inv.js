import Mapping from "../../services/mapping";
import utils from "./utils";
import api from "../../services/api";
import Merimee from "../../entities/Merimee";
import Memoire from "../../entities/Memoire";
import Palissy from "../../entities/Palissy";
import Autor from "../../entities/Autor";

function parseFilesCsv(files, encoding, typeImport) {
    return new Promise(async (resolve, reject) => { 
      var objectFile = files.find(file => file.name.includes(".csv"));
      if (!objectFile) {
        reject("Pas de fichiers .csv detecté");
        return;
      }
      const objs = await utils.readCSV(objectFile, "|", encoding);
      const importedNotices = [];
      const filesMap = {};
      for (var i = 0; i < files.length; i++) {
        filesMap[files[i].name] = files[i];
      }

      // Réupération des producteurs
      const response = await api.getProducteurs();
  
      for (var i = 0; i < objs.length; i++) {
        const obj = objs[i];
  
        if (!obj.REF) {
          reject(
            `Problème détecté ligne ${i +
              2}. Impossible de détecter les notices. Vérifiez que le séparateur est bien | et que chaque notice possède une référence`
          );
          return;
        }
  
        // Create new notices.
        if (obj.REF === "PM") {
          if (!obj.DPT) {
            reject("DPT est vide. Impossible de générer un id");
            return;
          }
          const ref = await api.getNewId("palissy", "PM", obj.DPT);
          obj.REF = ref.id;
        } else if (obj.REF === "PA") {
          if (!obj.DPT) {
            reject("DPT est vide. Impossible de générer un id");
            return;
          }
          const ref = await api.getNewId("merimee", "PA", obj.DPT);
          obj.REF = ref.id;
        }
  
        // On parcourt les producteurs pour savoir si le préfixe de la notice correspond à un des préfixes des producteurs mérimée, palissy ou mémoire
        let collection = "";
        let producteurs = [];
  
        if(response){
          producteurs = response.producteurs;
          
          producteurs.map( producteur => {
            producteur.BASE.map( BASE => {
              BASE.prefixes.map( prefix => {
                if(String(obj.REF).startsWith(String(prefix))){
                  collection = BASE.base;
                }
              })
            });
          });
        }

        // Définition des messages d'erreur pour chaque type d'import MH et INV
        const messages = {
          "MH": `La référence ${obj.REF} n'est ni palissy, ni mérimée, ni memoire, ni autor`,
          "INV": `La référence ${obj.REF} n'est ni palissy, ni mérimée, ni memoire`
        };
  
        let newNotice;
  
        if ("palissy" === collection) {
          newNotice = new Palissy(obj);
          addFile("POP_DOSSIER_PROTECTION", "POP_DOSSIER_PROTECTION", obj, newNotice, filesMap);
          addFile("POP_ARRETE_PROTECTION", "POP_ARRETE_PROTECTION", obj, newNotice, filesMap);
          addFile("POP_DOSSIER_VERT", "POP_DOSSIER_VERT", obj, newNotice, filesMap);
        } else if ("merimee" === collection) {
          newNotice = new Merimee(obj);
          addFile("POP_DOSSIER_PROTECTION", "POP_DOSSIER_PROTECTION", obj, newNotice, filesMap);
          addFile("POP_ARRETE_PROTECTION", "POP_ARRETE_PROTECTION", obj, newNotice, filesMap);
          addFile("POP_DOSSIER_VERT", "POP_DOSSIER_VERT", obj, newNotice, filesMap);
        } else if ("memoire" === collection) {
          newNotice = new Memoire(obj);
          addFile("REFIMG", "IMG", obj, newNotice, filesMap);
        } else if ("INV" !== typeImport && "autor" === collection) {
          newNotice = new Autor(obj);
        } else {
          reject(messages[typeImport]);
          return;
        }
  
        importedNotices.push(newNotice);
        controlREFIMG(importedNotices);
      }
      resolve({ importedNotices, fileNames: [objectFile.name] });
    });
  }

  function controlREFIMG(importedNotices){

    for (var i = 0; i < importedNotices.length; i++) {
      const names = importedNotices[i].IMG;
      const refIMG = importedNotices[i].REFIMG;
      if(names != undefined){
        //Si refimg est renseigné une image avec le même nom doit être joint lors de l'import 
        if (refIMG && refIMG !== convertLongNameToShort(names)) {
          importedNotices[i]._errors.push(
            `Image ${convertLongNameToShort(names)} introuvable`
          );
        } 
      }
    }
  }
  
  function addFile(fromProperty, toProperty, data, newNotice, filesMap) {
    const type = Mapping[newNotice._type][toProperty].type;
  
    // IF fromProperty doesnt exist, we dont update toProperty
    if (data[fromProperty] !== undefined) {
      if (!data[fromProperty]) {
        // If fromProperty is empty, we empty toProperty
        if (type === "Array") {
          newNotice[toProperty] = [];
        } else {
          newNotice[toProperty] = "";
        }
      } else {
        const filenames = String(data[fromProperty]).split(";");
        newNotice[toProperty] = type === "Array" ? [] : "";
  
  
        for (let i = 0; i < filenames.length; i++) {
          let fileName = filenames[i];
          fileName = convertLongNameToShort(fileName);
  
          const file = filesMap[fileName];
  
          if (file) {
            if (type === "Array") {
              newNotice[toProperty].push(`${newNotice._type}/${newNotice.REF}/${fileName}`);
            } else {
              newNotice[toProperty] = `${newNotice._type}/${newNotice.REF}/${fileName}`;
            }
  
            newNotice._files.push(file);
          } 
          else if (!file && fromProperty === 'REFIMG' && fileName !== '' && newNotice[toProperty] === '') {
            // Gère le cas où l'import d'une notice mémoire doit fonctionner malgré l'absence d'une image
            fileName = convertLongNameToShort('');
          }
              else {
            newNotice._errors.push(`Impossible de trouver le fichier "${fileName}"`);
          }
        }
      }
    }
  }
  
  function convertLongNameToShort(str) {
    return str.substring(str.lastIndexOf("/") + 1);
  }

  export default {
    parseFilesCsv
  };