/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'node',
    setupFilesAfterEnv: [ "<rootDir>/src/__tests__/setup/setup.js"],
    testPathIgnorePatterns: [
        "<rootDir>/src/__tests__/setup/",
        "<rootDir>/src/__tests__/__notices__/"
    ],
    testResultsProcessor: "jest-sonar-reporter",
    /*reporters: [
      'default',
      ['jest-sonar-reporter', {outputDirectory: 'reports', outputName: 'report.xml'}],
    ],*/
    verbose: true,
    collectCoverage: true,
    coverageReporters: ["html", "lcov", "json"],
    coverageDirectory: "coverage"
  };
  
  module.exports = config;