import { combineReducers } from "redux";

import { authReducers, updateUserReducer } from "./auth";

export const rootReducers = combineReducers({
  auth: authReducers,
  update: updateUserReducer,
});
