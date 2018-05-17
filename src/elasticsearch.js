var elasticsearch = require('elasticsearch');

const { es_url } = require('./config.js');

let elasticClient;

module.exports = getElasticInstance = () => {
    if (elasticClient)
        return elasticClient;
    elasticClient = new elasticsearch.Client({
        host: es_url
    });
    return elasticClient;
};