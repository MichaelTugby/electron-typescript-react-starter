// import React from "react";
// import { cleanup, render, fireEvent } from "@testing-library/react";
// import Home from "./Home";

// import { Provider as StoreProvider } from "react-redux";
// import { ThemeProvider } from "@emotion/react";

// import store from "~/renderer/store";
// import theme from "~/renderer/theme";

// describe("Home", () => {
//   afterEach(cleanup);

//   it("snapshot has not changed", () => {
//     const { container } = render(
//       <StoreProvider store={store}>
//         <ThemeProvider theme={theme}>
//           <Home />
//         </ThemeProvider>
//       </StoreProvider>
//     );
//     expect(container).toMatchSnapshot();
//   });

//   it("fires SUBTRACT_COUNTER dispatch method on decrease", () => {
//     const spy = jest.spyOn(store, "dispatch");
//     const { getByText } = render(
//       <StoreProvider store={store}>
//         <ThemeProvider theme={theme}>
//           <Home />
//         </ThemeProvider>
//       </StoreProvider>
//     );
//     const subtract = getByText("-");
//     fireEvent.click(subtract);
//     expect(spy).toHaveBeenCalledWith({ type: "SUBTRACT_COUNTER" });
//   });

//   it("fires ADD_COUNTER dispatch method on increase", () => {
//     const spy = jest.spyOn(store, "dispatch");
//     const { getByText } = render(
//       <StoreProvider store={store}>
//         <ThemeProvider theme={theme}>
//           <Home />
//         </ThemeProvider>
//       </StoreProvider>
//     );
//     const subtract = getByText("+");
//     fireEvent.click(subtract);
//     expect(spy).toHaveBeenCalledWith({ type: "ADD_COUNTER" });
//   });

//   it("fires toggleDarkMode method on toggle dark mode button click", () => {
//     const spy = jest.fn();
//     global.api = {
//       ...global.api,
//       send: spy,
//     };
//     const { getByText } = render(
//       <StoreProvider store={store}>
//         <ThemeProvider theme={theme}>
//           <Home />
//         </ThemeProvider>
//       </StoreProvider>
//     );
//     const toggleDarkModeBtn = getByText("Toggle Dark Mode");
//     fireEvent.click(toggleDarkModeBtn);
//     expect(spy).toHaveBeenCalledWith("dark-mode:toggle");
//   });
// });
