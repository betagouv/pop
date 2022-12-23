/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [ "<rootDir>/src/__tests__/setup/setup.js"],
    testPathIgnorePatterns: [
        "<rootDir>/src/__tests__/setup/",
        "<rootDir>/src/__tests__/__mocks__/",
        "<rootDir>/src/__tests__/__notices__/"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__tests__/__mocks__/fileMock.js",
        "^.+\\.(css|scss)$": "identity-obj-proxy"
    },
    reporters: [
        'default',
        ['jest-sonar', {outputDirectory: 'reports', outputName: 'report.xml'}],
    ],
    verbose: true,
    collectCoverage: true,
    coverageReporters: ["html", "lcov", "json"],
    coverageDirectory: "coverage"
  };
  
  module.exports = config;