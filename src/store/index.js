import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import history from "services/browserHistory";

import logger from "redux-logger";
import reducers from "reducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    router: {},
    config: {},
    auth: {},
};

export default () =>
    createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk, routerMiddleware(history), logger)));
