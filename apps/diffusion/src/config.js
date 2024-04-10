function deleteLastSlash(url) {
	if (url == null) return;

	if (url.slice(-1) === "/") {
		return url.slice(0, -1);
	}

	return url;
}

const api_url = deleteLastSlash(
	process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL,
);
const bucket_url = `${
	process.env.BUCKET_URL ?? process.env.NEXT_PUBLIC_BUCKET_URL
}/`;
const pop_url = process.env.POP_URL ?? process.env.NEXT_PUBLIC_POP_URL;
const eurelian = process.env.EURELIAN ?? process.env.NEXT_PUBLIC_EURELIAN;
const es_url = `${api_url}/search/`;
const sentryDsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

console.log("api_url", api_url);

const emailContactMnr =
	"isabelle.rouge-ducos@culture.gouv.fr;contact.m2rs@culture.gouv.fr";

module.exports = {
	api_url,
	es_url,
	bucket_url,
	pop_url,
	emailContactMnr,
	eurelian,
	sentryDsn,
};
