import flushPromises from "~/test/utils/flushPromises";

describe("Main", () => {
  describe("createWindow", () => {
    describe("Development", () => {
      let electron: typeof import("~/test/__mocks__/electron");
      let electronConnect: typeof import("~/test/__mocks__/electron-connect");

      type ElectronBrowserWindow = InstanceType<
        typeof electron["BrowserWindowMockClass"]
      >;

      beforeEach(async () => {
        [electron, electronConnect] = await Promise.all([
          import("~/test/__mocks__/electron"),
          import("~/test/__mocks__/electron-connect"),
        ]);
        electron.app.whenReady.mockImplementationOnce(() => Promise.resolve());
        process.env.NODE_ENV = "development";
      });

      afterEach(() => {
        jest.resetModules();
      });

      it("should load localhost url", async () => {
        await import("~/main");
        await flushPromises();
        const mainWindow = electron.BrowserWindow.mock.results[0]
          .value as ElectronBrowserWindow;
        expect(mainWindow.loadURL).toHaveBeenCalledWith(
          expect.stringContaining("localhost")
        );
      });

      it("should create an electron-connect client", async () => {
        await import("~/main");
        await flushPromises();
        const mainWindow = electron.BrowserWindow.mock.results[0]
          .value as ElectronBrowserWindow;
        expect(electronConnect.client.create).toHaveBeenCalledWith(mainWindow);
      });

      describe("Electron Devtools Installer", () => {
        let electronDevtoolsInstaller: typeof import("~/test/__mocks__/electron-devtools-installer");

        beforeEach(async () => {
          electronDevtoolsInstaller = await import(
            "~/test/__mocks__/electron-devtools-installer"
          );
        });

        it("should add devtool extensions", async () => {
          await import("~/main");
          await flushPromises();
          expect(electronDevtoolsInstaller.default).toHaveBeenCalledWith([
            electronDevtoolsInstaller.REACT_DEVELOPER_TOOLS,
            electronDevtoolsInstaller.REDUX_DEVTOOLS,
          ]);
        });

        it("should log extension when resolved", async () => {
          const reactDevtool = electronDevtoolsInstaller.REACT_DEVELOPER_TOOLS;
          electronDevtoolsInstaller.default.mockImplementationOnce(() =>
            Promise.resolve(reactDevtool)
          );
          const spy = jest.spyOn(console, "log");
          await import("~/main");
          await flushPromises();
          expect(spy).toHaveBeenCalledWith(
            expect.stringContaining(`Added extension: ${reactDevtool}`)
          );
        });

        it("should open dev tools when resolved", async () => {
          electronDevtoolsInstaller.default.mockImplementationOnce(() =>
            Promise.resolve("")
          );
          await import("~/main");
          await flushPromises();
          const mainWindow = electron.BrowserWindow.mock.results[0]
            .value as ElectronBrowserWindow;
          expect(mainWindow.webContents.openDevTools).toHaveBeenCalled();
        });

        it("should log error when rejected", async () => {
          const error = new Error("Something went wrong!");
          electronDevtoolsInstaller.default.mockImplementationOnce(() =>
            Promise.reject(error)
          );
          const spy = jest.spyOn(console, "error");
          await import("~/main");
          await flushPromises();
          expect(spy).toHaveBeenCalledWith(
            expect.stringContaining(`An error occurred: ${error.message}`)
          );
        });

        it("should open dev tools when rejected", async () => {
          electronDevtoolsInstaller.default.mockImplementationOnce(() =>
            Promise.reject(new Error())
          );
          await import("~/main");
          await flushPromises();
          const mainWindow = electron.BrowserWindow.mock.results[0]
            .value as ElectronBrowserWindow;
          expect(mainWindow.webContents.openDevTools).toHaveBeenCalled();
        });
      });

      it("should watch for close event on window", async () => {
        await import("~/main");
        await flushPromises();
        const mainWindow = electron.BrowserWindow.mock.results[0]
          .value as ElectronBrowserWindow;
        expect(mainWindow.on).toHaveBeenCalledWith(
          "close",
          expect.any(Function)
        );
      });

      it("should close dev tools when close event fires", async () => {
        electron.BrowserWindow.mockImplementationOnce(
          () =>
            new (class extends electron.BrowserWindowMockClass {
              on = jest.fn().mockImplementationOnce((watcher, cb) => {
                if (watcher === "close") {
                  return cb();
                }
              });
            })()
        );
        await import("~/main");
        await flushPromises();
        const mainWindow = electron.BrowserWindow.mock.results[0]
          .value as ElectronBrowserWindow;
        expect(mainWindow.webContents.closeDevTools).toHaveBeenCalled();
      });
    });
  });
});
