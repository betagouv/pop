const fs = require("fs");
const AWS = require("aws-sdk");
const { s3Bucket } = require("../../config.js");

// Surement pas besoin de l'écrire sur le disque ...
function uploadFile(path, file) {
  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(file.path);
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

module.exports = {
  uploadFile,
  deleteFile
};
