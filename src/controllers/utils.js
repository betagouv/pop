var fs = require('fs')
const AWS = require('aws-sdk')
const { s3Bucket } = require('./../config.js')

var s3 = new AWS.S3()

// Surement pas besoin de l'écrire sur le disque ...
function uploadFile (path, file) {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(file.path)
    console.log('uploadFile', path, file)
    const params = {
      Bucket: s3Bucket,
      Key: path,
      Body: data,
      ContentType: file.mimetype,
      ACL: 'public-read'
    }

    s3.putObject(params, (err) => {
      fs.unlinkSync(file.path)
      if (err) {
        console.log(err)
        reject(new Error())
      } else {
        resolve()
      }
    })
  })
}

function deleteFile (path) {
  return new Promise((resolve, reject) => {
    console.log('deleteFile', path)
    s3.deleteObject({
      Bucket: s3Bucket,
      Key: path
    }, (err) => {
      if (err) {
        console.log(err)
        reject(new Error())
      } else {
        resolve()
      }
    })
  })
}

module.exports = {
  uploadFile,
  deleteFile
}
