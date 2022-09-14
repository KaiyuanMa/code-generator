import { combineReducers } from "redux";
import userReducer from "./userReducer";
import entriesReducer from "./entriesReducer";
import modelsReducer from "./modelsReducer";
import validationsReducer from "./validationsReducer";

const reducers = combineReducers({
  user: userReducer,
  models: modelsReducer,
  entries: entriesReducer,
  validations: validationsReducer,
});

export default reducers;
