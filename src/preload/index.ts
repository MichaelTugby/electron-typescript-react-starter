import { contextBridge, ipcRenderer } from "electron";

export function send(channel: "dark-mode:toggle"): void;
export function send(channel: "dark-mode:system"): void;
export function send(channel: string, data?: unknown): void {
  ipcRenderer.send(channel, data);
}

contextBridge.exposeInMainWorld("api", {
  send,
});
