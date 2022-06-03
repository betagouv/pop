import React from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import Mapping from "../../services/mapping";
import Importer from "./importer";
import Enluminures from "../../entities/Enluminures";
import utils from "./utils";
import { pop_url, bucket_url } from "../../config";

class Import extends React.Component {
  constructor(props) {
    super(props);
  }
  parseFiles(files, encoding) {
    return new Promise(async (resolve, reject) => {

      // Test Excel format
      let rootFile = files.find(file => ("" + file.name.split(".").pop()).toLowerCase() === "csv");
      if (rootFile) {
        try {
          const res = await utils.readCSV(rootFile, ";", encoding, '"');
          const importedNotices = await importCSV(res, files);
          resolve({ importedNotices, fileNames: [rootFile.name] });
          return;
        } catch (e) {
          console.log("error", e);
          reject("Fichier .csv mal formaté ( vérifiez que le séparateur est ';' ) ");
          return;
        }
      }

      reject("Fichier .csv absent");
      return;
    });
  }

  render() {
    return (
      <Container className="import">
        <Importer
          collection="enluminures"
          parseFiles={this.parseFiles.bind(this)}
          recipient="enluminures"
          report={report}
          readme={readme}
          fieldsToExport={[
            { name: "Identifiant", key: "REF" }
          ]}
          dropzoneText={
            <span>
              Glissez & déposez vos fichiers au format <b>enluminures</b> (<code>.csv</code>) et les images associées (au format <code>.jpg</code>) dans cette
              zone
            </span>
          }
          defaultEncoding="UTF-8"
        />
      </Container>
    );
  }
}

const mapstatetoprops = ({ Auth }) => {
  const { museofile, email } = Auth.user;
  return {
    museofile,
    email
  };
};

export default connect(
  mapstatetoprops,
  {}
)(Import);

function importCSV(res, files) {
  return new Promise(async (resolve, reject) => {
    const importedNotices = res
      .map(value => new Enluminures(value));

    const filesMap = {};
    for (var i = 0; i < files.length; i++) {
      // Sometimes, name is the long name with museum code, sometimes its not...
      // The easiest way I found was to transform long name to short name each time I get a file name.
      filesMap[Enluminures.convertLongNameToShort(files[i].name)] = files[i];
    }

    // ADD IMAGES
    for (var i = 0; i < importedNotices.length; i++) {
      const names = importedNotices[i].IMG;

      if (!names) {
        continue;
      }
      for (var j = 0; j < names.length; j++) {
        let img = filesMap[Enluminures.convertLongNameToShort(names[j])];
        if (!img) {
          importedNotices[i]._errors.push(
            `Image ${Enluminures.convertLongNameToShort(names[j])} introuvable`
          );
        } else {
          const shortname = Enluminures.convertLongNameToShort(img.name);
          let newImage = utils.renameFile(img, shortname);
          importedNotices[i]._files.push(newImage);
        }
      }
    }

    resolve(importedNotices);
  });
}

function report(notices, collection, email, institution, importId) {
  const arr = [];

  const dateStr = utils.formatDate();

  const diffUrl = `${pop_url}/search/list?import=["${importId}"]`;

  const fileUrl = `${bucket_url}import/${importId}/import.csv`;

  const created = notices.filter(e => e._status === "created");
  const updated = notices.filter(e => e._status === "updated");
  const rejected = notices.filter(e => e._status === "rejected");

  const imagesNumber = notices.reduce((acc, val) => {
    if (val.status === "created" || val.status === "updated") {
      return acc + val.images.length;
    }
    return acc;
  }, 0);

  let contact = "sophie.daenens@culture.gouv.fr et angelina.meslem@culture.gouv.fr";

  arr.push(`<h1>Rapport de chargement ${collection} du ${dateStr}</h1>`);
  arr.push(`<h2>Établissement : ${institution}</h2>`);
  arr.push(`<h2>Producteur : ${email}</h2>`);
  arr.push(`<h2>Contact : ${contact}</h2>`);
  arr.push(`<p>Nombre de notices chargées: ${notices.length}</p>`);
  arr.push(`<ul>`);
  arr.push(`<li>${notices.length - rejected.length} notice(s) valide(s)</li>`);
  arr.push(`<li style="list-style-type:none">`);
  arr.push(`<ul>`);
  arr.push(`<li>${created.length} notice(s) créée(s)</li>`);
  arr.push(`<li>${updated.length} notice(s) mise(s) à jour</li>`);
  arr.push(
    `<li>${notices.length -
      rejected.length -
      created.length -
      updated.length} notice(s) importée(s) sans mise à jour</li>`
  );
  arr.push(`<li>${imagesNumber} image(s) chargée(s)</li>`);
  arr.push(`</ul>`);
  arr.push(`</li >`);
  arr.push(`<li>${rejected.length} notice(s) rejetée(s)</li>`);
  arr.push(`</ul>`);

  let obj = {};
  let count = 0;

  const URL = `${pop_url}/notice/enluminures/`;

  for (let i = 0; i < notices.length; i++) {
    for (let j = 0; j < notices[i]._warnings.length; j++) {
      count++;
      if (obj[notices[i]._warnings[j]] !== undefined) {
        obj[notices[i]._warnings[j]].count = obj[notices[i]._warnings[j]].count + 1;
        obj[notices[i]._warnings[j]].notices.push(
          `<a href="${URL}${notices[i].REF}">${notices[i].REF}<a/> (${notices[i].INV})`
        );
      } else {
        obj[notices[i]._warnings[j]] = {
          count: 1,
          notices: [`<a href="${URL}${notices[i].REF}">${notices[i].REF}<a/> (${notices[i].INV})`]
        };

        let idThesaurus = notices[i]._warnings[j].substr(notices[i]._warnings[j].indexOf(')]') -3, 3);
        if(!Number.isNaN(parseInt(idThesaurus))){
          obj[notices[i]._warnings[j]].idThesaurus = idThesaurus;
        }
      }
    }
  }

  arr.push(`<h1>Liens</h1>`);
  arr.push(`<a href='${diffUrl}'>Consulter les notices en diffusion</a><br/>`);
  arr.push(`<a href='${fileUrl}'>Télécharger le détail de l'import</a>`);
  
  return arr.join("");
}

