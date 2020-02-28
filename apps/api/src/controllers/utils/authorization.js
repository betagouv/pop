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
  let validate = await canManage(user, notice, "joconde");

  //On retourne si oui ou non il a le droit
  return validate;
}

async function canCreateJoconde(user, notice) {
  return await canManageJoconde(user, notice);
}

async function canUpdateJoconde(user, prevNotice, newNotice) {
  return await canManageJoconde(user, prevNotice) && await canManageJoconde(user, newNotice);
}

async function canDeleteJoconde(user, notice) {
  return await canManageJoconde(user, notice);
}

async function canManageAutor(user, notice) {
  //On détermine si l'utilisateur a le droit d'apporter des modifications à la notice autor
  let validate = await canManage(user, notice, "autor");

  //On retourne si oui ou non il a le droit
  return validate;
}

async function canCreateAutor(user, notice) {
  return await canManageAutor(user, notice);
}

async function canUpdateAutor(user, prevNotice, newNotice) {
  return await canManageAutor(user, prevNotice) && await canManageAutor(user, newNotice);
}

async function canDeleteAutor(user, notice) {
  return await canManageAutor(user, notice);
}

async function canManageMnr(user, notice) {
  //On détermine si l'utilisateur a le droit d'apporter des modifications à la notice joconde
  let validate = await canManage(user, notice, "mnr");

  //On retourne si oui ou non il a le droit
  return validate;
}

async function canCreateMnr(user, notice) {
  return await canManageMnr(user, notice);
}

async function canUpdateMnr(user, prevNotice, newNotice) {
  return await canManageMnr(user, prevNotice) && await canManageMnr(user, newNotice);
}

async function canDeleteMnr(user, notice) {
  return await canManageMnr(user, notice);
}

async function canManageMemoire(user, notice) {
  //On détermine si l'utilisateur a le droit d'apporter des modifications à la notice joconde
  let validate = await canManage(user, notice, "memoire");

  //On retourne si oui ou non il a le droit
  return validate;
}

async function canCreateMemoire(user, notice) {
  return await canManageMemoire(user, notice);
}

async function canUpdateMemoire(user, prevNotice, newNotice) {
  return await canManageMemoire(user, prevNotice) && await canManageMemoire(user, newNotice);
}

async function canDeleteMemoire(user, notice) {
  return await canManageMemoire(user, notice);
}

async function canManagePalissy(user, notice) {
  //On détermine si l'utilisateur a le droit d'apporter des modifications à la notice joconde
  let validate = await canManage(user, notice, "palissy");

  //On retourne si oui ou non il a le droit
  return validate;
}

async function canCreatePalissy(user, notice) {
  return await canManagePalissy(user, notice);
}

async function canUpdatePalissy(user, prevNotice, newNotice) {
  return await canManagePalissy(user, prevNotice) && await canManagePalissy(user, newNotice);
}

async function canDeletePalissy(user, notice) {
  return await canManagePalissy(user, notice);
}

async function canManageMerimee(user, notice) {
  //On détermine si l'utilisateur a le droit d'apporter des modifications à la notice joconde
  let validate = await canManage(user, notice, "merimee");

  //On retourne si oui ou non il a le droit
  return validate;
}

async function canCreateMerimee(user, notice) {
  return await canManageMerimee(user, notice);
}

async function canUpdateMerimee(user, prevNotice, newNotice) {
  return await canManageMerimee(user, prevNotice) && await canManageMerimee(user, newNotice);
}

async function canDeleteMerimee(user, notice) {
  return await canManageMerimee(user, notice);
}

async function canManageMuseo(user, notice) {
  //On détermine si l'utilisateur a le droit d'apporter des modifications à la notice joconde
  let validate = await canManage(user, notice, "museo");

  //On retourne si oui ou non il a le droit
  return validate;
}

async function canCreateMuseo(user, notice) {
  return await canManageMuseo(user, notice);
}

async function canUpdateMuseo(user, prevNotice, newNotice) {
  return await canManageMuseo(user, prevNotice) && await canManageMuseo(user, newNotice);
}

async function canDeleteMuseo(user, notice) {
  return await canManageMuseo(user, notice);
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
  canUpdateAutor,
  canCreateAutor,
  canDeleteAutor,
  canManage
};
