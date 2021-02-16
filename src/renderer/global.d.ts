import * as preloadFunctions from "../preload";

declare global {
  interface Window {
    api: typeof preloadFunctions;
  }
}
