const electronPath = jest.requireActual("electron");
import { Application } from "spectron";

describe("Application Launch", () => {
  let app: Application;

  beforeEach(async () => {
    app = new Application({
      args: ["."],
      path: electronPath as any, // eslint-disable-line @typescript-eslint/no-explicit-any,
    });
    await app.start();
  });

  afterEach(async () => {
    if (app.isRunning()) {
      await app.stop();
    }
  });

  it("shows an initial window", async () => {
    const count = await app.client.getWindowCount();
    expect(count).toEqual(1);
  });
});
