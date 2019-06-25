const { findMemoireProducteur, findMerimeeProducteur, findPalissyProducteur } = require("./notice");

function canManageJoconde(user, notice) {
  return (
    user &&
    notice &&
    user.role &&
    user.group &&
    ((user.role === "administrateur" && (user.group === "joconde" || user.group === "admin")) ||
      (user.role === "producteur" &&
        user.group === "joconde" &&
        user.museofile.includes(notice.MUSEO)))
  );
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

function canManageMnr(user, notice) {
  return (
    user &&
    notice &&
    user.role &&
    user.group &&
    ((user.role === "administrateur" && (user.group === "mnr" || user.group === "admin")) ||
      (user.role === "producteur" && user.group === "mnr"))
  );
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

function canManageMemoire(user, notice) {
  const producteur = notice && findMemoireProducteur(notice.REF, notice.IDPROD, notice.EMET);
  return (
    user &&
    notice &&
    user.role &&
    user.group &&
    ((user.role === "administrateur" && user.group === "admin") ||
      (["producteur", "administrateur"].includes(user.role) &&
        user.group === "memoire" &&
        ["MAP", "AUTRE"].includes(producteur)) ||
      (["producteur", "administrateur"].includes(user.role) &&
        user.group === "mh" &&
        ["CRMH", "CAOA", "UDAP", "ETAT", "AUTRE", "MAP"].includes(producteur)))
  );
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

function canManagePalissy(user, notice) {
  const producteur = notice && findPalissyProducteur(notice);
  return (
    user &&
    notice &&
    user.role &&
    user.group &&
    ((user.role === "administrateur" && user.group === "admin") ||
      (["producteur", "administrateur"].includes(user.role) &&
        user.group === "mh" &&
        ["Monuments Historiques", "Architecture", "Etat", "Autre"].includes(producteur)) ||
      (["producteur", "administrateur"].includes(user.role) &&
        user.group === "inv" &&
        ["Inventaire", "Autre"].includes(producteur)))
  );
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

function canManageMerimee(user, notice) {
  const producteur = notice && findMerimeeProducteur(notice);
  return (
    user &&
    notice &&
    user.role &&
    user.group &&
    ((user.role === "administrateur" && user.group === "admin") ||
      (["producteur", "administrateur"].includes(user.role) &&
        user.group === "mh" &&
        ["Monuments Historiques", "Architecture", "Etat", "Autre"].includes(producteur)) ||
      (["producteur", "administrateur"].includes(user.role) &&
        user.group === "inv" &&
        ["Inventaire", "Autre"].includes(producteur)))
  );
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

function canManageMuseo(user, notice) {
  return (
    user &&
    notice &&
    user.role &&
    user.group &&
    ((user.role === "administrateur" && (user.group === "museo" || user.group === "admin")) ||
      (user.role === "producteur" &&
        user.group === "museo" &&
        user.museofile.includes(notice.MUSEO)))
  );
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
  canDeleteMuseo
};
