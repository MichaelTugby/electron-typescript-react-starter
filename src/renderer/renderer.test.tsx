// import React from "react";
// import ReactDOM from "react-dom";
// import { cleanup } from "@testing-library/react";

// describe("App", () => {
//   afterEach(cleanup);

//   beforeAll(() => {
//     const root = document.createElement("div");
//     root.id = "root";
//     document.body.appendChild(root);
//   });

//   it("snapshot has not changed", async () => {
//     const spy = jest.spyOn(ReactDOM, "render");
//     const App = (await import("./")).default;
//     expect(spy).toHaveBeenCalledWith(<App />, document.getElementById("root"));
//   });
// });
