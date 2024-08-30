require("dotenv").config();
const PORT = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL ?? "info";
const mongoUrl = process.env.DB_ENDPOINT || "mongodb://127.0.0.1/pop";
const dbName = process.env.DB_NAME || "pop";
const esUrl = process.env.ES_ENDPOINT || "http://127.0.0.1:9200";
const esPort = process.env.ES_PORT || 80;
const esUsername = process.env.ES_USERNAME;
const esPassword = process.env.ES_PASSWORD;
const s3Bucket = process.env.BUCKET || "pop-phototeque-dev";
const secret = process.env.SECRET || "not-so-secret";
const ID_PROD_APP = process.env.ID_PROD_APP;
const ovh = process.env.OVH === "true";
const bucketUrl = process.env.BUCKET_URL;
const publicBucketUrl = process.env.PUBLIC_BUCKET_URL;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sentryDSN = process.env.SENTRY_DSN;

module.exports = {
  logLevel,
  mongoUrl,
  esUrl,
  esPort,
  s3Bucket,
  PORT,
  secret,
  ID_PROD_APP,
  ovh,
  esUsername,
  esPassword,
  dbName,
  bucketUrl,
  publicBucketUrl,
  accessKeyId,
  secretAccessKey,
  sentryDSN,
};
