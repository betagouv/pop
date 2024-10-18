import getConfig from "next/config";

const config = {};

const { publicRuntimeConfig } = getConfig();
config.api_url = publicRuntimeConfig.apiUrl;
config.server_api_url = publicRuntimeConfig.serverApiUrl;
config.bucket_url = `${publicRuntimeConfig.bucketUrl}/`;
config.pop_url = publicRuntimeConfig.popUrl;
config.eurelian = publicRuntimeConfig.eurelian;
config.sentryDsn = publicRuntimeConfig.sentryDsn;
config.sentryEnv = publicRuntimeConfig.sentryEnv;
config.sentryTracesSampleRate = publicRuntimeConfig.sentryTracesSampleRate;
config.commitHash = publicRuntimeConfig.commitHash;

config.es_url = `${config.api_url}/search/`;

config.emailContactMnr =
	"isabelle.rouge-ducos@culture.gouv.fr;contact.m2rs@culture.gouv.fr";

module.exports = config;
