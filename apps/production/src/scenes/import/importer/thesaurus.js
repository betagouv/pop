import api from "../../../services/api";

// Joconde : Liste des champs à prendre en compte pour le contrôle Thésaurus
const thesaurusJocondeControle = ['ECOL', 'AUTR', 'STAT', 'LOCA', 'DEPO', 'DOMN', 'DENO', 'PERI', 'PEOC', 'PERU'];
const thesaurusJocondeNonControle = [];

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

        if(!thesaurusJocondeControle.includes(field) || thesaurusJocondeNonControle.includes(notice._mapping[field].idthesaurus)){
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
          let message = await checkJocondeThesaurus(notice._mapping[field], values[k])
          if(message !== ""){ 
            notice._warnings.push(message);
          }
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

const storageExceptionThesaurus = [];

async function checkJocondeThesaurus(mappingField, value){ 
  let arrayLabel = [];
  let message = "";

  const arrayIdThesaurus = ["th305", "th291", "th294", "th306", "th284", "th290", "th304", "th287", "th295", "th298"]
 
  try{
    let res = {};
    let arrayStorage = [];
   
    if(!localStorage.getItem('opentheso-' + mappingField.idthesaurus)){  

      if(!storageExceptionThesaurus.includes(mappingField.idthesaurus)){
        const resp = await api.getThesaurusById(mappingField.idthesaurus);
        if(resp.statusCode == 202){
          arrayStorage = JSON.parse(resp.body);
          try{
            localStorage.setItem('opentheso-' + mappingField.idthesaurus, resp.body);
          } catch(exception){
            storageExceptionThesaurus.push(mappingField.idthesaurus);
          }
        }
      }
     
    } else {
      arrayStorage = JSON.parse(localStorage.getItem('opentheso-' + mappingField.idthesaurus));
    }

    if(!storageExceptionThesaurus.includes(mappingField.idthesaurus)){ 
      arrayLabel = Object.values(arrayStorage);
    } else {
      if(arrayIdThesaurus.includes(mappingField.idthesaurus)){
        res = await api.validateWithThesaurus(mappingField.idthesaurus, value)
      }else {
        res = await callThesaurus(mappingField.idthesaurus, value);
      }
      if(res.statusCode == "202"){
        arrayLabel = JSON.parse(res.body);
      }
    }

    let foundValue = false;

    // Préparation des valeurs préférées
    let arrayPrefLabel = [];
    let arrayFilterWithValue = [];

    // Recherhe de la valeur exacte dans le tableau de valeur du WS
    /*arrayLabel.forEach(element => {

      if(element.label == value && !element.isAltLabel){ console.log('found', message)
        foundValue = true;
      } else if(element.label == value || element.label.toLowerCase() === value.toLowerCase()){  console.log('match')
        arrayFilterWithValue.push(element);
      } else {
        console.log('else', value)
        // Recherche si la saisie est contenu en début de chaine dans la liste de valeur
        if(element.label.indexOf(value) === 0 || element.label.toLowerCase().indexOf(value.toLowerCase()) === 0){ 
          if(!element.isAltLabel){
            arrayPrefLabel.push(element.label);
          }
        }
      }
    });*/

    for(let i = 0; i < arrayLabel.length; i++) {    
      
    //arrayLabel.forEach(element => {
      let element = arrayLabel[i];
      if(element.label == value && !element.isAltLabel){
        foundValue = true;
      } else if(element.label == value || element.label.toLowerCase() === value.toLowerCase()){ 
        arrayFilterWithValue.push(element);
      } else {
       
        if (mappingField["label"] == 'Auteur'){
          let newValue = value.split('(')[0].trim();
          if(element.label.indexOf(newValue) === 0 || element.label.toLowerCase().indexOf(newValue.toLowerCase()) === 0){ 
           if(!element.isAltLabel){
            arrayPrefLabel.push(element.label);

            }
          }
        }
      
       // Recherche si la saisie est contenu en début de chaine dans la liste de valeur
        if(element.label.indexOf(value) === 0 || element.label.toLowerCase().indexOf(value.toLowerCase()) === 0){ 
          if(!element.isAltLabel){
            
            arrayPrefLabel.push(element.label);
          }
        }
      
      }
    };

    if(foundValue){ 
      return message;
    }

    
    // si la liste est récupérée et la valeur est présente dans la liste
    if(arrayFilterWithValue.length > 0){
    
      if(arrayPrefLabel.length > 0){
        message = `la valeur [${value}] est considérée comme rejetée par le thésaurus [${mappingField.listeAutorite} (${mappingField.idthesaurus})]`;
 
        let strVal = arrayPrefLabel.length > 1 ? `les valeurs [${arrayPrefLabel.join(" ou ")}] peuvent correspondre` : `la valeur [${arrayPrefLabel[0]}] peut correspondre`;
        if(strVal !== null){
          message += ", " + strVal;
        }

      } else {
        message = `la valeur [${value}] est considérée comme rejetée par le thésaurus [${mappingField.listeAutorite} (${mappingField.idthesaurus})]`;

        if(arrayFilterWithValue[0].isAltLabel){
          // On recherche le prefLabel par rapport à son identifiant ark
          const uri = arrayFilterWithValue[0].arc;
          let idArk = uri.substr(uri.indexOf('ark:') + 4);
          try{
            let resp = await callPrefLabel(idArk);

            if(resp.statusCode == "202"){
              let prefLabel = JSON.parse(resp.body).prefLabel;
              message += `, la valeur [${prefLabel}] est la forme à préférer`;
            }
          } catch(exception){
            // PrefLabel non trouvé, pas d'ajout de message
          }
          
        } else {
          // 1 seule valeur présente mais inexact à la saisie
          message += `, la valeur [${arrayFilterWithValue[0].label}] est la forme à préférer`;
        }
      } 

    } else { 
      // Sinon 
      message = `la valeur [${value}] ne fait pas partie du thésaurus [${mappingField.listeAutorite} (${mappingField.idthesaurus})]`;

      if(arrayPrefLabel.length > 0){
        let strVal = arrayPrefLabel.length > 1 ? `les valeurs [${arrayPrefLabel.join(" ou ")}] peuvent correspondre` : `la valeur [${arrayPrefLabel[0]}] peut correspondre`;
        if(strVal !== null){
          message += ", " + strVal;
        }
      }
    }
  } catch(err){ 
    // Erreur du à l'absence de la valeur dans le référentiel opentheso
    message = `la valeur [${value}] ne fait pas partie du thésaurus [${mappingField.listeAutorite} (${mappingField.idthesaurus})]`;
  }

  return message;
}

async function callThesaurus(thesaurus, value){
  return api.validateOpenTheso(thesaurus, value);
}

async function callPrefLabel(id){
  return api.getPrefLabelByIdArk(id);;
}