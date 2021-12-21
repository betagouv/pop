import api from "../../../services/api";

const saveThesaurus = {};
const thesaurusJocondeControle = ['ECOL','EPOQ','LIEUX','TECH','GENE', 'AUTR', 'STAT', 'LOCA', 'DEPO', 'UTIL', 'DOMN', 'DENO', 'PERI', 'PEOC', 'PERU'];

export default function checkThesaurus(importedNotices) {
  return new Promise(async (resolve, _reject) => {
    const optimMap = {};

    if (!importedNotices.length) {
      return;
    }

    for (var i = 0; i < importedNotices.length; i++) {
      for (var field in importedNotices[i]) { 
        const noticeField = importedNotices[i][field];

        // Ne pas vérifier les propriétés qui ne concernent pas les champs de la notice
        if(typeof noticeField === 'function' || field.indexOf('_') === 0 || field === 'POP_IMPORT'){
          continue;
        }

        let values = [];
        const thesaurus =
          importedNotices[i]._mapping[field] && importedNotices[i]._mapping[field].thesaurus;

        const thesaurus_separator =
          importedNotices[i]._mapping[field] &&
          importedNotices[i]._mapping[field].thesaurus_separator;

        // Controle Joconde 
        if(importedNotices[i]._type === 'joconde'){

          if(!thesaurusJocondeControle.includes(field)){
            continue;
          }

          values = [];
          if (thesaurus_separator && typeof noticeField === 'object') {
            values = (noticeField.length > 0) ? noticeField[0].split(thesaurus_separator) : [];
          } else {
            values = [].concat(noticeField);
          }

          values = values.map(e => e.trim());

          for (var k = 0; k < values.length; k++) {
            await checkJocondeThesaurus(importedNotices[i]._mapping[field], values[k]).then( message => {
              if(message !== ""){
                importedNotices[i]._warnings.push(message);
              }
            });
          }
          continue;
        }

        values = [].concat(noticeField);
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


async function checkJocondeThesaurus(mappingField, value){
  let arrayLabel = [];
  let message = "";
  if(!saveThesaurus[mappingField.idthesaurus]){
    let res = await callThesaurus(mappingField.idthesaurus, "");
    if(res.statusCode == "202"){
      arrayLabel = JSON.parse(res.body);
      saveThesaurus[mappingField.idthesaurus] = arrayLabel;
    }
  } else {
    arrayLabel = saveThesaurus[mappingField.idthesaurus];
  }

  if(arrayLabel.length > 0){

    // mise en forme du tableau
    let arrayPrefLabel = arrayLabel.map(element => { return {"label": element.label, "isAltLabel": element.isAltLabel} });

    let valueInList = false;
    let returnPrefLabel = [];
    arrayPrefLabel.map(element => { 
      if(element.label == value && !element.isAltLabel){
        valueInList = true;
      } else if(element.label.indexOf(value) == 0){
          returnPrefLabel.push(element.label);
      }
    });
    if(!valueInList){
      // renvoie de la liste des prefLabel
      if(returnPrefLabel.length > 0){
        let strVal = returnPrefLabel.length > 1 ? `les valeurs [${returnPrefLabel.join(",")}] sont à préférer` : `la valeur [${returnPrefLabel[0]}] est la forme à préférer`;
        message = `la valeur [${value}] est considérée comme rejetée par le thésaurus [${mappingField.listeAutorite} (${mappingField.idthesaurus})], ${strVal}`;
      } else {
        message = `la valeur [${value}] ne fait pas partie du thésaurus [${mappingField.listeAutorite} (${mappingField.idthesaurus})]`;
      }
    }
  }
  return message;
}

async function callThesaurus(thesaurus, value){
  return api.validateOpenTheso(thesaurus, value);;
}
