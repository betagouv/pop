import getConfig from "next/config";

function deleteLastSlash(url) {
	if (url == null) return;

	if (url.slice(-1) === "/") {
		return url.slice(0, -1);
	}

	return url;
}

function addSlash(url) {
	if (url == null) return;

	if (url.slice(-1) !== "/") {
		return `${url}/`;
	}

	return url;
}

const { publicRuntimeConfig } = getConfig();
const config = {};

if (publicRuntimeConfig.ovh === "true") {
	config.api_url = publicRuntimeConfig.apiUrl;
	config.bucket_url = `${publicRuntimeConfig.bucketUrl}/`;
	config.pop_url = publicRuntimeConfig.popUrl;
	config.eurelian = publicRuntimeConfig.eurelian;
	config.sentryDsn = publicRuntimeConfig.sentryDsn;
} else {
	config.api_url = addSlash(process.env.API_URL);
	config.bucket_url = `${process.env.BUCKET_URL}/`;
	config.pop_url = process.env.POP_URL;
	config.eurelian = process.env.EURELIAN;
	config.sentryDsn = process.env.SENTRY_DSN;
}

config.es_url = `${config.api_url}/search/`;

console.log("api_url", config.api_url);

config.emailContactMnr =
	"isabelle.rouge-ducos@culture.gouv.fr;contact.m2rs@culture.gouv.fr";

module.exports = config;
