import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import {countriesReducer} from "./Redux/Reducers/countriesReducer";

const middleware = applyMiddleware( promise, logger, thunk);

const reducers = combineReducers({
    countries: countriesReducer
});

const store = createStore(reducers, middleware);

export default store;