import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducer";

const store = createStore(reducers, {}, applyMiddleware(thunk, logger));

export default store;
