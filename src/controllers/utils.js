var fs = require('fs');
const AWS = require('aws-sdk');
const { s3_bucket } = require('./../config.js');

var s3 = new AWS.S3();

//Surement pas besoin de l'écrire sur le disque ...

function uploadFile(path, file) {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync(file.path);
        const params = {
            Bucket: s3_bucket,
            Key: path,
            Body: data,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };

        s3.putObject(params, (err) => {
            fs.unlinkSync(file.path);
            if (err) {
                console.log(err);
                reject();
            } else {
                resolve()
            }
        });
    })
}

module.exports = {
    uploadFile
}