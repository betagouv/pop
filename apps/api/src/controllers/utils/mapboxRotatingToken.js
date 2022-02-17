const mbxClient = require('@mapbox/mapbox-sdk');
const mbxTokens = require('@mapbox/mapbox-sdk/services/tokens');
const { compareDesc, addMinutes } = require('date-fns');
const {
    MAPBOX_API_SECRET_TOKEN,
    MAPBOX_EXPIRATION_DELAY,
} = require('../../config');

const baseClient = mbxClient({ accessToken: MAPBOX_API_SECRET_TOKEN });
const tokenService = mbxTokens(baseClient);

let cachedToken = {};

const getAllTokens = async () => {
    const { body } = await tokenService
        .listTokens({})
        .send()
        ;
    return body;
};

const PUBLIC_ROTATING_TOKEN_NOTE = 'public-rotating';

const createRotatingToken = async () => {

    const { body } = await tokenService
        .createToken({
            note: PUBLIC_ROTATING_TOKEN_NOTE,
            scopes: [
                'styles:tiles',
                'styles:read',
                'fonts:read',
                'datasets:read',
                'vision:read',
            ],
        })
        .send()
        ;

    return body;
};

const filterPublicRotatingTokens = tokens => tokens.filter(
    ({ note }) => (note === PUBLIC_ROTATING_TOKEN_NOTE)
);

const sortTokensDateDesc = tokens => tokens.sort(compareTokensByDateDesc);

const compareTokensByDateDesc = (tokenA, tokenB) =>
    compareDesc(new Date(tokenA.created), new Date(tokenB.created))
    ;

/**
 * Check if the expiration time has been exceeded.
 * 
 * @param {Object} token 
 * @returns {boolean}
 */
const isTokenExpired = token => {

    if (!token.created) return true;

    const tokenDate = new Date(token.created);
    const expirationDelay = MAPBOX_EXPIRATION_DELAY || 360;
    const latestGrantedCreationDate = addMinutes(new Date(), - expirationDelay);

    return tokenDate < latestGrantedCreationDate;
}

/**
 * Split tokens in an array of two lists.
 * The first list contains valid tokens.
 * The second list contains expired tokens.
 * 
 * @param {Object[]} tokens 
 * @returns {Array[]}
 */
const splitExpiredTokens = tokens =>
    tokens.reduce(
        (splittedTokens, token) => isTokenExpired(token) ?
            [splittedTokens[0], splittedTokens[1].concat(token)]
            :
            [splittedTokens[0].concat(token), splittedTokens[1]]
        ,
        [[], []]
    )

/**
 * Get a public token to use Mapbox services.
 * 
 * @returns {String} 
 */
const getToken = async () => {

    if (!isTokenExpired(cachedToken)) {
        console.log(`Valid cached Mapbox token found.`)
        return cachedToken.token
    }
    console.log(`No valid cached Mapbox token found.`);

    console.log(`Looking for valid old Mapbox tokens.`);
    const tokens = await getAllTokens();
    const publicRotatingTokens = filterPublicRotatingTokens(tokens);
    const [valideTokens, expiredTokens] = splitExpiredTokens(publicRotatingTokens);

    // Delete expired tokens
    expiredTokens.forEach(({ id }) => {
        console.log(`Delete expired Mapbox token ${id}`);
        tokenService.deleteToken({ tokenId: id }).send();
    });

    // Return last valid token created, if any.
    if (valideTokens.length > 0) {
        console.log(`Valid old token Mapbox found.`);
        return sortTokensDateDesc(valideTokens)[0].token
    }
    console.log(`No valid old token Mapbox found.`);

    // No valid token found, let's create a new one.
    const newToken = await createRotatingToken();
    cachedToken = newToken;
    console.log(`New Mapbox token created and cached.`);

    return newToken.token;
}

module.exports = {
    getToken,
};
