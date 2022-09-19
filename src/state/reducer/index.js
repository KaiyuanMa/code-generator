import { combineReducers } from "redux";
import userReducer from "./userReducer";
import modelsReducer from "./modelsReducer";
import dataSetReducer from "./dataSetReducer";
import authReducer from '../auth';

const reducers = combineReducers({
  user: userReducer,
  dataSet: dataSetReducer,
  models: modelsReducer,
  auth: authReducer
});

export default reducers;
