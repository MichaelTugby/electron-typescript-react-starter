import "@emotion/react";

const theme = {
  colors: {
    primary: "lightblue",
  },
};

type MyTheme = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends MyTheme {} // eslint-disable-line @typescript-eslint/no-empty-interface
}

export default theme;
