import getConfig from "next/config";

const config = {};

if (publicRuntimeConfig.ovh === "true") {
	const { publicRuntimeConfig } = getConfig();
	config.api_url = publicRuntimeConfig.apiUrl;
	config.server_api_url = publicRuntimeConfig.apiUrl;
	config.bucket_url = `${publicRuntimeConfig.bucketUrl}/`;
	config.pop_url = publicRuntimeConfig.popUrl;
	config.eurelian = publicRuntimeConfig.eurelian;
	config.sentryDsn = publicRuntimeConfig.sentryDsn;
} else {
	config.api_url = process.env.API_URL;
	config.server_api_url = process.env.SERVER_API_URL;
	config.bucket_url = `${process.env.BUCKET_URL}/`;
	config.pop_url = process.env.POP_URL;
	config.eurelian = process.env.EURELIAN;
	config.sentryDsn = process.env.SENTRY_DSN;
}

config.es_url = `${config.api_url}/search/`;

console.log("api_url", config.api_url);
console.log("server_api_url", config.server_api_url);

config.emailContactMnr =
	"isabelle.rouge-ducos@culture.gouv.fr;contact.m2rs@culture.gouv.fr";

module.exports = config;
