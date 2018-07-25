const AWS = require('aws-sdk')

async function sendToS3 (path, file) {
  const s3 = new AWS.S3()
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: path,
    Body: file,
    ACL: 'public-read'
  }
  await s3.upload(params)
    .on('httpUploadProgress', function (evt) {
      console.log(evt)
    })
    .send(function (err, data) {
      console.log(err, data)
    })
}

module.exports = sendToS3
