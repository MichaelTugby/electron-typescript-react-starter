import * as preloadFunctions from "~/preload";

declare global {
  interface Window {
    api: typeof preloadFunctions;
  }

  declare namespace NodeJS {
    interface Global {
      api: typeof preloadFunctions;
    }
  }
}
