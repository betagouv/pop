import React from "react";
import { Container } from "reactstrap";
import Mapping from "../../services/mapping";
import Importer from "./importer";
import Museo from "../../entities/Museo";

import utils from "./utils";

export default class Import extends React.Component {
  render() {
    return (
      <Container className="import">
        <Importer
          collection="museo"
          parseFiles={parseFiles}
          readme={readme}
          destinataires={["natacha.villeroy@culture.gouv.fr"]}
          defaultEncoding="UTF-8"
        />
      </Container>
    );
  }
}

function parseFiles(files, encoding) {
  return new Promise(async (resolve, reject) => {
    try {
      var file = files.find(file => ("" + file.name.split(".").pop()).toLowerCase() === "csv");
      if (!file) {
        reject("Fichier .csv absent");
        return;
      }
      const notices = await utils.readCSV(file, ";", encoding, '"');
      const importedNotices = notices.map(e => new Museo(e));
      resolve({ importedNotices, fileNames: [file.name] });
    } catch (e) {
      reject(`Erreur détectée. Vérifiez le format de votre fichier. (${JSON.stringify(e)} )`);
    }
  });
}

function readme() {
  const generatedFields = Object.keys(Mapping.museo).filter(e => {
    return Mapping.museo[e].generated;
  });
  const controlsFields = Object.keys(Mapping.museo).filter(e => {
    return Mapping.museo[e].validation;
  });
  const requiredFields = Object.keys(Mapping.museo).filter(e => {
    return Mapping.museo[e].required;
  });

  return (
    <div>
      <h5>Museo</h5>
      <div>
        Cet onglet permet d’alimenter la base Museo. <br /> <br />
        <h6>Formats d’import </h6>
        Les formats de données pris en charge sont les suivants&nbsp;: <br />
        <ul>
          <li>texte : csv (séparateur : point-virgule, encodage : UTF8) </li>
        </ul>
        La taille maximale d’un import est de 300Mo (soit environ 3000 notices avec image, ou 1
        million de notices sans images). <br /> <br />
        <h6>Champs obligatoires et contrôles de vocabulaire </h6>
        Les champs suivants doivent obligatoirement être renseignés : <br />
        <br />
        <ul>
          {requiredFields.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <br />
        <h6>Test de validation des champs : </h6>
        Les tests suivants sont effectués lors des imports
        <br />
        <br />
        <ul>
          {controlsFields.map(e => (
            <li key={e}>
              {e} : {Mapping.mnr[e].validation}
            </li>
          ))}
        </ul>
        <br />
        <h5>Que voulez-vous faire ?</h5>
        <h6>Je veux créer une notice :</h6>
        j’importe la notice.
        <br />
        <br />
        <h6>Je veux mettre à jour tout ou partie d’une notice :</h6>
        j’importe les champs à mettre à jour avec leurs nouvelles valeurs et j’écrase l’ancienne
        notice.
        <br />
        <br />
        <h6>Je veux effacer une ou plusieurs valeurs d’une notice : </h6>
        j’importe un fichier comportant le ou les champs que je veux supprimer en les laissant
        vides.
        <br />
        <br />
        <h6>Je veux supprimer une notice :</h6>
        je contacte l’administrateur de la base.
        <br />
        <br />
        <h6>Je veux ajouter une image :</h6>
        1) Sur une notice déjà existante, je peux cliquer sur "Ajouter une image" et télécharger une
        image depuis mon ordinateur. Le champ PHOTO contiendra le lien de l'image ainsi téléchargée.
        <br />
        <br />
        NB : à la création d'une notice, POP génère automatiquement certains champs utiles au
        traitement des données. Il s'agit des champs : <br />
        <ul>
          {generatedFields.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        Aucun besoin de les renseigner lors d'un import.
        <br />
        <br />
        <a href="https://github.com/betagouv/pop/tree/master/apps/api/doc/mnr.md" target="_blank">
          Lien vers le modèle de donnée Mnr
        </a>
        <br />
      </div>
    </div>
  );
}
