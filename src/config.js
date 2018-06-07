//ES

const PORT = process.env.PORT || 3000;
const mongo_url = process.env.DB_ENDPOINT || 'mongodb://127.0.0.1/pop';
const es_url = process.env.ES_ENDPOINT || '127.0.0.1:9200';

module.exports = {
    mongo_url,
    es_url,
    PORT,
}