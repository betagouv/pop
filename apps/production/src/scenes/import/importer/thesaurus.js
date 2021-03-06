import api from "../../../services/api";

export default function checkThesaurus(importedNotices) {
  return new Promise(async (resolve, _reject) => {
    const optimMap = {};
    // Mantis 38569 - Champs thesaurus à ne pas controler - à supprimer une fois les controles thesaurus ok
    const thesaurusNonControle = ['MILL','ECOL','EPOQ','LIEUX','TECH','GENE'];
    
    if (!importedNotices.length) {
      return;
    }

    for (var i = 0; i < importedNotices.length; i++) {
      for (var field in importedNotices[i]) {
        const noticeField = importedNotices[i][field];

        const thesaurus =
          importedNotices[i]._mapping[field] && importedNotices[i]._mapping[field].thesaurus;

        const thesaurus_separator =
          importedNotices[i]._mapping[field] &&
          importedNotices[i]._mapping[field].thesaurus_separator;

        // Mantis 38569 - Ajout condition pour outrepasser le controle des champs thesaurus à ne pas controler - à supprimer une fois les controles thesaurus ok
        if (!thesaurus || thesaurusNonControle.includes(field)) {
          continue;
        }

        let values = [].concat(noticeField);
        if (thesaurus_separator) {
          values = values.reduce((acc, val) => acc.concat(val.split(thesaurus_separator)), []);
        }
        values = values.map(e => e.trim());

        for (var k = 0; k < values.length; k++) {
          const value = values[k];
          if (value) {
            let val = null;
            if (optimMap[thesaurus] && optimMap[thesaurus][value] !== undefined) {
              val = optimMap[thesaurus][value];
            } else {
              val = await api.validateWithThesaurus(thesaurus, value);
            }
            if (!val) {
              const text = `Le champ ${field} avec la valeur ${value} n'est pas conforme avec le thesaurus ${thesaurus}`;
              if (noticeField.thesaurus_strict === true) {
                importedNotices[i]._errors.push(text);
              } else {
                importedNotices[i]._warnings.push(text);
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
