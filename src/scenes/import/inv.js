import React from "react";
import { Container } from "reactstrap";
import Importer from "./importer";

import Merimee from "../../entities/merimee";
import Palissy from "../../entities/palissy";
import Memoire from "../../entities/memoire";

import utils from "./utils";

export default class Import extends React.Component {
  render() {
    return (
      <Container className="import">
        <Importer
          collection="inventaire"
          parseFiles={parseFiles}
          dropzoneText="Glissez & déposez vos fichiers au format Renable (.xml) ou Gertrude (.txt à partir de la version 1.6) et les images associées (au format .jpg) dans cette zone"
          defaultEncoding="UTF-8"
        />
      </Container>
    );
  }
}

function parseFiles(files, encoding) {
  return new Promise(async (resolve, reject) => {
    //GERTRUDE
    var objectFile = files.find(file =>
      file.name.includes("GERTRUDE_xmlToPALISSY_lexicovide.txt")
    );
    if (objectFile) {
      const PalissyFile = files.find(file =>
        file.name.includes("GERTRUDE_xmlToPALISSY_lexicovide.txt")
      );
      const MemoireFile = files.find(file =>
        file.name.includes("GERTRUDE_xmlToMEMOIRE_lexicovide.txt")
      );
      const MerimeeFile = files.find(file =>
        file.name.includes("GERTRUDE_xmlToMERIMEE_lexicovide.txt")
      );
      // const RenameFile = files.find(file => file.name.includes('GERTRUDE_xmlToRenommeIllustrations_Toutes.txt'));

      if (!PalissyFile) {
        reject(
          "Impossible d'importer le(s) fichier(s). Fichier GERTRUDE_xmlToPALISSY_lexicovide.txt introuvable"
        );
        return;
      }
      if (!MemoireFile) {
        reject(
          "Impossible d'importer le(s) fichier(s). Fichier GERTRUDE_xmlToMEMOIRE_lexicovide.txt introuvable"
        );
        return;
      }
      if (!MerimeeFile) {
        reject(
          "Impossible d'importer le(s) fichier(s). Fichier GERTRUDE_xmlToMERIMEE_lexicovide.txt introuvable"
        );
        return;
      }

      const otherFiles = files.filter(file => file.name.indexOf(".xml") === -1);
      const importedNotices = await ParseGertrude(
        PalissyFile,
        MemoireFile,
        MerimeeFile,
        otherFiles,
        encoding
      );

      for (let i = 0; i < importedNotices.length; i++) {
        checkReference(importedNotices[i]);
      }
      resolve({
        importedNotices,
        fileNames: [PalissyFile.name, MemoireFile.name, MerimeeFile.name]
      });
      return;
    }

    //RENABLE
    const xmlFiles = files.filter(file => file.name.indexOf(".xml") !== -1);
    const otherFiles = files.filter(file => file.name.indexOf(".xml") === -1);
    if (xmlFiles.length) {
      const importedNotices = await ParseRenabl(otherFiles, xmlFiles, encoding);

      let fileNames = xmlFiles.map(e => e.name);
      if (fileNames.length > 10) {
        fileNames = fileNames.slice(1, 10);
        fileNames.push(` ${xmlFiles.length - 10} supplémentaires`);
      }

      for (let i = 0; i < importedNotices.length; i++) {
        checkReference(importedNotices[i]);
      }
      resolve({ importedNotices, fileNames });
      return;
    }

    // ERROR
    reject(
      "Impossible d'importer le(s) fichier(s). Aucun fichier Renable ou Gertrude détecté"
    );
  });
}

