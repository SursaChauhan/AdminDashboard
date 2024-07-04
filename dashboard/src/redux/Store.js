import {legacy_createStore,combineReducers,applyMiddleware} from 'redux';
import reducer from './Reducers.js';
import {thunk} from 'redux-thunk';

// let middleware =[thunk];
const rootReducer = combineReducers({reducer})
export const store =legacy_createStore(rootReducer,applyMiddleware(thunk))