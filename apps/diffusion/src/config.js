function deleteLastSlash(url) {
  if (url == null) return

  if (url.slice(-1) === "/") {
    return url.slice(0, -1);
  }

  return url;
}

import getConfig from "next/config"
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

let api_url = publicRuntimeConfig.apiUrl;
let bucket_url = publicRuntimeConfig.bucketUrl;
let pop_url = publicRuntimeConfig.popUrl;
let eurelian = publicRuntimeConfig.eurelian;
let es_url = `${api_url}/search/`;
let sentryDsn = publicRuntimeConfig.sentryDsn;


let emailContactMnr = "isabelle.rouge-ducos@culture.gouv.fr;contact.m2rs@culture.gouv.fr";

module.exports = {
  api_url,
  es_url,
  bucket_url,
  pop_url,
  emailContactMnr,
  eurelian,
  sentryDsn,
};

