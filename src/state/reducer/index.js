import { combineReducers } from "redux";
import userReducer from "./userReducer";
import modelsReducer from "./modelsReducer";
import dataSetReducer from "./dataSetReducer";

const reducers = combineReducers({
  user: userReducer,
  dataSet: dataSetReducer,
  models: modelsReducer,
});

export default reducers;
