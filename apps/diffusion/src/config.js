function deleteLastSlash(url) {
  if (url == null) return

  if (url.slice(-1) === "/") {
    return url.slice(0, -1);
  }

  return url;
}

let api_url = deleteLastSlash(process.env.NEXT_PUBLIC_API_URL);
let bucket_url = process.env.NEXT_PUBLIC_BUCKET_URL + '/';
let pop_url = process.env.NEXT_PUBLIC_POP_URL;
let eurelian = process.env.EURELIAN;
let es_url = `${api_url}/search/`;
const sentryDsn = process.env.SENTRY_DSN;

let emailContactMnr = "isabelle.rouge-ducos@culture.gouv.fr;contact.m2rs@culture.gouv.fr";

module.exports = {
  api_url,
  serverApiUrl,
  es_url,
  bucket_url,
  pop_url,
  emailContactMnr,
  eurelian,
  sentryDsn,
};

