const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [ "<rootDir>/__tests__/setup/setup.js"],
    setupFiles: [
      '<rootDir>/__tests__/__mocks__/text-encoder.mock.js'
    ],
    testPathIgnorePatterns: [
        "<rootDir>/__tests__/setup/",
        "<rootDir>/__tests__/__mocks__/",
        "<rootDir>/__tests__/__notices__/"
    ],
    moduleNameMapper: {
      "^.+\\.(css|scss|png|jpg|scvg|jpeg)$": "<rootDir>/__tests__/__mocks__/fileMock.js"
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
  
  module.exports = createJestConfig(customJestConfig);