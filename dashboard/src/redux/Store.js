import {legacy_createStore,combineReducers,applyMiddleware} from 'redux';
import reducer from './Reducers.js';
import {thunk} from 'redux-thunk';
import {persistStore,persistReducer} from 'redux-persist';
import Cookies from 'js-cookie';
import { CookieStorage } from 'redux-persist-cookie-storage';

const persistConfig = {
    key: 'root',
    storage: new CookieStorage(Cookies, {
      setCookieOptions: {
        secure: true, // Use secure cookies
        sameSite: 'strict', // SameSite option for CSRF protection
      },
    }),
  };

const rootReducer = combineReducers({auth: reducer,})
const persistedReducer =persistReducer(persistConfig,rootReducer)

 const store =legacy_createStore(persistedReducer,applyMiddleware(thunk))

const persistor = persistStore(store);

export {store,persistor}