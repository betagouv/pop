//ES

let forceProd = false;

console.log('ENV DETECTED : ', process.env.NODE_ENV)

let api_url = 'http://127.0.0.1:3000';
let es_url = 'http://127.0.0.1:9200';
let bucket_url = 'https://s3.eu-west-3.amazonaws.com/pop-phototeque-dev';

switch (process.env.NODE_ENV) {
  case 'production':
    api_url = 'http://pop-api.eu-west-3.elasticbeanstalk.com';
    es_url = 'https://search-pop-j3zoezftjmyiagfgm76ckgu2xy.eu-west-3.es.amazonaws.com';
    bucket_url = 'https://s3.eu-west-3.amazonaws.com/pop-phototeque';
    break;

  case 'staging':
    api_url = 'http://pop-api-staging.eu-west-3.elasticbeanstalk.com';
    es_url = 'https://search-pop-staging-zukwe7tuull7zntiuqs3mp3gr4.eu-west-3.es.amazonaws.com';
    bucket_url = 'https://s3.eu-west-3.amazonaws.com/pop-phototeque-staging';
    break;
}

module.exports = {
  api_url,
  es_url,
  bucket_url
}