// ES
let PORT = process.env.PORT || 3000;
let mongoUrl = process.env.DB_ENDPOINT || `mongodb://127.0.0.1/pop`;
let esUrl = process.env.ES_ENDPOINT || "http://127.0.0.1:9200";
let esPort = process.env.ES_PORT || 80;
let s3Bucket = process.env.BUCKET || "pop-phototeque-dev";
const secret = process.env.SECRET || "not-so-secret";

module.exports = {
  mongoUrl,
  esUrl,
  esPort,
  s3Bucket,
  PORT,
  secret
};
