require('dotenv').config();

// TODO: Delete this, log env vars
console.log(process.env);


let PORT = process.env.PORT || 3000;
let mongoUrl = process.env.DB_ENDPOINT || `mongodb://127.0.0.1/pop`;
let esUrl = process.env.ES_ENDPOINT || "http://127.0.0.1:9200";
let esPort = process.env.ES_PORT || 80;
let s3Bucket = process.env.BUCKET || "pop-phototeque-dev";
const secret = process.env.SECRET || "not-so-secret";
const MAPBOX_API_SECRET_TOKEN = process.env.MAPBOX_API_SECRET_TOKEN;
const MAPBOX_EXPIRATION_DELAY = process.env.MAPBOX_EXPIRATION_DELAY;
const LOCALSTACK = process.env.LOCALSTACK;
const ID_PROD_APP = process.env.ID_PROD_APP;

module.exports = {
  mongoUrl,
  esUrl,
  esPort,
  s3Bucket,
  PORT,
  secret,
  MAPBOX_API_SECRET_TOKEN,
  MAPBOX_EXPIRATION_DELAY,
  LOCALSTACK,
  ID_PROD_APP
};
