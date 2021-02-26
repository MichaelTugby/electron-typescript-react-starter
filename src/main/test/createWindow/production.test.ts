import flushPromises from "~/test/utils/flushPromises";

describe("Main", () => {
  describe("createWindow", () => {
    describe("Production", () => {
      let electron: typeof import("~/test/__mocks__/electron");
      let mainWindow: InstanceType<typeof electron.BrowserWindow>;

      beforeEach(async () => {
        electron = await import("~/test/__mocks__/electron");
        electron.app.whenReady.mockImplementationOnce(() => Promise.resolve());
        process.env.NODE_ENV = "production";
        await import("~/main");
        await flushPromises();
        mainWindow = electron.BrowserWindow.mock.results[0].value;
      });

      afterEach(() => {
        jest.resetModules();
      });

      it("should enable pnp mode", async () => {
        await import("~/main");
        await flushPromises();
        expect(process.env.NODE_OPTIONS).not.toBeUndefined();
      });

      it("should hide menu bar", async () => {
        expect(mainWindow.setMenuBarVisibility).toHaveBeenCalledWith(false);
      });

      it("should load url using file protocol", async () => {
        expect(mainWindow.loadURL).toHaveBeenCalledWith(
          expect.stringContaining("file://")
        );
      });
    });
  });
});
