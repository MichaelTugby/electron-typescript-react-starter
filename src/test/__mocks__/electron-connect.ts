import { client as electronConnectClient } from "electron-connect";

export const client = {
  create: jest.fn() as jest.MockedFunction<typeof electronConnectClient.create>,
};
