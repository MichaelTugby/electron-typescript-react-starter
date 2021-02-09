import electronPath from "electron";
import { Application } from "spectron";

describe("Application Launch", () => {
  let app: Application | null;

  beforeEach(async () => {
    app = new Application({
      args: ["."],
      path: electronPath as any,
    });
    await app.start();
  });

  afterEach(async () => {
    if (app?.isRunning()) {
      await app.stop();
    }
  });

  it("shows an initial window", async () => {
    const count = await app?.client.getWindowCount();
    expect(count).toEqual(1);
  });
});
