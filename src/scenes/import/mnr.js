import React from "react";
import { Container } from "reactstrap";
import Importer from "./importer";
import Mnr from "../../entities/Mnr";

import utils from "./utils";

export default class Import extends React.Component {
  render() {
    return (
      <Container className="import">
        <Importer collection="mnr" parseFiles={parseFiles} />
      </Container>
    );
  }
}

function parseFiles(files, encoding) {
  return new Promise((resolve, reject) => {
    var file = files.find(
      file => ("" + file.name.split(".").pop()).toLowerCase() === "csv"
    );
    if (!file) {
      reject("Fichier .csv absent");
      return;
    }

    utils.readCSV(file, ",", encoding, '"').then(notices => {
      const importedNotices = notices.map(e => new Mnr(e));
      resolve({ importedNotices, fileNames: [file.name] });
    });
  });
}
