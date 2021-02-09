import { app, BrowserWindow } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV !== "production") {
    mainWindow.loadURL("http://localhost:8080");
    const { client } = require("electron-connect");
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require("electron-devtools-installer");
    client.create(mainWindow);
    const date = new Date().toISOString();
    installExtension([
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    ]).catch((err: Error) =>
      console.error(
        `[${date}] [electron-devtools-installer] An error occurred: `,
        err
      )
    );
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, "index.html")}`);
  }

  if (process.env.NODE_ENV !== "production") {
    mainWindow.once("ready-to-show", () => {
      mainWindow?.webContents.openDevTools();
    });
  }

  if (process.env.NODE_ENV !== "production") {
    mainWindow.on("close", () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
