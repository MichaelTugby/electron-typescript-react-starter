import flushPromises from "~/test/utils/flushPromises";

describe("Main", () => {
  describe("createWindow", () => {
    describe("ipcMain", () => {
      let electron: typeof import("~/test/__mocks__/electron");

      beforeEach(async () => {
        electron = await import("~/test/__mocks__/electron");
        electron.app.whenReady.mockImplementationOnce(() => Promise.resolve());
      });

      afterEach(() => {
        jest.resetModules();
      });

      describe("dark-mode:toggle", () => {
        beforeEach(() => {
          (electron.ipcMain.on as jest.Mock).mockImplementation(
            (watcher, cb) => {
              if (watcher === "dark-mode:toggle") {
                return cb();
              }
            }
          );
        });

        it("should create a watcher for dark-mode:toggle", async () => {
          await import("~/main");
          await flushPromises();
          expect(electron.ipcMain.on).toHaveBeenCalledWith(
            "dark-mode:toggle",
            expect.any(Function)
          );
        });

        it("should set theme source to light if shouldUseDarkColors is true", async () => {
          electron.nativeTheme.shouldUseDarkColors = true;
          await import("~/main");
          await flushPromises();
          expect(electron.nativeTheme.themeSource).toEqual("light");
        });

        it("should set theme source to dark if shouldUseDarkColors is false", async () => {
          electron.nativeTheme.shouldUseDarkColors = false;
          await import("~/main");
          await flushPromises();
          expect(electron.nativeTheme.themeSource).toEqual("dark");
        });
      });

      describe("dark-mode:system", () => {
        beforeEach(async () => {
          (electron.ipcMain.on as jest.Mock).mockImplementation(
            (watcher, cb) => {
              if (watcher === "dark-mode:system") {
                return cb();
              }
            }
          );
          await import("~/main");
          await flushPromises();
        });

        it("should create a watcher for dark-mode:system", async () => {
          expect(electron.ipcMain.on).toHaveBeenCalledWith(
            "dark-mode:system",
            expect.any(Function)
          );
        });

        it("should set themeSource to system", async () => {
          expect(electron.nativeTheme.themeSource).toEqual("system");
        });
      });
    });
  });
});
