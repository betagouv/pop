// AWS S3 client

const AWS = require("aws-sdk");
const config = require("./config");

AWS.config.update({
	accessKeyId: config.accessKeyId,
	secretAccessKey: config.secretAccessKey,
});

module.exports = new AWS.S3({
	endpoint: config.bucketUrl,
});
