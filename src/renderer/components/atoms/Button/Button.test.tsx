import React from "react";
import { cleanup, render } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  afterEach(cleanup);

  it("snapshot has not changed", () => {
    const { container } = render(<Button>Test</Button>);
    expect(container).toMatchSnapshot();
  });
});
