import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import Cookies from 'js-cookie';
import { CookieStorage } from 'redux-persist-cookie-storage';
import reducer from './Reducers.js'; // Make sure the reducer handles state updates properly

const persistConfig = {
  key: 'root',
  storage: new CookieStorage(Cookies, {
    setCookieOptions: {
      secure: true, // Use secure cookies
      sameSite: 'strict', // SameSite option for CSRF protection
    },
  }),
  whitelist: ['auth'], // Specify which state slices you want to persist
};

const rootReducer = combineReducers({ auth: reducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
