let forceProd = true;

let api_url = 'http://127.0.0.1:3000';
if (forceProd || process.env.NODE_ENV === 'production') {
  api_url = 'http://pop-api.eu-west-3.elasticbeanstalk.com';
}

let bucket_url = 'https://s3.eu-west-3.amazonaws.com/pop-phototeque/';

let es_url = 'http://127.0.0.1:3000/search';
if (forceProd || process.env.NODE_ENV === 'production') {
  es_url = 'http://pop-api.eu-west-3.elasticbeanstalk.com/search';
}

module.exports = {
  api_url,
  es_url,
  bucket_url
}