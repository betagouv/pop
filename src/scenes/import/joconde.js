import React from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { Mapping } from "pop-shared";
import Importer from "./importer";
import Joconde from "../../entities/Joconde";

import utils from "./utils";

class Import extends React.Component {
  parseFiles(files, encoding) {
    return new Promise((resolve, reject) => {
      var file = files.find(
        file => ("" + file.name.split(".").pop()).toLowerCase() === "txt"
      );
      if (!file) {
        reject("Fichier .txt absent");
        return;
      }

      utils.readFile(file, encoding, res => {
        const importedNotices = utils
          .parseAjoutPilote(res, Joconde)
          .map(value => {
            if (!value.MUSEO && this.props.museofile) {
              value.MUSEO = this.props.museofile;
            }
            return value;
          })
          .map(value => new Joconde(value));

        const filesMap = {};
        for (var i = 0; i < files.length; i++) {
          //Sometimes, name is the long name with museum code, sometimes its not... The easiest way I found was to transform long name to short name each time I get a file name
          filesMap[Joconde.convertLongNameToShort(files[i].name)] = files[i];
        }

        //ADD IMAGES
        for (var i = 0; i < importedNotices.length; i++) {
          const names = importedNotices[i].IMG;
          for (var j = 0; j < names.length; j++) {
            let img = filesMap[Joconde.convertLongNameToShort(names[j])];
            if (!img) {
              importedNotices[i]._errors.push(
                `Image ${Joconde.convertLongNameToShort(names[j])} introuvable`
              );
            } else {
              const shortname = Joconde.convertLongNameToShort(img.name);
              let newImage = utils.renameFile(img, shortname);
              importedNotices[i]._images.push(newImage);
            }
          }
        }

        resolve({ importedNotices, fileNames: [file.name] });
      });
    });
  }
  render() {
    return (
      <Container className="import">
        <Importer
          collection="joconde"
          parseFiles={this.parseFiles.bind(this)}
          report={report}
          readme={readme}
          fieldsToExport={[
            { name: "Identifiant", key: "REF" },
            { name: "N° inventaire", key: "INV" }
          ]}
          dropzoneText="Glissez & déposez vos fichiers au format joconde (.txt) et les images associées (au format .jpg) dans cette zone"
        />
      </Container>
    );
  }
}

const mapstatetoprops = ({ Auth }) => {
  const { museofile } = Auth.user;
  return {
    museofile
  };
};

export default connect(
  mapstatetoprops,
  {}
)(Import);

function report(notices, collection, email, institution) {
  const arr = [];

  const d = new Date();
  var months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "decembre"
  ];
  const date = ("0" + d.getDate()).slice(-2);
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const minutes = ("0" + d.getMinutes()).slice(-2);
  const hours = ("0" + d.getHours()).slice(-2);

  const created = notices.filter(e => e._status === "created");
  const updated = notices.filter(e => e._status === "updated");
  const rejected = notices.filter(e => e._status === "rejected");

  const imagesNumber = notices.reduce((acc, val) => {
    if (val.status === "created" || val.status === "updated") {
      return acc + val.images.length;
    }
    return acc;
  }, 0);

  let contact =
    "jeannette.ivain@culture.gouv.fr et sophie.daenens@culture.gouv.fr";

  arr.push(
    `<h1>Rapport de chargement ${collection} du ${date} ${month} ${year}, ${hours}h${minutes}</h1>`
  );
  arr.push(`<h2>Établissement: ${institution}</h2>`);
  arr.push(`<h2>Producteur: ${email}</h2>`);
  arr.push(`<h2>Contact: ${contact}</h2>`);
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

  const obj = {};
  let count = 0;

  console.log(notices);

  const URL = `http://pop${
    process.env.NODE_ENV === "production" ? "" : "-staging"
  }.culture.gouv.fr/notice/joconde/`;

  for (let i = 0; i < notices.length; i++) {
    for (let j = 0; j < notices[i]._warnings.length; j++) {
      count++;
      if (obj[notices[i]._warnings[j]] !== undefined) {
        obj[notices[i]._warnings[j]].count =
          obj[notices[i]._warnings[j]].count + 1;
        obj[notices[i]._warnings[j]].notices.push(
          `<a href="${URL}${notices[i].REF}">${notices[i].REF}<a/> (${
            notices[i].INV
          })`
        );
      } else {
        obj[notices[i]._warnings[j]] = {
          count: 1,
          notices: [
            `<a href="${URL}${notices[i].REF}">${notices[i].REF}<a/> (${
              notices[i].INV
            })`
          ]
        };
      }
    }
  }

  arr.push(`<p>${count} avertissement(s) dont : </p>`);
  arr.push(`<ul>`);
  for (let key in obj) {
    const count = obj[key].count;
    const nots = obj[key].notices;
    const { terme, champ, thesaurus } = regexIt(key);

    arr.push(
      `<li>${count} sur le terme <strong>${terme}</strong> du champ <strong>${champ}</strong> est non conforme au thésaurus <strong>${thesaurus}</strong> :</li>`
    );
    arr.push(`<ul>`);
    arr.push(...nots.map(e => `<li>${e}</li>`));
    arr.push(`</ul>`);
  }
  arr.push(`</ul>`);
  return arr.join("");
}

