const Group = require("../../models/group");


const { findMemoireProducteur, findMerimeeProducteur, findPalissyProducteur } = require("./notice");



// Méthode permettant de savoir si l'on peut modifier et/ou importer une notice en fonction du groupe et du role de l'utilisateur
// ainsi que le producteur de la notice, et les producteurs rattachés au groupe
async function canManage(user, notice, collection){
  let validate = false;
  // Si on a bien un utilisateur rattaché à un groupe et un rôle, ainsi qu'une notice
  if(user && notice && user.role && user.group){
    
    //On récupère le groupe de l'utilisateur en base
    let group = await getUserGroup(user.group);

    //Si l'utilisateur a un rôle administrateur et que son groupe est admin ou celui correspondant à la collection, retourne true
    if(user.role == "administrateur" && user.group === "admin"){
      return true;
    }

    // Si l'utilisateur a le rôle administrateur ou producteur
    if (["producteur", "administrateur"].includes(user.role)){

      // Si le groupe récupéré en base contient bien un LABEL et des PRODUCTEURS
      if(group.LABEL && group.PRODUCTEURS){

        // Pour chaque producteurs rattachés au groupe, on vérifie sur le producteur de la notice y est présent
        group.PRODUCTEURS.map( producteur => {

          // Si le producteur de la notice correspond à un de ceux du groupe, on retourne true
          if( String(notice.PRODUCTEUR)===String(producteur) || collection==="museo"){

            if(collection==="joconde"){
              validate = user.museofile.includes(notice.MUSEO);
            }
            else if(collection==="museo"){
              validate = user.museofile.includes(notice.REF);
            }
            else{
              validate = true;
            }
          }
        });
      }
    }
  }

  return validate;
}

async function canManageJoconde(user, notice) {
  //On détermine si l'utilisateur a le droit d'apporter des modifications à la notice joconde
  let validate = canManage(user, notice, "joconde");

  //On retourne si oui ou non il a le droit
  return validate;
}

function canCreateJoconde(user, notice) {
  return canManageJoconde(user, notice);
}

function canUpdateJoconde(user, prevNotice, newNotice) {
  return canManageJoconde(user, prevNotice) && canManageJoconde(user, newNotice);
}

function canDeleteJoconde(user, notice) {
  return canManageJoconde(user, notice);
}

async function canManageMnr(user, notice) {
  //On détermine si l'utilisateur a le droit d'apporter des modifications à la notice joconde
  let validate = canManage(user, notice, "mnr");

  //On retourne si oui ou non il a le droit
  return validate;
}

function canCreateMnr(user, notice) {
  return canManageMnr(user, notice);
}

function canUpdateMnr(user, prevNotice, newNotice) {
  return canManageMnr(user, prevNotice) && canManageMnr(user, newNotice);
}

function canDeleteMnr(user, notice) {
  return canManageMnr(user, notice);
}

async function canManageMemoire(user, notice) {
  //On détermine si l'utilisateur a le droit d'apporter des modifications à la notice joconde
  let validate = canManage(user, notice, "memoire");

  //On retourne si oui ou non il a le droit
  return validate;
}

function canCreateMemoire(user, notice) {
  return canManageMemoire(user, notice);
}

function canUpdateMemoire(user, prevNotice, newNotice) {
  return canManageMemoire(user, prevNotice) && canManageMemoire(user, newNotice);
}

function canDeleteMemoire(user, notice) {
  return canManageMemoire(user, notice);
}

async function canManagePalissy(user, notice) {
  //On détermine si l'utilisateur a le droit d'apporter des modifications à la notice joconde
  let validate = canManage(user, notice, "palissy");

  //On retourne si oui ou non il a le droit
  return validate;
}

function canCreatePalissy(user, notice) {
  return canManagePalissy(user, notice);
}

function canUpdatePalissy(user, prevNotice, newNotice) {
  return canManagePalissy(user, prevNotice) && canManagePalissy(user, newNotice);
}

function canDeletePalissy(user, notice) {
  return canManagePalissy(user, notice);
}

async function canManageMerimee(user, notice) {
  //On détermine si l'utilisateur a le droit d'apporter des modifications à la notice joconde
  let validate = canManage(user, notice, "joconde");

  //On retourne si oui ou non il a le droit
  return validate;
}

function canCreateMerimee(user, notice) {
  return canManageMerimee(user, notice);
}

function canUpdateMerimee(user, prevNotice, newNotice) {
  return canManageMerimee(user, prevNotice) && canManageMerimee(user, newNotice);
}

function canDeleteMerimee(user, notice) {
  return canManageMerimee(user, notice);
}

async function canManageMuseo(user, notice) {
  //On détermine si l'utilisateur a le droit d'apporter des modifications à la notice joconde
  let validate = canManage(user, notice, "museo");

  //On retourne si oui ou non il a le droit
  return validate;
}

function canCreateMuseo(user, notice) {
  return canManageMuseo(user, notice);
}

function canUpdateMuseo(user, prevNotice, newNotice) {
  return canManageMuseo(user, prevNotice) && canManageMuseo(user, newNotice);
}

function canDeleteMuseo(user, notice) {
  return canManageMuseo(user, notice);
}

//Retourne le groupe de l'utilisateur
async function getUserGroup(userGroup){
  let group;

  if(userGroup=="admin"){
    return {LABEL: "admin"};
  }
  await Group.findOne({LABEL: userGroup}).then(item => group = item);
  return group;
}

module.exports = {
  canUpdateJoconde,
  canCreateJoconde,
  canDeleteJoconde,
  canCreateMnr,
  canUpdateMnr,
  canDeleteMnr,
  canCreateMemoire,
  canUpdateMemoire,
  canDeleteMemoire,
  canCreatePalissy,
  canUpdatePalissy,
  canDeletePalissy,
  canCreateMerimee,
  canUpdateMerimee,
  canDeleteMerimee,
  canUpdateMuseo,
  canCreateMuseo,
  canDeleteMuseo,
  canManage
};
