import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import userReducer from '../reducers/userReducer';
import localeReducer from '../reducers/localeReducer';
import agencyReducer from '../reducers/agencyReducer';
import tokenReducer from '../reducers/tokenReducer';
import dataReducer from '../reducers/dataReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  userReducer,
  localeReducer,
  agencyReducer,
  tokenReducer,
  dataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export {store, persistor};