function readme() {
  const generatedFields = Object.keys(Mapping.enluminures).filter(e => {
    return Mapping.enluminures[e].generated;
  });
  const controlsFields = Object.keys(Mapping.enluminures).filter(e => {
    return Mapping.enluminures[e].validation;
  });
  const requiredFields = Object.keys(Mapping.enluminures).filter(e => {
    return Mapping.enluminures[e].required;
  });
  const thesaurusedFields = Object.keys(Mapping.enluminures).filter(e => {
    return Mapping.enluminures[e].thesaurus;
  });

  return (
    <div>
      <h5>Enluminures</h5>
      <div>
        Cet onglet permet d’alimenter la base Enluminures. Avant tout import dans la base, veuillez
        prendre connaissance de la{" "}
        <a
          href="https://s3.eu-west-3.amazonaws.com/pop-general/POP_Enluminures_engagements_VD.pdf"
          target="_blank"
          rel="noopener"
        >
          Charte d'engagement
        </a>{" "}
        relative au versement des données dans la base Enluminures <br /> <br />
        <h6>Exemple de fichier d'import csv</h6>
        <a href="https://pop-general.s3.eu-west-3.amazonaws.com/import_examples/enluminures.zip">
            enluminures csv
        </a>
        <br /> <br />
        <h6>Formats d’import </h6>
        Les formats de données pris en charge sont les suivants&nbsp;: <br />
        <ul>
          <li>CSV (UTF8, séparateur ';') </li>
          <li>Illustration : jpg, png.</li>
        </ul>
        La taille maximale d’un import est de 300Mo (soit environ 3000 notices avec image, ou 1
        million de notices sans images). <br /> <br />
        <h6>Champs obligatoires</h6>
        Les champs suivants doivent obligatoirement être renseignés : <br />
        <br />
        <ul>
          {requiredFields.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <br />
        <ul>
          {controlsFields.map(e => (
            <li key={e}>
              {e} : {Mapping.enluminures[e].validation}
            </li>
          ))}
        </ul>
        <br />
        <h5>Que voulez-vous faire ?</h5>
        <h6>Je veux créer une notice :</h6>
        J’importe la notice.
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
        1) Si présence du champ Adresse d'images (REFIM) alors l'image (.jpg) est obligatoire.
        <br />
        2) Sur une notice déjà existante, je peux cliquer sur "Ajouter une image" et télécharger une
        image depuis mon ordinateur. Le champ IMG contiendra le lien de l'image ainsi téléchargée.
        <br />
        <br />
        NB : à la création d'une notice, POP génère automatiquement certains champs utiles au
        traitement des données. Il s'agit des champs : <br />
        <br />
        <ul>
          {generatedFields.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        Aucun besoin de les renseigner lors d'un import.
        <br />
        <br />
        <a
          href="https://github.com/betagouv/pop/tree/master/apps/api/doc/enluminures.md"
          target="_blank"
          rel="noopener"
        >
          Lien vers le modèle de donnée Enluminures
        </a>
        <br />
      </div>
    </div>
  );
}