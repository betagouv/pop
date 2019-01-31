import React from "react";
import { Container } from "reactstrap";
import { Mapping } from "pop-shared";
import Importer from "./importer";
import Merimee from "../../entities/Merimee";
import Memoire from "../../entities/Memoire";
import Palissy from "../../entities/Palissy";

import api from "../../services/api";
import utils from "./utils";

export default class Import extends React.Component {
  render() {
    return (
      <Container className="import">
        <Importer
          collection="monuments-historiques"
          parseFiles={parseFiles}
          readme={readme}
          dropzoneText={
            <span>
              Glissez & déposez vos fichiers au format MH ( extension .csv avec séparateur | ) et
              les images associées (au format .jpg) dans cette zone
              <br />
            </span>
          }
        />
      </Container>
    );
  }
}

function parseFiles(files, encoding) {
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

    for (var i = 0; i < objs.length; i++) {
      const obj = objs[i];

      if (!obj.REF) {
        reject(
          "Impossible de détecter les notices. Vérifiez que le séparateur est bien | et que chaque notice possède une référence"
        );
        return;
      }

      //Create New notices
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

      let newNotice;
      if (obj.REF.indexOf("PM") !== -1) {
        newNotice = new Palissy(obj);
      } else if (obj.REF.indexOf("PA") !== -1) {
        newNotice = new Merimee(obj);
      } else if (["IV", "OA", "MH", "AR", "AP"].includes(obj.REF.substring(0, 2))) {
        newNotice = new Memoire(obj);

        // SI REFIMG nexiste pas, on ne met pas a jour le champ IMG
        if (obj.REFIMG !== undefined) {
          if (!obj.REFIMG) {
            // SI REFIMG est vide, on suppr limage
            newNotice.IMG = "";
          } else {
            let fileName = String(obj.REFIMG);
            filename = convertLongNameToShort(fileName);
            let img = filesMap[fileName];
            if (img) {
              newNotice.IMG = `memoire/${newNotice.REF}/${fileName}`;
              newNotice._images.push(img);
            } else {
              newNotice._errors.push(`Impossible de trouver l'image "${fileName}"`);
            }
          }
        }
      } else {
        reject(`La référence ${obj.REF} n'est ni palissy, ni mérimée`);
        return;
      }

      const { DPT, INSEE, INSEE2 } = newNotice;
      if (newNotice._type !== "memoire") {
        if (!INSEE && !INSEE2) {
          newNotice._errors.push("INSEE ne doit pas être vide");
        }
        if (!DPT) {
          newNotice._errors.push("DPT ne doit pas être vide");
        }
        if (INSEE && DPT && !String(INSEE).startsWith(String(DPT))) {
          newNotice._errors.push("INSEE et Département ne coincident pas");
        }
        if (INSEE2 && DPT && !String(INSEE2).startsWith(String(DPT))) {
          newNotice._errors.push("INSEE2 et Département ne coincident pas");
        }
      }

      importedNotices.push(newNotice);
    }
    resolve({ importedNotices, fileNames: [objectFile.name] });
  });
}

