import type { Config } from "@jest/types";

export default {
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  moduleNameMapper: {
    "~(.*)$": "<rootDir>/src/renderer/$1",
  },
} as Config.InitialOptions;
