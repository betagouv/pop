var AWS = require('aws-sdk');

var s3 = new AWS.S3();

// Bucket names must be unique across all S3 users
var myBucket = 'pop-phototeque';
var myKey = 'dc1fabaa924e2f5d8e05a39df5919be3f0a8d7f22a0954292b441007a78e7403';

const params = {
    Bucket: myBucket,
    Key: "plop/coucou.txt",
    Body: 'Hello!',
    ACL: 'public-read'
};
s3.putObject(params, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log("Successfully uploaded data to myBucket/myKey");
    }
});

console.log('RUN')

