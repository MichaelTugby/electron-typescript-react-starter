import electronDevtoolsInstaller from "electron-devtools-installer";

export const REACT_DEVELOPER_TOOLS = "MOCK_DEVTOOLS";
export const REDUX_DEVTOOLS = "MOCK_DEVTOOLS";
export default jest
  .fn()
  .mockImplementation(() => Promise.reject(new Error())) as jest.MockedFunction<
  typeof electronDevtoolsInstaller
>;
