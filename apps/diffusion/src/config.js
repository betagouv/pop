import getConfig from "next/config"
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

let api_url = publicRuntimeConfig.apiUrl;
let serverApiUrl = serverRuntimeConfig.apiUrl;
let bucket_url = publicRuntimeConfig.bucketUrl;
let pop_url = publicRuntimeConfig.popUrl;
let eurelian = publicRuntimeConfig.eurelian;
let es_url = `${api_url}/search/`;
const sentryDsn = publicRuntimeConfig.sentryDsn;

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

