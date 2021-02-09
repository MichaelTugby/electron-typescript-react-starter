/** @jsx jsx */
import type { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { CacheProvider, jsx } from "@emotion/react";

import cache from "~/cache";
import store from "~/store";
import Button from "~/components/Button";

const App: FunctionComponent = () => (
  <Provider store={store}>
    <CacheProvider value={cache}>
      <Button>Test</Button>
    </CacheProvider>
  </Provider>
);

export default App;
