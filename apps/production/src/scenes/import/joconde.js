import React from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import Mapping from "../../services/mapping";
import Importer from "./importer";
import Joconde from "../../entities/Joconde";

import api from "../../services/api";

import utils from "./utils";

class Import extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      museofile: this.props.museofile && this.props.museofile.length ? this.props.museofile[0] : ""
    };
  }
  parseFiles(files, encoding) {
    return new Promise(async (resolve, reject) => {
      // Test ajout piloté format
      let rootFile = files.find(file => ("" + file.name.split(".").pop()).toLowerCase() === "txt");
      if (rootFile) {
        const res = await utils.asyncReadFile(rootFile, encoding);
        const importedNotices = await importAjoutPiloté(res, files, this.state.museofile);
        resolve({ importedNotices, fileNames: [rootFile.name] });
        return;
      }

      // Test Excel format
      rootFile = files.find(file => ("" + file.name.split(".").pop()).toLowerCase() === "csv");
      if (rootFile) {
        const res = await utils.readCSV(rootFile, ";", encoding, '"');

        const importedNotices = await importCSV(res, files, this.state.museofile);
        resolve({ importedNotices, fileNames: [rootFile.name] });
        return;
      }

      reject("Fichier .csv ou .txt absent");
      return;
    });
  }

  renderMuseoFiles() {
    const options = (this.props.museofile || []).map(o => <option key={o}>{o}</option>);
    return (
      <div style={{ alignSelf: "flex-start", display: "flex", padding: "15px 0px 15px 0px" }}>
        <div style={{ paddingRight: "10px" }}>Code MUSEO : </div>
        <select
          onChange={e => this.setState({ museofile: e.target.value })}
          value={this.state.museofile}
        >
          {options}
        </select>
      </div>
    );
  }
  render() {
    return (
      <Container className="import">
        <Importer
          collection="joconde"
          parseFiles={this.parseFiles.bind(this)}
          destinataires={["sophie.daenens@culture.gouv.fr", "jeannette.ivain@culture.gouv.fr"]}
          report={report}
          readme={readme}
          fieldsToExport={[
            { name: "Identifiant", key: "REF" },
            { name: "N° inventaire", key: "INV" }
          ]}
          dropzoneText="Glissez & déposez vos fichiers au format joconde (.txt ou .csv) et les images associées (au format .jpg) dans cette zone"
          children={this.renderMuseoFiles()}
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

function importCSV(res, files, museofile) {
  return new Promise(async (resolve, reject) => {
    const importedNotices = res
      .map(value => {
        value.MUSEO = value.MUSEO || museofile || "";

        //I add 0 in front of REF when we import csv file
        if (value.REF.length < 11) {
          value.REF = addZeros(value.REF, 11);
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

      if (!names) {
        continue;
      }
      for (var j = 0; j < names.length; j++) {
        let img = filesMap[Joconde.convertLongNameToShort(names[j])];
        if (!img) {
          importedNotices[i]._errors.push(
            `Image ${Joconde.convertLongNameToShort(names[j])} introuvable`
          );
        } else {
          const shortname = Joconde.convertLongNameToShort(img.name);
          let newImage = utils.renameFile(img, shortname);
          importedNotices[i]._files.push(newImage);
          importedNotices[i].IMG = `joconde/${importedNotices[i].REF}/${importedNotices[i].IMG}`;
        }
      }
    }

    resolve(importedNotices);
  });
}

function importAjoutPiloté(res, files, museofile) {
  return new Promise(async (resolve, reject) => {
    const importedNotices = utils
      .parseAjoutPilote(res, Joconde)
      .map(value => {
        value.MUSEO = value.MUSEO || museofile || "";
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
      if (!names) {
        continue;
      }
      for (var j = 0; j < names.length; j++) {
        let img = filesMap[Joconde.convertLongNameToShort(names[j])];
        if (!img) {
          importedNotices[i]._errors.push(
            `Image ${Joconde.convertLongNameToShort(names[j])} introuvable`
          );
        } else {
          const shortname = Joconde.convertLongNameToShort(img.name);
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

  const diffUrl = `http://pop${
    process.env.NODE_ENV === "production" ? "" : "-staging"
  }.culture.gouv.fr/search/list?import=["${importId}"]`;

  const fileUrl = `https://s3.eu-west-3.amazonaws.com/pop-phototeque${
    process.env.NODE_ENV === "production" ? "" : "-staging"
  }/import/${importId}/import.csv`;

  const created = notices.filter(e => e._status === "created");
  const updated = notices.filter(e => e._status === "updated");
  const rejected = notices.filter(e => e._status === "rejected");

  const imagesNumber = notices.reduce((acc, val) => {
    if (val.status === "created" || val.status === "updated") {
      return acc + val.images.length;
    }
    return acc;
  }, 0);

  let contact = "jeannette.ivain@culture.gouv.fr et sophie.daenens@culture.gouv.fr";

  arr.push(`<h1>Rapport de chargement ${collection} du ${dateStr}</h1>`);
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

  const URL = `http://pop${
    process.env.NODE_ENV === "production" ? "" : "-staging"
  }.culture.gouv.fr/notice/joconde/`;

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

  {
    arr.push(`<h1>Liens</h1>`);
    arr.push(`<a href='${diffUrl}'>Consulter les notices en diffusion</a><br/>`);
    arr.push(`<a href='${fileUrl}'>Télécharger le détail de l'import</a>`);
  }
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
    return Mapping.joconde[e].generated;
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
        Cet onglet permet d’alimenter la base Joconde. Avant tout import dans la base, veuillez
        prendre connaissance de la{" "}
        <a
          href="https://s3.eu-west-3.amazonaws.com/pop-general/POP_Joconde_engagements_VD.pdf"
          target="_blank"
        >
          Charte d'engagement
        </a>{" "}
        relative au versement des données dans la base Joconde <br /> <br />
        <h6>Formats d’import </h6>
        Les formats de données pris en charge sont les suivants&nbsp;: <br />
        <ul>
          <li>Ajout piloté.</li>
          <li>CSV (UTF8, séparateur ';') </li>
          <li>Illustration : jpg, png.</li>
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
              {e} : {Mapping.joconde[e].validation}
            </li>
          ))}
        </ul>
        <br />
        <h6>Test de thésaurus des champs : </h6>
        Les champs suivants sont testés avec des thésaurus
        <br />
        <br />
        <ul>
          {thesaurusedFields.map(e => (
            <li key={e}>
              {Mapping.joconde[e].label || e} :{" "}
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
          href="https://github.com/betagouv/pop/tree/master/apps/api/doc/joconde.md"
          target="_blank"
        >
          Lien vers le modèle de donnée Joconde
        </a>
        <br />
      </div>
    </div>
  );
}

function addZeros(v, zeros) {
  return new Array(zeros)
    .concat([v])
    .join("0")
    .slice(-zeros);
}
