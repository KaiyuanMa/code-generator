import { combineReducers } from "redux";
import userReducer from "./userReducer";
import entriesReducer from "./entriesReducer";
import modelsReducer from "./modelsReducer";
import validationsReducer from "./validationsReducer";
import dataSetReducer from "./dataSetReducer";
import authReducer from '../auth'

const reducers = combineReducers({
  user: userReducer,
  models: modelsReducer,
  entries: entriesReducer,
  validations: validationsReducer,
  auth: authReducer,
  dataSets: dataSetReducer
});

export default reducers;
