const { capture } = require("./../../sentry.js");

function getNewId(object, prefix, dpt) {
  return new Promise((resolve, reject) => {
    var q = object
      .findOne({
        REF: { $regex: new RegExp("^" + prefix + dpt) }
      })
      .sort({
        REF: -1
      });
    q.exec((error, doc) => {
      if (error) {
        reject(error);
      }
      if (doc) {
        const ref = doc.REF.substring((prefix + dpt).length);
        const newId = addZeros(parseInt(ref) + 1, ref.length);
        resolve(prefix + dpt + newId);
      } else {
        const ln = 10 - (prefix + dpt).length;
        const newId = addZeros(1, ln);
        resolve(prefix + dpt + newId);
      }
    });
  });
}

function checkESIndex(doc) {
  doc.on("es-indexed", (err, res) => {
    if (err) capture(err);
  });
}

function updateNotice(collection, REF, notice) {
  return new Promise((resolve, reject) => {
    collection.findOneAndUpdate(
      { REF },
      notice,
      {
        upsert: true,
        new: true
      },
      (err, doc) => {
        if (err) {
          reject();
          return;
        }
        checkESIndex(doc);
        resolve(doc);
      }
    );
  });
}

function addZeros(v, zeros) {
  return new Array(zeros)
    .concat([v])
    .join("0")
    .slice(-zeros);
}

function formattedNow() {
  const now = new Date();
  return (formattedNow =
    now.getFullYear() +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + now.getDate()).slice(-2));
}

module.exports = {
  getNewId,
  checkESIndex,
  updateNotice
};
