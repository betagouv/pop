function canManageJoconde(user, notice) {
  // Needs to be either:
  // - an admininistrator from joconde or admin group
  // - or a productor from joconde with the correct museofile number.
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
  // Needs to be either:
  // - an admininistrator from mnr or admin group
  // - or a productor from mnr.
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

module.exports = {
  canUpdateJoconde,
  canCreateJoconde,
  canDeleteJoconde,
  canCreateMnr,
  canUpdateMnr,
  canDeleteMnr
};