function regexIt(str) {
  const arr = [];
  const regex = /Le champ (.+) avec la valeur (.+) n'est pas conforme avec le thesaurus http:\/\/data\.culture\.fr\/thesaurus\/resource\/ark:\/(.+)/gm;
  let m;

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      arr.push(match);
    });
  }

  return { terme: arr[2], champ: arr[1], thesaurus: arr[3] };
}

function readme() {
  const generatedFields = Object.keys(Mapping.joconde).filter(e => {
    return Mapping.joconde[e].master;
  });
  const controlsFields = Object.keys(Mapping.joconde).filter(e => {
    return Mapping.joconde[e].validation;
  });
  const requiredFields = Object.keys(Mapping.joconde).filter(e => {
    return Mapping.joconde[e].required;
  });
  const thesaurusedFields = Object.keys(Mapping.joconde).filter(e => {
    return Mapping.joconde[e].thesaurus;
  });

  return (
    <div>
      <h5>Joconde</h5>
      <div>
        Cet onglet permet d’alimenter la base Joconde. Avant tout import dans la
        base, veuillez prendre connaissance de la{" "}
        <a
          href="https://s3.eu-west-3.amazonaws.com/pop-general/POP_Joconde_engagements_VD.pdf"
          target="_blank"
        >
          Charte d'engagement
        </a>{" "}
        relative au versement des données dans la base Joconde <br /> <br />
        <h6>Formats d’import </h6>
        Les formats de données pris en charge sont les suivants : <br />
        <ul>
          <li>texte : txt ajout piloté </li>
          <li>illustration : jpg, png.</li>
        </ul>
        La taille maximale d’un import est de 300Mo (soit environ 3000 notices
        avec image, ou 1 million de notices sans images). <br /> <br />
        <h6>Champs obligatoires et contrôles de vocabulaire </h6>
        Les champs suivants doivent obligatoirement être renseignés : <br />
        <br />
        <ul>
          {requiredFields.map(e => (
            <li>{e}</li>
          ))}
        </ul>
        <br />
        <h6>Test de validation des champs : </h6>
        Les tests suivants sont effectués lors des imports<br />
        <br />
        <ul>
          {controlsFields.map(e => (
            <li>
              {e} : {Mapping.joconde[e].validation}
            </li>
          ))}
        </ul>
        <br />
        <h6>Test de thésaurus des champs : </h6>
        Les champs suivants sont testés avec des thésaurus<br />
        <br />
        <ul>
          {thesaurusedFields.map(e => (
            <li>
              {e} :{" "}
              {Mapping.joconde[e].thesaurus.replace(
                "http://data.culture.fr/thesaurus/resource/ark:/",
                ""
              )}
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
        j’importe les champs à mettre à jour avec leurs nouvelles valeurs et
        j’écrase l’ancienne notice.
        <br />
        <br />
        <h6>Je veux effacer une ou plusieurs valeurs d’une notice : </h6>
        j’importe un fichier comportant le ou les champs que je veux supprimer
        en les laissant vides.
        <br />
        <br />
        <h6>Je veux supprimer une notice :</h6>
        je contacte l’administrateur de la base.
        <br />
        <br />
        <h6>Je veux ajouter une image :</h6>
        1) Si présence du champ Adresse d'images (REFIM) alors l'image (.jpg)
        est obligatoire.
        <br />
        2) Sur une notice déjà existante, je peux cliquer sur "Ajouter une
        image" et télécharger une image depuis mon ordinateur. Le champ IMG
        contiendra le lien de l'image ainsi téléchargée.
        <br />
        <br />
        NB : à la création d'une notice, POP génère automatiquement certains
        champs utiles au traitement des données. Il s'agit des champs : <br />
        <ul>
          {generatedFields.map(e => (
            <li>{e}</li>
          ))}
        </ul>
        Aucun besoin de les renseigner lors d'un import.
        <br />
        <br />
        <a
          href="https://github.com/betagouv/pop-api/blob/master/doc/joconde.md"
          target="_blank"
        >
          Lien vers le modèle de donnée Joconde
        </a>
        <br />
      </div>
    </div>
  );
}
