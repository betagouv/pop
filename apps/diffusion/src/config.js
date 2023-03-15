
let api_url = process.env.API_URL;
let es_url = `${api_url}/search/`;
let bucket_url = process.env.BUCKET_URL;
let pop_url = process.env.POP_URL;
let eurelian = process.env.EURELIAN;

let emailContactMnr = "isabelle.rouge-ducos@culture.gouv.fr;contact.m2rs@culture.gouv.fr";

module.exports = {
  api_url,
  es_url,
  bucket_url,
  pop_url,
  emailContactMnr,
  eurelian
};
