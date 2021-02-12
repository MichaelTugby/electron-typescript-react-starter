import React from "react";
import type { FunctionComponent } from "react";
import { Provider as StoreProvider } from "react-redux";

import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";

import store from "~/store";
import theme from "~/theme";

import Home from "~/components/pages/Home";

const cache = createCache({
  key: "ite",
  nonce: "id3",
});

const App: FunctionComponent = () => (
  <StoreProvider store={store}>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </CacheProvider>
  </StoreProvider>
);

export default App;
