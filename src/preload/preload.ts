import { contextBridge, ipcRenderer } from "electron";

export function send(channel: "dark-mode:toggle"): void;
export function send(channel: "dark-mode:system"): void;
export function send(channel: string, data?: unknown): void {
  ipcRenderer.send(channel, data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function retrieve(channel: string, cb: (data?: any) => void): void {
  ipcRenderer.on(channel, (_, ...args) => cb(...args));
}

contextBridge.exposeInMainWorld("api", {
  send,
  retrieve,
});
