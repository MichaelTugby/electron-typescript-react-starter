import type { Config } from "@jest/types";

export default {
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  coveragePathIgnorePatterns: ["index.ts", "e2e.ts", "test/utils"],
  moduleNameMapper: {
    "~(.*)$": "<rootDir>/src/$1",
  },
  modulePathIgnorePatterns: ["/releases/"],
  testPathIgnorePatterns: ["/node_modules/", "/releases/"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
} as Config.InitialOptions;
