//ES

let mongo_url = 'mongodb://127.0.0.1/pop';

if (process.env.prod) {
    mongo_url = 'mongodb://127.0.0.1/pop';
}

module.exports = {
    mongo_url,
}