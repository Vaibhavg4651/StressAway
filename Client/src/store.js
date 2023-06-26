import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from 'redux-persist';



const allreducers=combineReducers({"users":usereducers})
const persistConfig = {
  key: 'root',
  storage
}

const pers = persistReducer(persistConfig, allreducers)

export default  configureStore({
    reducer: pers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });