import flushPromises from "~/test/utils/flushPromises";

describe("Main", () => {
  describe("on activate", () => {
    let electron: typeof import("~/test/__mocks__/electron");

    beforeEach(async () => {
      electron = await import("~/test/__mocks__/electron");
      electron.app.on.mockImplementation((watcher: unknown, cb) => {
        if (watcher === "activate") {
          return cb();
        }
      });
    });

    afterEach(() => {
      jest.resetModules();
    });

    it("should create a watcher", async () => {
      electron.BrowserWindow.getAllWindows.mockReturnValueOnce([]);
      await import("~/main");
      await flushPromises();
      expect(electron.app.on).toHaveBeenCalledWith(
        "activate",
        expect.any(Function)
      );
    });

    it("should create a new window if one does not exist", async () => {
      electron.BrowserWindow.getAllWindows.mockReturnValueOnce([]);
      await import("~/main");
      await flushPromises();
      expect(electron.BrowserWindow).toHaveBeenCalledTimes(1);
    });

    it("should not create a new window if one already exists", async () => {
      (electron.BrowserWindow.getAllWindows as jest.Mock).mockReturnValueOnce([
        1,
      ]);
      await import("~/main");
      await flushPromises();
      expect(electron.BrowserWindow).not.toHaveBeenCalled();
    });
  });
});
