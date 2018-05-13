var elasticsearch = require('elasticsearch');
let elasticClient;

module.exports = getElasticInstance = () => {
    if (elasticClient)
        return elasticClient;
    elasticClient = new elasticsearch.Client({
        host: '127.0.0.1:9200'
    });
    return elasticClient;
};