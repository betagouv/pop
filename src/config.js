//ES

let forceProd = false;

console.log('FORCE PRODUCTION : ' + forceProd)

let mongo_url = 'mongodb://127.0.0.1/pop';
if (forceProd || process.env.NODE_ENV === 'production') {
  mongo_url = 'mongodb+srv://goffle:neovidi75@cluster0-fkthi.mongodb.net/pop';
}

let es_url = 'http://127.0.0.1:9200/pop';
if (forceProd || process.env.NODE_ENV === 'production') {
  es_url = 'https://search-pop-j3zoezftjmyiagfgm76ckgu2xy.eu-west-3.es.amazonaws.com/pop';
}

module.exports = {
  mongo_url,
  es_url,
}