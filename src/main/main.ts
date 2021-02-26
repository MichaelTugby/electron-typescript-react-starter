import { app, BrowserWindow, ipcMain, nativeTheme } from "electron";
import path from "path";

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  if (process.env.NODE_ENV !== "production") {
    mainWindow.loadURL("http://localhost:8080");
    const { client } = require("electron-connect"); // eslint-disable-line @typescript-eslint/no-var-requires
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require("electron-devtools-installer"); // eslint-disable-line @typescript-eslint/no-var-requires
    client.create(mainWindow);
    const date = new Date().toISOString();
    await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then((name: string) =>
        console.log(
          `[${date}] [electron-devtools-installer] Added extension: ${name}`
        )
      )
      .catch((err: Error) =>
        console.error(
          `[${date}] [electron-devtools-installer] An error occurred: ${err.message}`
        )
      )
      .finally(() => {
        mainWindow.webContents.openDevTools();
      });
    mainWindow.on("close", () => {
      mainWindow?.webContents.closeDevTools();
    });
  } else {
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL(`file://${path.join(__dirname, "index.html")}`);
  }
  ipcMain.on("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });
  ipcMain.on("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
  });
}

app
  .whenReady()
  .then(createWindow)
  .catch((err) => console.error(err));

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
