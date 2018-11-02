const fs = require("fs");

// Create storage dir (temporary).
function mkStorage() {
  try {
    fs.mkdirSync('storage');
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
}

// Remove arrays
function removeArrays(e) {
  Object.keys(e).forEach(k => {
    if (Array.isArray(e[k])) {
      e[k] = e[k].join(' ; ');
    }
  });
  return e;
}

module.exports = {
  mkStorage,
  removeArrays
};
