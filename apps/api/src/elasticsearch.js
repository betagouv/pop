const AWS = require("aws-sdk");
const { esUrl } = require("./config.js");

const getElasticInstance = () => {
  let options;
  if (esUrl !== "http://127.0.0.1:9200") {
    options = {
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
  } else {
    options = {
      host: "http://127.0.0.1:9200"
    };
  }

  let elasticClient = require("elasticsearch").Client(options);
  return elasticClient;
};

module.exports = getElasticInstance;
