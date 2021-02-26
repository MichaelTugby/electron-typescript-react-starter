import type { Config } from "@jest/types";

export default {
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  coveragePathIgnorePatterns: ["index.ts", "/test/"],
  moduleNameMapper: {
    "~(.*)$": "<rootDir>/src/$1",
  },
  modulePathIgnorePatterns: ["/releases/"],
  testMatch: ["**/?(*.)+(test|e2e).ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/releases/"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
} as Config.InitialOptions;
