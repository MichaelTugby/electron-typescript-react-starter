import flushPromises from "~/test/utils/flushPromises";

describe("Main", () => {
  describe("whenReady", () => {
    let electron: typeof import("~/test/__mocks__/electron");

    beforeEach(async () => {
      electron = await import("~/test/__mocks__/electron");
    });

    afterEach(() => {
      jest.resetModules();
    });

    it("should create a watcher", async () => {
      await import("~/main");
      await flushPromises();
      expect(electron.app.whenReady).toHaveBeenCalled();
    });

    it("should create a new window when whenReady is resolved", async () => {
      electron.app.whenReady.mockImplementationOnce(() => Promise.resolve());
      await import("~/main");
      await flushPromises();
      expect(electron.BrowserWindow).toHaveBeenCalled();
    });

    it("should not create a new window when whenReady is rejected", async () => {
      electron.app.whenReady.mockImplementationOnce(() => Promise.reject());
      await import("~/main");
      await flushPromises();
      expect(electron.BrowserWindow).not.toHaveBeenCalled();
    });

    it("should log error message if whenReady is rejected", async () => {
      const spy = jest.spyOn(console, "error");
      const error = new Error("Something went wrong!");
      electron.app.whenReady.mockImplementationOnce(() =>
        Promise.reject(error)
      );
      await import("~/main");
      await flushPromises();
      expect(spy).toHaveBeenCalledWith(error);
    });
  });
});
