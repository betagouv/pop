import React from "react";
import { Container } from "reactstrap";
import Mapping from "../../services/mapping";
import Importer from "./importer";
import Merimee from "../../entities/Merimee";
import Memoire from "../../entities/Memoire";
import Palissy from "../../entities/Palissy";
import Autor from "../../entities/Autor";

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
          recipient="mh"
          dropzoneText={
            <span>
              Glissez & déposez vos fichiers au format <b>MH</b> (extension <code>.csv</code> avec
              séparateur <code>|</code>) et les images associées (au format <code>.jpg</code>) dans
              cette zone
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

      let newNotice;

      
      //On parcourt les producteurs pour savoir si le préfixe de la notice correspond à un des préfixes des producteurs mérimée, palissy ou mémoire
      let collection = "";
      let producteurs = [];
      const response = await api.getProducteurs();

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


      if (collection === "palissy") {
        newNotice = new Palissy(obj);
        addFile("POP_DOSSIER_PROTECTION", "POP_DOSSIER_PROTECTION", obj, newNotice, filesMap);
        addFile("POP_ARRETE_PROTECTION", "POP_ARRETE_PROTECTION", obj, newNotice, filesMap);
        addFile("POP_DOSSIER_VERT", "POP_DOSSIER_VERT", obj, newNotice, filesMap);
      } else if (collection === "merimee") {
        newNotice = new Merimee(obj);
        addFile("DOSURLPDF", "DOSURLPDF", obj, newNotice, filesMap);
      } else if (collection === "memoire") {
        newNotice = new Memoire(obj);
        addFile("REFIMG", "IMG", obj, newNotice, filesMap);
      } else if (collection === "autor") {
        newNotice = new Autor(obj);
      } else {
        reject(`La référence ${obj.REF} n'est ni palissy, ni mérimée, ni memoire, ni autor`);
        return;
      }

      importedNotices.push(newNotice);
    }
    resolve({ importedNotices, fileNames: [objectFile.name] });
  });
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
        } else {
          newNotice._errors.push(`Impossible de trouver le fichier "${fileName}"`);
        }
      }
    }
  }
}

function convertLongNameToShort(str) {
  return str.substring(str.lastIndexOf("/") + 1);
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
  const generatedAutorFields = Object.keys(Mapping.autor).filter(e => {
    return Mapping.autor[e].generated;
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
  const validationAutorFields = Object.keys(Mapping.autor).filter(e => {
    return Mapping.autor[e].validation;
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
  const requiredAutorFields = Object.keys(Mapping.autor).filter(e => {
    return Mapping.autor[e].required;
  });

  // MH specific.
  requiredMerimeeFields.push("DPT");
  requiredMerimeeFields.push("INSEE");
  requiredPalissyFields.push("DPT");
  requiredPalissyFields.push("INSEE");

  return (
    <div>
      <h5>Monuments historiques</h5>
      <div>
        Cet onglet permet d’alimenter les bases Mérimée MH, Palissy MH, Mémoire MH (CRMH, CAOA,
        UDAP) et Autor <br /> <br />
        <h6>Formats d’import </h6>
        Les formats de données pris en charge sont les suivants&nbsp;: <br />
        <ul>
          <li>texte : csv (séparateur : | ) </li>
          <li>illustration : jpg, png.</li>
        </ul>
        La taille maximale d’un import est de 300Mo (soit environ 3000 notices avec image, ou 1
        million de notices sans images). <br /> <br />
        Exemple de fichier importé merimee :{" "}
        <a href="https://s3.eu-west-3.amazonaws.com/pop-general/import_examples/mh_merimee.zip">
          mh_merimee
        </a>
        <br />
        Exemple de fichier importé palissy :{" "}
        <a href="https://s3.eu-west-3.amazonaws.com/pop-general/import_examples/mh_palissy.zip">
          mh_palissy
        </a>
        <br />
        Exemple de fichier importé memoire :{" "}
        <a href="https://s3.eu-west-3.amazonaws.com/pop-general/import_examples/mh_memoire.zip">
          mh_memoire
        </a>
        <br />
        <br />
        <br />
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
        Autor :
        <ul>
          {requiredAutorFields.map(e => (
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
        Autor :
        <ul>
          {validationAutorFields.map(e => (
            <li key={e}>
              {e} : {Mapping.autor[e].validation}
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
          Dans les 2 cas, l'image est stockée uniquement dans la base Mémoire/MAP dans le champ IMG,
          seul champ image affiché dans la notice développée.
        </b>{" "}
        <br /> <br />
        1) A l'import, dans mon fichier, je renseigne obligatoirement 3 champs : <br />
        - le champ REF contenant la Référence Mémoire à laquelle je veux attacher une image
        <br />
        - le champ LBASE contenant la Référence Mérimée ou Palissy MH que je veux illustrer
        <br />- le champ REFIMG contenant une image au format .jpeg (A noter que le nom de l'image
        doit être en minuscule)
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
        Autor :
        <ul>
        {generatedAutorFields.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        Aucun besoin de les renseigner lors d'un import.
        <br />
        <br />
        <a
          href="https://github.com/betagouv/pop/tree/master/apps/api/doc/memoire.md"
          target="_blank"
          rel="noopener"
        >
          Lien vers le modèle de donnée Mémoire
        </a>
        <br />
        <a
          href="https://github.com/betagouv/pop/tree/master/apps/api/doc/palissy.md"
          target="_blank"
          rel="noopener"
        >
          Lien vers le modèle de donnée Palissy
        </a>
        <br />
        <a
          href="https://github.com/betagouv/pop/tree/master/apps/api/doc/merimee.md"
          target="_blank"
          rel="noopener"
        >
          Lien vers le modèle de donnée Mérimée
        </a>
        <br />
      </div>
    </div>
  );
}
