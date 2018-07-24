
//ES
let PORT = process.env.PORT || 3000;
let mongo_url = process.env.DB_ENDPOINT || `mongodb://127.0.0.1/pop`;
let es_url = process.env.ES_ENDPOINT || '127.0.0.1:9200';
let s3_bucket = process.env.BUCKET || 'pop-phototeque-dev';
const secret = process.env.BUCKET || 'not-so-secret'

if (process.env.NODE_ENV === 'test') {
    PORT = 3000;
    mongo_url = `mongodb://127.0.0.1/poptest`;
    es_url = '127.0.0.1:9200';
    s3_bucket = process.env.BUCKET || 'pop-phototeque-dev';
}

console.log(`PORT : ${PORT}`)
console.log(`MONGO : ${mongo_url}`)
console.log(`ES : ${es_url}`)
console.log(`S3 : ${s3_bucket}`)

module.exports = {
    mongo_url,
    es_url,
    s3_bucket,
    PORT,
    secret,
}
