import React from "react";
import { Container } from "reactstrap";
import { Mapping } from "pop-shared";
import Importer from "./importer";

import Merimee from "../../entities/Merimee";
import Palissy from "../../entities/Palissy";
import Memoire from "../../entities/Memoire";

import utils from "./utils";

export default class Import extends React.Component {
  render() {
    return (
      <Container className="import">
        <Importer
          collection="inventaire"
          readme={readme}
          parseFiles={parseFiles}
          dropzoneText="Glissez & déposez vos fichiers au format Renabl (.xml) ou Gertrude (.txt à partir de la version 1.6) et les images associées (au format .jpg) dans cette zone"
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

    //RENABL
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
      "Impossible d'importer le(s) fichier(s). Aucun fichier Renabl ou Gertrude détecté"
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
            memoireObj.IMG = `memoire/${e.REF}/${shortname}`;
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

          // we redirect AUT field to AUTP
          obj.AUTP = obj.AUT;

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
            memoireObj.IMG = `memoire/${obj.REF}/${shortname}`;
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
    String(notice.REF).startsWith("IA000") ||
    String(notice.REF).startsWith("IM000")
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

function readme() {
  const generatedMemoireFields = Object.keys(Mapping.memoire).filter(e => {
    return Mapping.memoire[e].generated;
  });
  const generatedMerimeeFields = Object.keys(Mapping.merimee).filter(e => {
    return Mapping.merimee[e].generated;
  });
  const generatedPalissyFields = Object.keys(Mapping.palissy).filter(e => {
    return Mapping.palissy[e].generated;
  });
  const validationMemoireFields = Object.keys(Mapping.memoire).filter(e => {
    return Mapping.memoire[e].validation;
  });
  const validationPalissyFields = Object.keys(Mapping.palissy).filter(e => {
    return Mapping.palissy[e].validation;
  });
  const validationMerimeeFields = Object.keys(Mapping.merimee).filter(e => {
    return Mapping.merimee[e].validation;
  });
  const requiredMemoireFields = Object.keys(Mapping.memoire).filter(e => {
    return Mapping.memoire[e].required;
  });
  const requiredPalissyFields = Object.keys(Mapping.palissy).filter(e => {
    return Mapping.palissy[e].required;
  });
  const requiredMerimeeFields = Object.keys(Mapping.merimee).filter(e => {
    return Mapping.merimee[e].required;
  });

  return (
    <div>
      <h5>Inventaire</h5>
      <div>
        Cet onglet permet d’alimenter les bases Mérimée Inventaire, Palissy
        Inventaire et Mémoire Inventaire. <br /> <br />
        <h6>Formats d’import </h6>
        Les formats de données pris en charge sont les suivants : <br />
        <ul>
          <li>
            texte : format Renabl (.xml) ou Gertrude (.txt à partir de la
            version 1.6){" "}
          </li>
          <li>illustration : jpg, png.</li>
        </ul>
        La taille maximale d’un import est de 300Mo (soit environ 3000 notices
        avec image, ou 1 million de notices sans images). <br /> <br />
        <h6>Champs obligatoires et contrôles de vocabulaire </h6>
        Les champs suivants doivent obligatoirement être renseignés : <br />
        <br />
        Mémoire :
        <ul>
          {requiredMemoireFields.map(e => (
            <li>{e} </li>
          ))}
        </ul>
        Mérimee :
        <ul>
          {requiredMerimeeFields.map(e => (
            <li>{e}</li>
          ))}
        </ul>
        Palissy :
        <ul>
          {requiredPalissyFields.map(e => (
            <li>{e}</li>
          ))}
        </ul>
        <br />
        <h5>Particularités</h5>
        Pour Renabl illustration, la référence de la notice mémoire est
        construite dela facon suivante : EMET + "_" + NUMI <br />
        <br />
        Pour Renabl illustration, le champ AUTP est rempli avec le champ AUT
        <br />
        <br />
        Pour Renabl illustration, le champ image est rempli en simplifiant le
        nom contenu dans le champ FNU2
        <br /> <br />
        Pour Renabl Mérimée et Palissy, Le champ COORWGS84 est utilisé et
        converti dans le champ POP_COORDONNEES et prioritaire sur le champ COOR
        <br /> <br />
        Pour Renabl et Gertrude Mérimée et Palissy, Les coordonnées sont
        converties du format Lambert vers le WGS84 automatiquement si les champs
        COOR et ZONE sont remplis
        <br /> <br />
        Pour Gertrude Mémoire, les conversions suivantes sont faites : <br />
        <ul>
          <li>AUTP = AUT</li>
          <li>IDPROD = EMET</li>
          <li>AUTOEU = AUTR</li>
          <li>PRECOR = DOC</li>
          <li>ADRESSE = LIEU + ";" + ADRS</li>
        </ul>
        <br />
        <h6>Test de validation des champs : </h6>
        Les tests suivants sont effectués lors des imports
        <br />
        <br />
        Mémoire :
        <ul>
          {validationMemoireFields.map(e => (
            <li>
              {e} : {Mapping.memoire[e].validation}
            </li>
          ))}
        </ul>
        Mérimee :
        <ul>
          {validationMerimeeFields.map(e => (
            <li>
              {e} : {Mapping.merimee[e].validation}
            </li>
          ))}
        </ul>
        Palissy :
        <ul>
          {validationPalissyFields.map(e => (
            <li>
              {e} : {Mapping.palissy[e].validation}
            </li>
          ))}
        </ul>
        <br />
        <h5>Que voulez-vous faire ?</h5>
        <br />
        <h6>Je veux créer une notice :</h6>
        J’importe la notice.
        <br />
        <br />
        <h6>Je veux mettre à jour tout ou partie d’une notice :</h6>
        J’importe les champs à mettre à jour avec leurs nouvelles valeurs et
        j’écrase l’ancienne notice.
        <br />
        <br />
        <h6>Je veux effacer une ou plusieurs valeurs d’une notice : </h6>
        J’importe un fichier comportant le ou les champs que je veux supprimer
        en les laissant vides.
        <br />
        <br />
        <h6>Je veux supprimer une notice :</h6>
        Je contacte l’administrateur de la base.
        <br />
        <br />
        <h6>Je veux ajouter une image :</h6>
        1) Sur une notice mémoire existante, je peux cliquer sur "Ajouter une
        image" et télécharger une image depuis mon ordinateur. Le champ IMG
        contiendra le lien de l'image ainsi téléchargée.
        <br /> <br />
        2) Importer une notice mémoire en "OA" et avoir le champ REFIMG complété
        avec le nom de l'image exacte
        <br /> <br />
        NB : à la création d'une notice, POP génère automatiquement certains
        champs utiles au traitement des données. Il s'agit des champs : <br />
        <br />
        Mémoire :
        <ul>
          {generatedMemoireFields.map(e => (
            <li>{e} </li>
          ))}
        </ul>
        Mérimee :
        <ul>
          {generatedMerimeeFields.map(e => (
            <li>{e}</li>
          ))}
        </ul>
        Palissy :
        <ul>
          {generatedPalissyFields.map(e => (
            <li>{e}</li>
          ))}
        </ul>
        Aucun besoin de les renseigner lors d'un import.
        <br />
        <br />
        <a
          href="https://github.com/betagouv/pop-api/blob/master/doc/memoire.md"
          target="_blank"
        >
          Lien vers le modèle de donnée Mémoire
        </a>
        <br />
        <a
          href="https://github.com/betagouv/pop-api/blob/master/doc/palissy.md"
          target="_blank"
        >
          Lien vers le modèle de donnée Palissy
        </a>
        <br />
        <a
          href="https://github.com/betagouv/pop-api/blob/master/doc/merimee.md"
          target="_blank"
        >
          Lien vers le modèle de donnée Mérimée
        </a>
        <br />
      </div>
    </div>
  );
}
