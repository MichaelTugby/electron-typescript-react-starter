describe("Preload", () => {
  let electron: typeof import("~/test/__mocks__/electron");
  let preload: typeof import("~/preload");

  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(async () => {
    [preload, electron] = await Promise.all([
      import("~/preload"),
      import("~/test/__mocks__/electron"),
    ]);
  });

  it("should expose api methods to renderer", async () => {
    expect(electron.contextBridge.exposeInMainWorld).toHaveBeenCalledWith(
      "api",
      {
        send: preload.send,
        retrieve: preload.retrieve,
      }
    );
  });

  it("should send channel through ipcRenderer", async () => {
    preload.send("dark-mode:system");
    expect(electron.ipcRenderer.send).toHaveBeenCalledWith(
      "dark-mode:system",
      undefined
    );
  });

  it("should retrieve channel through ipcRenderer", async () => {
    const spy = jest.fn();
    preload.retrieve("test", spy);

    expect(electron.ipcRenderer.on).toHaveBeenCalledWith(
      "test",
      expect.any(Function)
    ); // Check if on was called

    const handler = electron.ipcRenderer.on.mock.calls[0][1] as () => void;
    handler();
    expect(spy).toHaveBeenCalled(); // Check if cb was called
  });
});
