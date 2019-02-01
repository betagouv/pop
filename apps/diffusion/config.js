let env = null || process.env.NODE_ENV;

let api_url = "http://127.0.0.1:3000";
let es_url = "http://127.0.0.1:3000/search/";
let bucket_url = "https://s3.eu-west-3.amazonaws.com/pop-phototeque-dev/";

switch (env) {
  case "production":
    api_url = "https://api.pop.culture.gouv.fr";
    es_url = "https://api.pop.culture.gouv.fr/search/";
    bucket_url = "https://s3.eu-west-3.amazonaws.com/pop-phototeque/";
    break;

  case "staging":
    api_url = "http://pop-api-staging.eu-west-3.elasticbeanstalk.com";
    es_url = "http://pop-api-staging.eu-west-3.elasticbeanstalk.com/search/";
    bucket_url = "https://s3.eu-west-3.amazonaws.com/pop-phototeque-staging/";
    break;
}

module.exports = {
  api_url,
  es_url,
  bucket_url
};
