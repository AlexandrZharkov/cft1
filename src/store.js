import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import {countriesReducer} from "./Redux/Reducers/countriesReducer";
import {appReducer} from "./Redux/Reducers/appReducer";

const middleware = applyMiddleware( promise/*, logger*/, thunk);

const reducers = combineReducers({
    countries: countriesReducer,
    app: appReducer
});

const store = createStore(reducers, middleware);

export default store;