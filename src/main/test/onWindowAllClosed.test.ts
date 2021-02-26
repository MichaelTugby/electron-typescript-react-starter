import flushPromises from "~/test/utils/flushPromises";

describe("Main", () => {
  describe("on window-all-closed", () => {
    let electron: typeof import("~/test/__mocks__/electron");
    const platform = process.platform;

    afterEach(() => {
      jest.resetModules();
      Object.defineProperty(process, "platform", { value: platform }); // Reset the platform
    });

    beforeEach(async () => {
      electron = await import("~/test/__mocks__/electron");
      electron.app.on.mockImplementation((watcher, cb) => {
        if (watcher === "window-all-closed") {
          return cb();
        }
      });
    });

    it("should create a watcher", async () => {
      await import("~/main");
      await flushPromises();
      expect(electron.app.on).toHaveBeenCalledWith(
        "window-all-closed",
        expect.any(Function)
      );
    });

    it("should quit app when platform is not darwin", async () => {
      Object.defineProperty(process, "platform", { value: "android" });
      await import("~/main");
      await flushPromises();
      expect(electron.app.quit).toHaveBeenCalled();
    });

    it("should not quit app when platform is darwin", async () => {
      Object.defineProperty(process, "platform", { value: "darwin" });
      await import("~/main");
      await flushPromises();
      expect(electron.app.quit).not.toHaveBeenCalled();
    });
  });
});
