import React from "react";
import type { FunctionComponent } from "react";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";

import store, { persistor } from "~/renderer/store";
import theme from "~/renderer/theme";

import Home from "~/renderer/components/pages/Home";
import { render } from "react-dom";

const cache = createCache({
  key: "ite",
  nonce: "id3",
});

const Renderer: FunctionComponent = () => (
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </CacheProvider>
    </PersistGate>
  </StoreProvider>
);

render(<Renderer />, document.getElementById("root"));

export default Renderer;