function convertLongNameToShort(str) {
  return str
    .substring(str.lastIndexOf("/") + 1)
    .replace(/_[a-zA-Z0-9]\./g, ".")
    .replace(/^.*[\\\/]/g, "")
    .replace(/[a-zA-Z0-9]*_/g, "")
    .toLowerCase();
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

  //spécifique MH
  requiredMerimeeFields.push("DPT");
  requiredMerimeeFields.push("INSEE");
  requiredPalissyFields.push("DPT");
  requiredPalissyFields.push("INSEE");

  return (
    <div>
      <h5>Monuments historiques</h5>
      <div>
        Cet onglet permet d’alimenter les bases Mérimée MH, Palissy MH et Mémoire MH (CRMH, CAOA,
        UDAP) <br /> <br />
        <h6>Formats d’import </h6>
        Les formats de données pris en charge sont les suivants : <br />
        <ul>
          <li>texte : csv (séparateur : | ) </li>
          <li>illustration : jpg, png.</li>
        </ul>
        La taille maximale d’un import est de 300Mo (soit environ 3000 notices avec image, ou 1
        million de notices sans images). <br /> <br />
        <h6>Champs obligatoires et contrôles de vocabulaire </h6>
        Les champs suivants doivent obligatoirement être renseignés : <br />
        <br />
        Mémoire :
        <ul>
          {requiredMemoireFields.map(e => (
            <li key={e}>{e} </li>
          ))}
        </ul>
        Mérimee :
        <ul>
          {requiredMerimeeFields.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        Palissy :
        <ul>
          {requiredPalissyFields.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <br />
        <h6>Test de validation des champs : </h6>
        Les tests suivants sont effectués lors des imports
        <br />
        <br />
        Mémoire :
        <ul>
          {validationMemoireFields.map(e => (
            <li key={e}>
              {e} : {Mapping.memoire[e].validation}
            </li>
          ))}
        </ul>
        Mérimee :
        <ul>
          {validationMerimeeFields.map(e => (
            <li key={e}>
              {e} : {Mapping.merimee[e].validation}
            </li>
          ))}
        </ul>
        Palissy :
        <ul>
          {validationPalissyFields.map(e => (
            <li key={e}>
              {e} : {Mapping.palissy[e].validation}
            </li>
          ))}
        </ul>
        <br />
        <h5>Que voulez-vous faire ?</h5>
        <br />
        <h6>Je veux créer une notice :</h6>
        POP génère automatiquement un indentifiant MH pour palissy et mérimée. Il suffit de noter en
        REF uniquement PA ou PM
        <br />
        <br />
        <h6>Je veux mettre à jour tout ou partie d’une notice :</h6>
        J’importe les champs à mettre à jour avec leurs nouvelles valeurs et j’écrase l’ancienne
        notice.
        <br />
        <br />
        <h6>Je veux effacer une ou plusieurs valeurs d’une notice : </h6>
        J’importe un fichier comportant le ou les champs que je veux supprimer en les laissant
        vides.
        <br />
        <br />
        <h6>Je veux supprimer une notice :</h6>
        Je contacte l’administrateur de la base.
        <br />
        <br />
        <h6>Je veux ajouter une image :</h6> <br />
        <b>
          ATTENTION : 2 cas de figures suivant si l'ajout se fait par import (1) ou par ajout d'une
          nouvelle image sur une notice Mémoire.
          <br />
          Dans les 2 cas, l'image est stockée uniquement dans la base Mémoire/SAP dans le champ IMG,
          seul champ image affiché dans la notice développée.
        </b>{" "}
        <br /> <br />
        1) A l'import, dans mon fichier, je renseigne obligatoirement 3 champs : <br />
        - le champ REF contenant la Référence Mémoire à laquelle je veux attacher une image
        <br />
        - le champ LBASE contenant la Référence Mérimée ou Palissy MH que je veux illustrer
        <br />- le champ IMG ou REFIMG contenant une image au format .jpeg (peu importe le nom du
        champ, les deux passent à l'import. En revanche, une fois l'import effectué, le champ REFIMG
        devient le champ IMG, seul champ affiché dans la notice développée)
        <br /> <br />
        2) Directement depuis une notice Mémoire : je peux cliquer sur "Ajouter une nouvelle image"
        et importer une nouvelle image directement depuis mon ordinateur. La notice Mémoire reçoit
        alors dans son champ IMG le contenu .jpeg. Si le champ LBASE contient bien la REF Mérimée ou
        Palissy MH associée, alors l'image ainsi stockée dans IMG illustrera bien la notice MH."
        <br /> <br />
        NB : à la création d'une notice, POP génère automatiquement certains champs utiles au
        traitement des données. Il s'agit des champs : <br />
        <br />
        Mémoire :
        <ul>
          {generatedMemoireFields.map(e => (
            <li key={e}>{e} </li>
          ))}
        </ul>
        Mérimee :
        <ul>
          {generatedMerimeeFields.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        Palissy :
        <ul>
          {generatedPalissyFields.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        Aucun besoin de les renseigner lors d'un import.
        <br />
        <br />
        <a
          href="https://github.com/betagouv/pop/tree/master/apps/api/doc/memoire.md"
          target="_blank"
        >
          Lien vers le modèle de donnée Mémoire
        </a>
        <br />
        <a
          href="https://github.com/betagouv/pop/tree/master/apps/api/doc/palissy.md"
          target="_blank"
        >
          Lien vers le modèle de donnée Palissy
        </a>
        <br />
        <a
          href="https://github.com/betagouv/pop/tree/master/apps/api/doc/merimee.md"
          target="_blank"
        >
          Lien vers le modèle de donnée Mérimée
        </a>
        <br />
      </div>
    </div>
  );
}
