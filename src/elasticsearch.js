const AWS = require("aws-sdk");
const { esUrl } = require("./config.js");

const getElasticInstance = () => {
  let options = {
    hosts: [esUrl],
    connectionClass: require("http-aws-es"),
    awsConfig: new AWS.Config({
      region: "eu-west-3",
      credentials: new AWS.Credentials(
        process.env.AWS_ACCESS_KEY_ID,
        process.env.AWS_SECRET_ACCESS_KEY
      )
    })
  };
  let elasticClient = require("elasticsearch").Client(options);
  return elasticClient;
};

module.exports = getElasticInstance;
