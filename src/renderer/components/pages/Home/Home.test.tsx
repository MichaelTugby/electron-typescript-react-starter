import React from "react";
import { cleanup, render } from "@testing-library/react";
import Home from "./Home";

import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "@emotion/react";

import store from "~/store";
import theme from "~/theme";

describe("Home", () => {
  afterEach(cleanup);

  it("snapshot has not changed", () => {
    const { container } = render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </StoreProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
