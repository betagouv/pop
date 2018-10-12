const AWS = require("aws-sdk");
const { esUrl } = require("./config.js");

const getElasticInstance = () => {
  if (elasticClient) {
    return elasticClient;
  }

  let options = {
    hosts: [esUrl],
    connectionClass: require("http-aws-es"),
    awsConfig: new AWS.Config({
      credentials: new AWS.Credentials("XXXXXXX", "YYYYYYY")
    })
  };
  let elasticClient = require("elasticsearch").Client(options);
  return elasticClient;
};

module.exports = getElasticInstance;
