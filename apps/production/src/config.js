
let api_url = process.env.API_URL;
let es_url = `${api_url}/search`;
let pop_url = process.env.POP_URL;
let bucket_url = process.env.BUCKET_URL;

module.exports = {
  api_url,
  pop_url,
  es_url,
  bucket_url
};
