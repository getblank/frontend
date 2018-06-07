import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";

import config from "./config";
import auth from "./auth";

const reducers = combineReducers({
    router,
    config,
    auth,
});

export default reducers;
