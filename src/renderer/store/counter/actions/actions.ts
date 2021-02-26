import {
  ADD_COUNTER,
  SUBTRACT_COUNTER,
} from "~/renderer/store/counter/actionTypes";
import { createAction } from "typesafe-actions";

export const addCounter = createAction(ADD_COUNTER)();
export const subtractCounter = createAction(SUBTRACT_COUNTER)();
