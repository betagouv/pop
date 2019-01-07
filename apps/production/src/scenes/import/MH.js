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
            <div>
              Glissez & déposez vos fichiers au format MH ( extension .csv avec
              séparateur | ) et les images associées (au format .jpg) dans cette
              zone
              <br />
            </div>
          }
        />
      </Container>
    );
  }
}

function parseFiles(files, encoding) {
  return new Promise((resolve, reject) => {
    var objectFile = files.find(file => file.name.includes(".csv"));
    if (!objectFile) {
      reject("Pas de fichiers .csv detecté");
      return;
    }
    utils.readCSV(objectFile, "|", encoding).then(async objs => {
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
        } else if (obj.REF.indexOf("OA") !== -1) {
          const fileName = String(obj.REFIMG);
          obj.IMG = fileName;
          newNotice = new Memoire(obj);
          let img = filesMap[fileName];
          if (img) {
            newNotice._images.push(img);
          } else {
            newNotice._errors.push(
              `Impossible de trouver l'image "${fileName}"`
            );
          }
        } else {
          reject(`La référence ${obj.REF} n'est ni palissy, ni mérimée`);
          return;
        }

        const { DPT, INSEE } = newNotice;
        if (newNotice._type !== "memoire") {
          if (!INSEE) {
            newNotice._errors.push("INSEE ne doit pas être vide");
          }
          if (!DPT) {
            newNotice._errors.push("DPT ne doit pas être vide");
          }
          if (INSEE && DPT && !String(INSEE).startsWith(String(DPT))) {
            newNotice._errors.push("INSEE et Département ne coincident pas");
          }
        }

        importedNotices.push(newNotice);
      }
      resolve({ importedNotices, fileNames: [objectFile.name] });
    });
  });
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
        Cet onglet permet d’alimenter les bases Mérimée MH, Palissy MH et
        Mémoire MH (CRMH, CAOA, UDAP) <br /> <br />
        <h6>Formats d’import </h6>
        Les formats de données pris en charge sont les suivants : <br />
        <ul>
          <li>texte : csv (séparateur : | ) </li>
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
        POP génère automatiquement un indentifiant MH pour palissy et mérimée.
        Il suffit de noter en REF uniquement PA ou PM
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
        2) Importer une notice mémoire en "OA" et avoir le champs REFIMG
        complété avec le nom de l'image exacte
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
