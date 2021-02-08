import React from "react";
import { cleanup, render } from "@testing-library/react";
import Button from "~/components/Button";

describe("Button Component", () => {
  afterEach(cleanup);

  it("snapshot has not changed", () => {
    const { container } = render(<Button>Test</Button>);
    expect(container).toMatchSnapshot();
  });
});
