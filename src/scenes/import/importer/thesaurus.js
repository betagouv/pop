import api from "../../../services/api";

export default function checkThesaurus(importedNotices) {
  return new Promise(async (resolve, reject) => {
    const optimMap = {};

    if (!importedNotices.length) {
      return;
    }

    const allfieldswiththesaurus = Object.keys(importedNotices[0]).filter(
      e =>
        typeof importedNotices[0][e] === "object" &&
        importedNotices[0][e].thesaurus
    );

    for (var i = 0; i < importedNotices.length; i++) {
      for (var j = 0; j < allfieldswiththesaurus.length; j++) {
        const field = allfieldswiththesaurus[j];
        if (!importedNotices[i][field]) {
          // console.log(
          //   field,
          //   importedNotices[i],
          //   `${importedNotices[i][field]} n'existe pas`
          // );
          continue;
        }
        const thesaurus = importedNotices[i][field].thesaurus;

        let values = [].concat(importedNotices[i][field].value);
        if (importedNotices[i][field].thesaurus_separator) {
          values = values.reduce(
            (acc, val) =>
              acc.concat(
                val.split(importedNotices[i][field].thesaurus_separator)
              ),
            []
          );
        }
        values = values.map(e => e.trim());

        for (var k = 0; k < values.length; k++) {
          const value = values[k];
          if (value) {
            let val = null;
            if (
              optimMap[thesaurus] &&
              optimMap[thesaurus][value] !== undefined
            ) {
              val = optimMap[thesaurus][value];
            } else {
              val = await api.validateWithThesaurus(thesaurus, value);
            }
            if (!val) {
              if (allfieldswiththesaurus[j].thesaurus_strict === true) {
                importedNotices[i]._errors.push(
                  `Le champ ${field} avec la valeur ${value} n'est pas conforme avec le thesaurus ${thesaurus}`
                );
              } else {
                importedNotices[i]._warnings.push(
                  `Le champ ${field} avec la valeur ${value} n'est pas conforme avec le thesaurus ${thesaurus}`
                );
              }
            }

            if (!optimMap[thesaurus]) optimMap[thesaurus] = {};
            optimMap[thesaurus][value] = val;
          }
        }
      }
    }
    resolve();
  });
}