function ParseGertrude(PalissyFile, MemoireFile, MerimeeFile, files, encoding) {
  return new Promise(async (resolve, reject) => {
    const notices = [];
    const arr = [];
    arr.push(utils.readCSV(PalissyFile, "|", encoding));
    arr.push(utils.readCSV(MerimeeFile, "|", encoding));
    arr.push(utils.readCSV(MemoireFile, "|", encoding));

    Promise.all(arr).then(values => {
      notices.push(...values[0].map(e => new Palissy(e)));
      notices.push(...values[1].map(e => new Merimee(e)));

      //COORWGS84

      notices.push(
        ...values[2].map(e => {
          //changement du modèle de donnée gertrude -> pop
          const imagePath = e.NOMI || e.NUMI;
          e.NUMP = e.NUMP;
          e.AUTP = e.AUT;
          e.IDPROD = e.EMET;
          e.AUTOEU = e.AUTR;
          e.PRECOR = e.DOC;
          e.ADRESSE = e.LIEU + ";" + e.ADRS;

          const memoireObj = new Memoire(e);

          const imageFile = files.find(
            e =>
              convertLongNameToShort(e.name)
                .toUpperCase()
                .indexOf(imagePath.toUpperCase()) !== -1
          );
          if (imageFile) {
            const shortname = convertLongNameToShort(imageFile.name);
            const newImage = utils.renameFile(imageFile, shortname);
            memoireObj._images.push(newImage);
            memoireObj.IMG.value = `memoire/${e.REF}/${shortname}`;
          } else {
            memoireObj._errors.push(
              `Impossible de trouver l'image ${imagePath}`
            );
          }

          return memoireObj;
        })
      );
      resolve(notices);
    });
  });
}

function ParseRenabl(files, xmlFiles, encoding) {
  return new Promise(async (resolve, reject) => {
    const notices = [];
    for (var j = 0; j < xmlFiles.length; j++) {
      const xmlDoc = await utils.readXML(xmlFiles[j], encoding);
      var tags = xmlDoc.childNodes[0].childNodes;
      for (var i = 0; i < tags.length; i++) {
        if (tags[i].nodeName === "MERIMEE") {
          const obj = RenablXMLToObj(tags[i]);
          convertGPS(obj);
          notices.push(new Merimee(obj));
        } else if (tags[i].nodeName === "PALISSY") {
          const obj = RenablXMLToObj(tags[i]);
          convertGPS(obj);
          notices.push(new Palissy(obj));
        } else if (tags[i].nodeName === "ILLUSTRATION") {
          const obj = RenablXMLToObj(tags[i]);
          const EMET = tags[i].getAttribute("EMET");
          const NUMI = tags[i].getAttribute("NUMI");
          obj.REF = EMET + "_" + NUMI;

          obj.AUTP = tags[i].getAttribute("AUT");

          const memoireObj = new Memoire(obj);

          const image = convertLongNameToShort(obj.FNU2, "\\");
          const imageFile = files.find(
            e =>
              convertLongNameToShort(e.name).toUpperCase() ===
              image.toUpperCase()
          );
          if (imageFile) {
            const shortname = convertLongNameToShort(imageFile.name);
            const newImage = utils.renameFile(imageFile, shortname);
            memoireObj._images.push(newImage);
            memoireObj.IMG.value = `memoire/${obj.REF}/${shortname}`;
          } else {
            memoireObj._errors.push(`Impossible de trouver l'image ${image}`);
          }
          notices.push(memoireObj);
        } else {
          // console.log(tags[i].nodeName);
        }
      }
    }
    resolve(notices);
  });
}

function convertGPS(e) {
  if (e.COORWGS84) {
    const arr = e.COORWGS84.split(",");
    if (arr.length === 2) {
      e.COORWGS84 = { lat: parseFloat(arr[0]), lon: parseFloat(arr[1]) };
    } else {
      e._errors.push(`Can't convert ${e.COORWGS84} to GPS `);
      e.COORWGS84 = null;
    }
  }
}

function checkReference(notice) {
  if (
    (notice.REF && String(notice.REF.value).startsWith("IA000")) ||
    (notice.REF && String(notice.REF.value).startsWith("IM000"))
  ) {
    notice._errors.push(
      "L'import de cette notice est impossible car l'identifiant ne contient pas de département"
    );
  }
}

function convertLongNameToShort(str, delim = "/") {
  let name = str.substring(str.lastIndexOf(delim) + 1);
  return name;
}

function RenablXMLToObj(node) {
  const obj = {};
  obj.REF = node.getAttribute("REF");
  for (var i = 0; i < node.childNodes.length; i++) {
    if (node.childNodes[i].nodeName !== "#text") {
      obj[node.childNodes[i].nodeName] = node.childNodes[i].textContent;
    }
  }
  return obj;
}
