function deleteLastSlash(url) {
	if (url == null) return;

	if (url.slice(-1) === "/") {
		return url.slice(0, -1);
	}

	return url;
}

const config = {};

if (process.env.OVH === "true") {
	config.api_url = deleteLastSlash(process.env.NEXT_PUBLIC_API_URL);
	config.bucket_url = `${process.env.NEXT_PUBLIC_BUCKET_URL}/`;
	config.pop_url = process.env.NEXT_PUBLIC_POP_URL;
	config.eurelian = process.env.NEXT_PUBLIC_EURELIAN;
	config.sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
} else {
	config.api_url = deleteLastSlash(process.env.API_URL);
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
