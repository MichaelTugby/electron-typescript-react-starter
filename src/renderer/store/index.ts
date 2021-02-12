import { createSelectorHook, createDispatchHook } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { ActionType } from "typesafe-actions";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import counter from "./counter/reducers";

const rootReducer = combineReducers({
  counter,
});

const composeEnhancers = composeWithDevTools({
  trace: true,
});
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

type RootState = ReturnType<typeof rootReducer>;
type RootDispatch = ActionType<typeof store.dispatch>;
export const useSelector = createSelectorHook<RootState, RootDispatch>();
export const useDispatch = createDispatchHook<RootState, RootDispatch>();
export default store;
