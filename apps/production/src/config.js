
let api_url = process.env.API_URL;
let es_url = `${api_url}/search`;
let pop_url = process.env.POP_URL;
let bucket_url = process.env.BUCKET_URL;

const message_info_password = "Votre mot de passe doit comporter au moins 12 caractères ainsi qu'une minuscule, une majuscule, un chiffre et un caractère spécial.\nIl ne doit pas comporter plus de 2 caractères issus de votre identifiant de connexion (email).";

module.exports = {
  api_url,
  pop_url,
  es_url,
  bucket_url,
  message_info_password
};
