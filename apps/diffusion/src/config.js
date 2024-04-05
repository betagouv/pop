import getConfig from "next/config";
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

function deleteLastSlash(url) {
	if (url == null) return;

	if (url.slice(-1) === "/") {
		return url.slice(0, -1);
	}

	return url;
}

const api_url = deleteLastSlash(publicRuntimeConfig.api_url);
const server_api_url = deleteLastSlash(serverRuntimeConfig.api_url);
const bucket_url = publicRuntimeConfig.bucket_url + "/";
const pop_url = publicRuntimeConfig.pop_url;
const eurelian = publicRuntimeConfig.eurelian;
const es_url = `${api_url}/search/`;
const sentryDsn = publicRuntimeConfig.sentryDsn;

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
