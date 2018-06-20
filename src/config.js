//ES

let forceProd = false;

let api_url = 'http://127.0.0.1:3000';
if (forceProd || process.env.NODE_ENV === 'production') {
  api_url = 'http://api-staging.6qvh6fbw23.eu-west-3.elasticbeanstalk.com';
}


let es_url = 'http://127.0.0.1:9200';
if (forceProd || process.env.NODE_ENV === 'production') {
  es_url = 'https://search-pop-j3zoezftjmyiagfgm76ckgu2xy.eu-west-3.es.amazonaws.com';
}

module.exports = {
  api_url,
  es_url,
}