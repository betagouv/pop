import getConfig from "next/config";
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

function deleteLastSlash(url) {
	if (url == null) return;

	if (url.slice(-1) === "/") {
		return url.slice(0, -1);
	}

	return url;
}

const api_url = deleteLastSlash(process.env.API_URL);
const server_api_url = deleteLastSlash(process.env.API_URL);
const bucket_url = `${process.env.BUCKET_URL}/`;
const pop_url = process.env.POP_URL;
const eurelian = process.env.EURELIAN;
const es_url = `${api_url}/search/`;
const sentryDsn = process.env.SENTRY_DSN;

const emailContactMnr =
	"isabelle.rouge-ducos@culture.gouv.fr;contact.m2rs@culture.gouv.fr";

module.exports = {
	api_url,
	server_api_url,
	es_url,
	bucket_url,
	pop_url,
	emailContactMnr,
	eurelian,
	sentryDsn,
};
