import type {
  app as electronApp,
  BrowserWindow as ElectronBrowserWindow,
  contextBridge as electronContextBridge,
  ipcMain as electronIpcMain,
  ipcRenderer as electronIpcRenderer,
  nativeTheme as electronNativeTheme,
} from "electron";

export const app = {
  on: jest.fn() as jest.MockedFunction<typeof electronApp.on>,
  whenReady: jest.fn(() => Promise.reject()) as jest.MockedFunction<
    typeof electronApp.whenReady
  >,
  quit: jest.fn() as jest.MockedFunction<typeof electronApp.quit>,
};

type BrowserWindowInstance = InstanceType<typeof ElectronBrowserWindow>;
export class BrowserWindowMockClass {
  loadURL = jest.fn() as jest.MockedFunction<BrowserWindowInstance["loadURL"]>;
  on = jest.fn() as jest.MockedFunction<BrowserWindowInstance["on"]>;
  setMenuBarVisibility = jest.fn() as jest.MockedFunction<
    BrowserWindowInstance["setMenuBarVisibility"]
  >;
  webContents = {
    closeDevTools: jest.fn() as jest.MockedFunction<
      BrowserWindowInstance["webContents"]["closeDevTools"]
    >,
    openDevTools: jest.fn() as jest.MockedFunction<
      BrowserWindowInstance["webContents"]["openDevTools"]
    >,
  };
  static getAllWindows: jest.MockedFunction<
    typeof ElectronBrowserWindow["getAllWindows"]
  >;
}
export const BrowserWindow = (jest.fn(
  () => new BrowserWindowMockClass()
) as unknown) as jest.MockedClass<typeof BrowserWindowMockClass>;
BrowserWindow.getAllWindows = jest.fn(); // Manually set static method on jest function

export const contextBridge = {
  exposeInMainWorld: jest.fn() as jest.MockedFunction<
    typeof electronContextBridge["exposeInMainWorld"]
  >,
};

export const ipcMain = {
  on: jest.fn() as jest.MockedFunction<typeof electronIpcMain["on"]>,
};

export const ipcRenderer = {
  on: jest.fn() as jest.MockedFunction<typeof electronIpcRenderer["on"]>,
  send: jest.fn() as jest.MockedFunction<typeof electronIpcRenderer["send"]>,
};

export const nativeTheme = {
  shouldUseDarkColors: true as typeof electronNativeTheme.shouldUseDarkColors,
  themeSource: "light" as typeof electronNativeTheme.themeSource,
};
