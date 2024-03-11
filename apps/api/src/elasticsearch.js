const { ovh, ...config } = require("./config.js");

if (ovh) {
  console.log("Using opensearch");
  const { Client } = require("@opensearch-project/opensearch");

  let client = null;
  const getElasticInstance = () => {
    if (client != null) return client;

    let options;

    if (!(config.esUrl.includes("127.0.0.1") || config.esUrl.includes("localhost"))) {
      options = {
        node: `${config.esUrl}:${config.esPort}`,
        auth: {
          username: config.esUsername,
          password: config.esPassword
        },
      }
    } else {
      options = { node: `${esUrl}:${esPort}` };
    }
    client = new Client(options);
    return client;
  };

  module.exports = getElasticInstance;
} else {
  console.log("Using elasticsearch");
  const AWS = require("aws-sdk");
  let client = null;
  const getElasticInstance = () => {
    if (client != null) return client;

    let options;
    if (config.esUrl !== "127.0.0.1") {
      options = {
        hosts: [`${config.esUrl}:${config.esPort}`],
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

    client = require("elasticsearch").Client(options);
    return client;
  };

  module.exports = getElasticInstance;
}
