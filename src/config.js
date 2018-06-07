//ES

let forceProd = true;

console.log('SEB ', process.env.PORT);
console.log('ENV ', process);

let mongo_url = 'mongodb://127.0.0.1/pop';
if (forceProd || process.env.NODE_ENV === 'production') {
    mongo_url = 'mongodb+srv://goffle:neovidi75@cluster0-fkthi.mongodb.net/pop';
}

let es_url = '127.0.0.1:9200';
if (forceProd || process.env.NODE_ENV === 'production') {
    es_url = 'https://search-pop-j3zoezftjmyiagfgm76ckgu2xy.eu-west-3.es.amazonaws.com';
}

let PORT = 3000;
if (forceProd || process.env.NODE_ENV === 'production') {
    PORT = 8081
}

module.exports = {
    mongo_url,
    es_url,
    PORT,
}