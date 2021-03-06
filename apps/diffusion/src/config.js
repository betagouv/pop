let env = null || process.env.APP_URLS_ENV;

let api_url = "http://127.0.0.1:3000";
let es_url = "http://127.0.0.1:3000/search/";
let bucket_url = "https://s3.eu-west-3.amazonaws.com/pop-phototeque/";
// let pop_url = "https://www.pop.culture.gouv.fr/";
let pop_url = "http://127.0.0.1:8081/";

let emailContactMnr = "isabelle.rouge-ducos@culture.gouv.fr;contact.m2rs@culture.gouv.fr";

switch (env) {
  case "production":
    api_url = "https://api.pop.culture.gouv.fr";
    es_url = "https://api.pop.culture.gouv.fr/search/";
    bucket_url = "https://s3.eu-west-3.amazonaws.com/pop-phototeque/";
    pop_url = "https://www.pop.culture.gouv.fr/";
    break;

  case "staging":
    api_url = "http://pop-api-staging.eu-west-3.elasticbeanstalk.com";
    es_url = "http://pop-api-staging.eu-west-3.elasticbeanstalk.com/search/";
    bucket_url = "https://s3.eu-west-3.amazonaws.com/pop-phototeque-staging/";
    pop_url = "http://pop-consultation-staging.eu-west-3.elasticbeanstalk.com/";
    break;
}

module.exports = {
  api_url,
  es_url,
  bucket_url,
  pop_url,
  emailContactMnr
};
