export const api_url = process.env.API_URL;
export const es_url = `${api_url}/search`;
export const pop_url = process.env.POP_URL;
export const bucket_url = process.env.BUCKET_URL;
export const sentry_dsn = process.env.SENTRY_DSN;
export const sentry_env = process.env.SENTRY_ENV;
export const sentry_tracesSampleRate = process.env.SENTRY_TRACES_SAMPLE_RATE;
export const commitHash = process.env.SRC_REF;

export const message_info_password =
	"Votre mot de passe doit comporter au moins 12 caractères ainsi qu'une minuscule, une majuscule, un chiffre et un caractère spécial.\nIl ne doit pas comporter plus de 2 caractères issus de votre identifiant de connexion (email).";
