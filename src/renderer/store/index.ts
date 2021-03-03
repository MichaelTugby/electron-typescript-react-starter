import { createSelectorHook, createDispatchHook } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
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

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

type RootState = ReturnType<typeof rootReducer>;
type RootDispatch = ActionType<typeof store.dispatch>;
export const useSelector = createSelectorHook<RootState, RootDispatch>();
export const useDispatch = createDispatchHook<RootState, RootDispatch>();
export const persistor = persistStore(store);
export default store;
