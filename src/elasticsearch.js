var elasticsearch = require("elasticsearch");

const { esUrl } = require("./config.js");

let elasticClient;

const getElasticInstance = () => {
  if (elasticClient) {
    return elasticClient;
  }
  elasticClient = new elasticsearch.Client({ host: esUrl });
  return elasticClient;
};

module.exports = getElasticInstance;
