import * as counterActions from "~/renderer/store/counter/actions";
import { ActionType, createReducer } from "typesafe-actions";

type CounterActions = ActionType<typeof counterActions>;
const counterReducer = createReducer<number, CounterActions>(1)
  .handleAction(counterActions.addCounter, (state) => state + 1)
  .handleAction(counterActions.subtractCounter, (state) => {
    const subtractedNum = state - 1;
    return subtractedNum > 0 ? subtractedNum : 1;
  });

export default counterReducer;
