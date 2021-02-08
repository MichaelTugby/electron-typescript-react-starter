/** @jsx jsx */
import { CacheProvider, jsx } from "@emotion/react";
import createCache from "@emotion/cache";
import type { FunctionComponent } from "react";

import Button from "~/components/Button";

const cache = createCache({
  key: "ite",
  nonce: "id3",
});

const App: FunctionComponent = () => (
  <CacheProvider value={cache}>
    <Button>Test</Button>
  </CacheProvider>
);

export default App;
