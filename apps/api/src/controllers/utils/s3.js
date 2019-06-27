const fs = require("fs");
const AWS = require("aws-sdk");
const { s3Bucket } = require("../../config.js");

// Upload a file to S3. Maybe we should not write to disk.
function uploadFile(path, file, Bucket = s3Bucket) {
  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(file.path);
    const params = {
      Bucket: Bucket,
      Key: path,
      Body: data,
      ContentType: file.mimetype,
      ACL: "public-read",
      Metadata: {
        "Cache-Control": "max-age=31536000"
      }
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

// Delete one file in a collection.
function deleteFile(path, collection) {
  return new Promise((resolve, reject) => {
    if (!path.startsWith(collection)) {
      reject(new Error(`${collection} does not match ${path}`));
      return;
    }
    const s3 = new AWS.S3();
    s3.deleteObject({ Bucket: s3Bucket, Key: path }, err => {
      if (err) {
        reject(new Error(JSON.stringify(err)));
        return;
      }
      resolve();
    });
  });
}

module.exports = { uploadFile, deleteFile };
