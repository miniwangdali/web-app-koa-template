import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { reducer as debug } from "./debug/reducer";

const middleware = [thunk];

const reducers = combineReducers({
  debug
});

export const store = createStore(
  reducers,
  undefined,
  applyMiddleware(...middleware)
);
