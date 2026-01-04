import {createStore, combineReducers, applyMiddleware} from "redux";
import jobsReducer from "../reducers/jobreducer.js";
import languageReducer from "../reducers/languageReducer.js";
import {thunk} from "redux-thunk";


const rootReducer = combineReducers({
    jobs: jobsReducer,
    language: languageReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
