// ES
let PORT = process.env.PORT || 3000;
let mongoUrl = process.env.DB_ENDPOINT || `mongodb://127.0.0.1/pop`;
let esUrl = process.env.ES_ENDPOINT || "http://127.0.0.1:9200";
let s3Bucket = process.env.BUCKET || "pop-phototeque-dev";
const secret = process.env.SECRET || "not-so-secret";

if (process.env.NODE_ENV === "test") {
  PORT = 3000;
  mongoUrl = `mongodb://localhost:27017/poptest`;
  esUrl = "127.0.0.1:9200";
  s3Bucket = process.env.BUCKET || "pop-phototeque-dev";
}

console.log(`PORT : ${PORT}`);
console.log(`MONGO : ${mongoUrl}`);
console.log(`ES : ${esUrl}`);
console.log(`S3 : ${s3Bucket}`);

module.exports = {
  mongoUrl,
  esUrl,
  s3Bucket,
  PORT,
  secret
};
