import {
  ADD_COUNTER,
  SUBTRACT_COUNTER,
} from "~/renderer/store/counter/actionTypes";
import counterReducer from "./reducers";

describe("Counter Reducers", () => {
  it("should add counter", () => {
    expect(counterReducer(2, { type: ADD_COUNTER })).toEqual(3);
  });

  it("should not subtract less than 1", () => {
    expect(counterReducer(1, { type: SUBTRACT_COUNTER })).toEqual(1);
  });

  it("should subtract greater than 1", () => {
    expect(counterReducer(3, { type: SUBTRACT_COUNTER })).toEqual(2);
  });
});
