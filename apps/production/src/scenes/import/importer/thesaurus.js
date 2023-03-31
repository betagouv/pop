import api from "../../../services/api";

const THESAURUS_CONTROLE = {
  base_list: ["joconde", "palissy","merimee"],
  joconde: {
    id_list_theso: ["th305", "th291", "th294", "th306", "th284", "th290", "th304", "th287", "th295", "th298"],
    fields: ['ECOL', 'AUTR', 'STAT', 'LOCA', 'DEPO', 'DOMN', 'DENO', 'PERI', 'PEOC', 'PERU']
  },
  merimee: {
    id_list_theso: ['th368','th371','th366','th375','th380','th384','th383','th378','th369'],
    fields: ['AFFE', 'COUV', 'DENO', 'ENER', 'ESCA', 'ETAT', 'GENRS', 'MURS', 'PROT']
  },
  palissy: {
    id_list_theso: ['th361','th369'],
    fields: ['DENO', 'PROT']
  }
};

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

      // Controle vocabulaire sur Opentheso si les bases sont concernées
      if(THESAURUS_CONTROLE.base_list.includes(notice._type)){

        // Si les champs ne sont pas déclarer dans la liste, le traitement est stoppé
        if(!THESAURUS_CONTROLE[notice._type].fields.includes(field)){
          continue;
        }

        values = [];
        // Préparation du tableau de valeur, split des valeurs par le séparateur définit dans l'entité de la base.
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

        // Nettoyage des valeurs vident
        values = values.map(e => e.trim()).filter((element) => element !== '');;

        for (var k = 0; k < values.length; k++) {
          let message = await checkVocabulaireThesaurus(notice._mapping[field], values[k], notice._type)
          if(message !== ""){ 
            notice._warnings.push(message);
          }
        }
        continue;
      }

      // Ancien contrôle, à supprimer dès que toutes les bases seront sur OpenTheso
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

async function checkVocabulaireThesaurus(mappingField, value, base){ 
  let arrayLabel = [];
  let message = "";

  const arrayIdThesaurus = THESAURUS_CONTROLE[base].id_list_theso;
 
  try{
    let res = {};
    let arrayStorage = [];
   
    /**
     * Pour réduire les requêtes vers l'api, le référentiel est stocké dans le storage si celui-ci n'est pas encore présent
     * Exemple de clé opentheso-th305
     */
    if(!localStorage.getItem('opentheso-' + mappingField.idthesaurus)){  

      if(!storageExceptionThesaurus.includes(mappingField.idthesaurus)){
        const resp = await api.getThesaurusById(mappingField.idthesaurus);
        if(resp.statusCode == 202){
          arrayStorage = JSON.parse(resp.body);
          try{
            // Sauvegarde du référentiel
            localStorage.setItem('opentheso-' + mappingField.idthesaurus, resp.body);
          } catch(exception){
            // Cas particulier, si le référentiel est trop volumineux, le référentiel ne sera pas stocké dans le storage et donc une requête vers l'api sera
            // effectué pour contrôler la valeur, l'identifiant est enregistré dans le tableau des exceptions pour ne plus essayer la sauvegarde du référentiel.
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
      if(res.statusCode == "200"){
        arrayLabel = JSON.parse(res.body);
      }
    }

    let foundValue = false;

    // Préparation des valeurs préférées
    let arrayPrefLabel = [];
    let arrayFilterWithValue = [];

    const addMatchValue = (value, element) => {
      if(element.label.indexOf(value) === 0 || element.label.toLowerCase().indexOf(value.toLowerCase()) === 0){ 
        if(!element.isAltLabel){ 
          arrayPrefLabel.push(element.label);
        }
      }
    };

    // Recherhe de la valeur exacte dans le tableau de valeur du WS
    for(let i = 0; i < arrayLabel.length; i++) {   
      let element = arrayLabel[i];
      if(element.label == value && !element.isAltLabel){
        // la saisie correspond à une valeur du référentiel et la valeur est un label préféré
        foundValue = true;
      } else if(element.label == value || element.label.toLowerCase() === value.toLowerCase()){ 
        // la saisie correspond à une valeur du référentiel mais la valeur n'est pas un label préféré
        arrayFilterWithValue.push(element);
      } else {
       
        if (mappingField["label"] == 'Auteur'){
          let newValue = value.split('(')[0].trim();
          addMatchValue(newValue, element);
        } else {
          // Recherche si la saisie est contenu en début de chaine dans la liste de valeur
          addMatchValue(value, element);
        }       
      }
    };

    if(foundValue){ 
      // la saisie est présente dans le référentiel, retour du message ""
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
            if(resp.statusCode == "200"){
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