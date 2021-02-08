declare module "electron-connect" {
  import type electron, { BrowserWindow } from "electron";
  import type { SpawnOptions } from "child_process";
  const client: {
    create: ({}: ClientCreateOptions | BrowserWindow) => Client;
  };
  const server: {
    create: ({}: ProcessManagerCreateOptions) => ProcessManager;
  };
  interface Client {
    id: BrowserWindow["id"];
    on: (eventName: string, callback: GenericCallback) => void;
    sendMessage: (eventName: string, data: BroadcastData) => void;
  }
  interface ClientCreateOptions {
    browserWindow?: BrowserWindow;
    port?: number;
    sendBounds?: boolean;
    logLevel?: LogLevel;
    callback: GenericCallback;
  }
  interface ProcessManager {
    start: (args?: ProcessManagerArgs, cb?: ProcessManagerCallback) => void;
    restart: (args?: ProcessManagerArgs, cb?: ProcessManagerCallback) => void;
    reload: (ids?: ProcessManagerArgs) => void;
    stop: (cb?: ProcessManagerCallback) => void;
    on: (eventName: string, cb: GenericCallback) => void;
    broadcast: (eventName: string, data: BroadcastData) => void;
    electronState: ProcessManagerState | "init";
  }
  interface ProcessManagerCreateOptions {
    electron?: typeof electron;
    useGlobalElectron?: boolean;
    path?: string;
    port?: number;
    spawnOpt?: SpawnOptions;
    logLevel?: LogLevel;
    stopOnClose?: boolean;
  }

  type LogLevel = 0 | 1 | 2;
  type BroadcastData = Record<string, unknown>;
  type GenericCallback = () => void;
  type ProcessManagerCallback = (state: ProcessManagerState) => void;
  type ProcessManagerArgs = string | string[];
  type ProcessManagerState = "started" | "restarting" | "restarted" | "stopped";
}
