/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [ "<rootDir>/__tests__/setup/setup.js"],
    testPathIgnorePatterns: [
        "<rootDir>/__tests__/setup/",
        "<rootDir>/__tests__/__mocks__/",
        "<rootDir>/__tests__/__notices__/"
    ],
    moduleNameMapper: {
        "^.+\\.(css|scss|png|jpg|scvg|jpeg)$": "<rootDir>/__tests__/__mocks__/fileMock.js"
      },
    testResultsProcessor: "jest-sonar-reporter",
    verbose: true,
    collectCoverage: true,
    coverageReporters: ["html", "lcov", "json"],
    coverageDirectory: "coverage"
  };
  
  module.exports = config;