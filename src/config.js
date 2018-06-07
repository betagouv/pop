//ES

const PORT = process.env.PORT || 3000;
const mongo_url = process.env.DB_ENDPOINT || 'mongodb://127.0.0.1/pop';
const es_url = process.env.ES_ENDPOINT || 'https://search-pop-j3zoezftjmyiagfgm76ckgu2xy.eu-west-3.es.amazonaws.com';

module.exports = {
    mongo_url,
    es_url,
    PORT,
}