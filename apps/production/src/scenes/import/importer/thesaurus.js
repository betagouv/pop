import api from "../../../services/api";

const thesaurusJocondeControle = ['ECOL','EPOQ','LIEUX','TECH','GENE', 'AUTR', 'STAT', 'LOCA', 'DEPO', 'UTIL', 'DOMN', 'DENO', 'PERI', 'PEOC', 'PERU'];

export function checkThesaurus(importedNotices) {
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
          if (thesaurus_separator) {
            if(typeof noticeField === 'object'){
                noticeField.forEach(element => {
                  let elSplit = element.split(thesaurus_separator);

                  if(Array.isArray(elSplit)){
                    elSplit.forEach(el => values.push(el));
                  } else {
                    values.push(element)
                  }
              });
            } else {
              values = noticeField.split(thesaurus_separator);
            }
          } else {
            values = [].concat(noticeField);
          }

          values = values.map(e => e.trim()).filter((element) => element !== '');;

          for (var k = 0; k < values.length; k++) {
            await checkJocondeThesaurus(importedNotices[i]._mapping[field], values[k]).then( message => {
              if(message !== ""){
                importedNotices[i]._warnings.push(message);
              }
            });
          }
          continue;
        }

        if (!thesaurus) {
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

export function checkOpenTheso(notice) {
  return new Promise(async (resolve, _reject) => {
    const optimMap = {};
    
    for (var field in notice) { 
      const noticeField = notice[field];

      // Ne pas vérifier les propriétés qui ne concernent pas les champs de la notice
      if(typeof noticeField === 'function' || field.indexOf('_') === 0 || field === 'POP_IMPORT'){
        continue;
      }

      let values = [];
      const thesaurus =
        notice._mapping[field] && notice._mapping[field].thesaurus;

      const thesaurus_separator =
        notice._mapping[field] &&
        notice._mapping[field].thesaurus_separator;

      // Controle Joconde 
      if(notice._type === 'joconde'){

        if(!thesaurusJocondeControle.includes(field)){
          continue;
        }

        values = [];
        if (thesaurus_separator) {
          if(typeof noticeField === 'object'){
              noticeField.forEach(element => {
                let elSplit = element.split(thesaurus_separator);

                if(Array.isArray(elSplit)){
                  elSplit.forEach(el => values.push(el));
                } else {
                  values.push(element)
                }
            });
          } else {
            values = noticeField.split(thesaurus_separator);
          }
        } else {
          values = [].concat(noticeField);
        }

        values = values.map(e => e.trim()).filter((element) => element !== '');;

        for (var k = 0; k < values.length; k++) {
          await checkJocondeThesaurus(notice._mapping[field], values[k]).then( message => {
            if(message !== ""){
              notice._warnings.push(message);
            }
          });
        }
        continue;
      }

      if (!thesaurus) {
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
              notice._errors.push(text);
            } else {
              notice._warnings.push(text);
            }
          }
          if (!optimMap[thesaurus]) optimMap[thesaurus] = {};
          optimMap[thesaurus][value] = val;
        }
      }
    }
    resolve();
  });
}


async function checkJocondeThesaurus(mappingField, value){ 
  let arrayLabel = [];
  let message = "";

  const arrayIdThesaurus = ["th305", "th291", "th294", "th306", "th284", "th290", "th304", "th287", "th295", "th298"]
  //const arrayIdThesaurus = []
 
  try{
    let res = {};
    if(arrayIdThesaurus.includes(mappingField.idthesaurus)){
      res = await api.validateWithThesaurus(mappingField.idthesaurus, value)
    } else {
      res = await callThesaurus(mappingField.idthesaurus, value);
    }
/*
   let arrayStorage = JSON.parse(localStorage.getItem('opentheso')) || {};
   console.log(JSON.parse(localStorage.getItem('opentheso')))
    if(!arrayStorage[mappingField.idthesaurus]){
      const resp = await api.getThesaurusById(mappingField.idthesaurus);
      if(resp.statusCode == 202){
        arrayStorage[mappingField.idthesaurus] = resp.body;
        localStorage.setItem('opentheso', JSON.stringify(arrayStorage));
      }
    }

    console.log(arrayStorage)
*/
    arrayLabel = arrayStorage[mappingField.idthesaurus].filter( element => {
      return element.value.indexOf(value) === 0 || element.value.toLowerCase().indexOf(value.toLowerCase()) === 0
    });
    
    let foundValue = false;

    if(res.statusCode == "202"){
      arrayLabel = JSON.parse(res.body);
    }

    // si un résultat est trouvé
    if(arrayLabel.length > 0){

      if(arrayLabel.length > 1){
        // Préparation des valeurs préférées
        let arrayPrefLabel = arrayLabel.filter( element => !element.isAltLabel ).map( element => element.label );
        let arrayFilterWithValue = [];

        // Recherhe de la présence de la valeur exacte dans le tableau des labels préférés
        arrayPrefLabel.forEach(element => {
          if(element == value){
            foundValue = true;
          } else {
          
            // Recherche si la saisie est contenu en début de chaine dans la liste de valeur
            if(element.indexOf(value) === 0 || element.toLowerCase().indexOf(value.toLowerCase()) === 0){ 
              arrayFilterWithValue.push(element);
            }
          }
        });

        if(foundValue){
          return message;
        }

        if(arrayFilterWithValue.length > 0){
          arrayPrefLabel = arrayFilterWithValue;
        }

        let strVal = arrayPrefLabel.length > 1 ? `les valeurs [${arrayPrefLabel.join(" ou ")}] peuvent correspondre` : arrayPrefLabel.length > 0 ? `la valeur [${arrayPrefLabel[0]}] peut correspondre` : null;
        message = `la valeur [${value}] est considérée comme rejetée par le thésaurus [${mappingField.listeAutorite} (${mappingField.idthesaurus})]`;
        if(strVal !== null){
          message += ", " + strVal;
        }
      } else {
        // Si le label trouvé est un prefLabel (isAltLabel == false)
        if(arrayLabel[0].isAltLabel){
          message = `la valeur [${value}] est considérée comme rejetée par le thésaurus [${mappingField.listeAutorite} (${mappingField.idthesaurus})]`;

          // On recherche le prefLabel par rapport à son identifiant ark
          const uri = arrayLabel[0].uri;
          let idArk = uri.substr(uri.indexOf('ark:') + 5);
          let resp = await callPrefLabel(idArk);

          if(resp.statusCode == "202"){
            let prefLabel = JSON.parse(resp.body).prefLabel;
            message += `, la valeur [${prefLabel}] est la forme à préférer`;
          }
        }
      } 

    } else {
      // Sinon 
      message = `la valeur [${value}] ne fait pas partie du thésaurus [${mappingField.listeAutorite} (${mappingField.idthesaurus})]`;
    }
  } catch(err){ console.log(err)
    // Erreur du à l'absence de la valeur dans le référentiel opentheso
    message = `la valeur [${value}] ne fait pas partie du thésaurus [${mappingField.listeAutorite} (${mappingField.idthesaurus})]`;
  }

  return message;
}

async function addThesaurusInStorage(idThesaurus){

  const resp = await api.getThesaurusById(idThesaurus);
  if(resp.statusCode == 202){
    let arrayStorage = JSON.parse(localStorage.getItem('opentheso')) || {};
    arrayStorage[idThesaurus] = resp.body;
    localStorage.setItem('opentheso', JSON.stringify(arrayStorage));
  }
}

async function callThesaurus(thesaurus, value){
  return api.validateOpenTheso(thesaurus, value);
}

async function callPrefLabel(id){
  return api.getPrefLabelByIdArk(id);;
}