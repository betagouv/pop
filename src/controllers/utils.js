const fs = require("fs");
const AWS = require("aws-sdk");
const { s3Bucket } = require("./../config.js");
const { capture } = require("./../sentry.js");

// Surement pas besoin de l'écrire sur le disque ...
function uploadFile(path, file) {
  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(file.path);
    console.log("uploadFile", path, file);
    const params = {
      Bucket: s3Bucket,
      Key: path,
      Body: data,
      ContentType: file.mimetype,
      ACL: "public-read"
    };

    s3.putObject(params, err => {
      fs.unlinkSync(file.path);
      if (err) {
        console.log(err);
        reject(new Error());
      } else {
        resolve();
      }
    });
  });
}

function deleteFile(path) {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    s3.deleteObject(
      {
        Bucket: s3Bucket,
        Key: path
      },
      err => {
        if (err) {
          console.log(err);
          reject(new Error());
        } else {
          resolve();
        }
      }
    );
  });
}

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

function addZeros(v, zeros) {
  return new Array(zeros)
    .concat([v])
    .join("0")
    .slice(-zeros);
}

function formattedNow() {
  const now = new Date();
  return (formattedNow =
    ("0" + now.getDate()).slice(-2) +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    now.getFullYear());
}

module.exports = {
  uploadFile,
  deleteFile,
  formattedNow,
  getNewId
};
