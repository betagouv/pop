//ES

const PORT = process.env.PORT || 3000;
const mongo_url = process.env.DB_ENDPOINT || 'mongodb://127.0.0.1/pop';
const es_url = process.env.ES_ENDPOINT || '127.0.0.1:9200';
const s3_bucket = process.env.BUCKET || 'pop-phototeque-dev';


console.log(`PORT : ${PORT}`)
console.log(`MONGO : ${mongo_url}`)
console.log(`ES : ${es_url}`)
console.log(`S3 : ${s3_bucket}`)

module.exports = {
    mongo_url,
    es_url,
    s3_bucket,
    PORT,
}