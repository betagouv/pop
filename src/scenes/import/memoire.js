import React from "react";
import { Container } from "reactstrap";
import Importer from "./importer";
import Memoire from "../../entities/memoire";

import utils from "./utils";

export default class Import extends React.Component {
  render() {
    return (
      <Container className="import">
        <Importer
          collection="memoire"
          parseFiles={parseFiles}
          dropzoneText="Glissez & déposez vos fichiers au format mémoire ( extension .ods  ) et les images associées (au format .jpg) dans cette zone"
        />
      </Container>
    );
  }
}

function parseFiles(files, encoding) {
  return new Promise((resolve, reject) => {
    const errors = [];

    var objectFile = files.find(file => file.name.includes(".ods"));
    if (!objectFile) {
      reject("Pas de fichiers .ods detecté");
      return;
    }
    utils.readODS(objectFile).then(data => {
      const notices = [];
      for (let i = 0; i < data.length; i++) {
        notices.push(new Memoire(data[i]));
      }
      const filesMap = {};
      for (var i = 0; i < files.length; i++) {
        filesMap[convertLongNameToShort(files[i].name)] = files[i];
      }

      for (var i = 0; i < notices.length; i++) {
        const name = notices[i].IMG.value;
        if (!name) break;
        const shortName = convertLongNameToShort(name);
        let img = filesMap[shortName];
        if (!img) {
          notices[i]._errors.push(`Image ${shortName} introuvable`);
        } else {
          const newImage = utils.renameFile(img, shortName);
          notices[i]._images.push(newImage);
        }
      }
      resolve({ importedNotices: notices, fileNames: [objectFile.name] });
    });
  });
}

function convertLongNameToShort(str) {
  let name = str.substring(str.lastIndexOf("/") + 1);
  return name;
}
