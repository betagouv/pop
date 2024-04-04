require("dotenv").config();
const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.DB_ENDPOINT || "mongodb://127.0.0.1/pop";
const dbName = process.env.DB_NAME || "pop";
const esUrl = process.env.ES_ENDPOINT || "http://127.0.0.1:9200";
const esPort = process.env.ES_PORT || 80;
const esUsername = process.env.ES_USERNAME;
const esPassword = process.env.ES_PASSWORD;
const s3Bucket = process.env.BUCKET || "pop-phototeque-dev";
const secret = process.env.SECRET || "not-so-secret";
const MAPBOX_API_SECRET_TOKEN = process.env.MAPBOX_API_SECRET_TOKEN;
const MAPBOX_EXPIRATION_DELAY = process.env.MAPBOX_EXPIRATION_DELAY;
const ID_PROD_APP = process.env.ID_PROD_APP;
const ovh = process.env.OVH === "true";
const bucketUrl = process.env.BUCKET_URL;

module.exports = {
	mongoUrl,
	esUrl,
	esPort,
	s3Bucket,
	PORT,
	secret,
	MAPBOX_API_SECRET_TOKEN,
	MAPBOX_EXPIRATION_DELAY,
	ID_PROD_APP,
	ovh,
	esUsername,
	esPassword,
	dbName,
	bucketUrl,
};
