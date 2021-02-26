import { addCounter, subtractCounter } from "./actions";
import {
  ADD_COUNTER,
  SUBTRACT_COUNTER,
} from "~/renderer/store/counter/actionTypes";

describe("Counter Actions", () => {
  it("should create an action to subtract to a counter", () => {
    expect(addCounter()).toEqual({ type: ADD_COUNTER });
  });

  it("should create an action to add to a counter", () => {
    expect(subtractCounter()).toEqual({ type: SUBTRACT_COUNTER });
  });
});
