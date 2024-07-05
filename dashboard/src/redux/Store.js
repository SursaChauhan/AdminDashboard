import {legacy_createStore,combineReducers,applyMiddleware} from 'redux';
import reducer from './Reducers.js';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({auth: reducer,})
export const store =legacy_createStore(rootReducer,applyMiddleware(thunk))