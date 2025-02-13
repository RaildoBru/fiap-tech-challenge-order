export default {
    testEnvironment: "node",
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    collectCoverage: true,
    coverageDirectory: "coverage",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  };
  