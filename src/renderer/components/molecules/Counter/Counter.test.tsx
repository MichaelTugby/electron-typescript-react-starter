import React from "react";
import { cleanup, render } from "@testing-library/react";

import { ThemeProvider } from "@emotion/react";
import Counter from "./Counter";

import theme from "~/theme";

describe("Counter", () => {
  afterEach(cleanup);

  it("snapshot has not changed", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Counter>1</Counter>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
