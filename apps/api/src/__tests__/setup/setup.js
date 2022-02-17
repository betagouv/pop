jest.setTimeout(15 * 1000);

jest.mock("@mapbox/mapbox-sdk");
const mbxClient = require('@mapbox/mapbox-sdk');
mbxClient.mockImplementation(() => ({}));

jest.mock("@mapbox/mapbox-sdk/services/tokens");
const mbxTokens = require('@mapbox/mapbox-sdk/services/tokens');
mbxTokens.mockImplementation(() => ({}));
