//ES
console.log('ENVIRONNEMENT PROD ', process.env.NODE_ENV)

let es_url = 'http://localhost:9200/pop';

if (process.env.NODE_ENV === 'production') {
  es_url = 'https://vpc-pop-j3zoezftjmyiagfgm76ckgu2xy.eu-west-3.es.amazonaws.com/pop';
}

export {
  es_url,
}