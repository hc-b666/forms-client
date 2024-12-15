import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApi } from "./services/authApi";
import { templateApi } from "./services/templateApi";
import { tagApi } from "./services/tagApi";
import authReducer from "./features/authSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["authSlice"],
};

const rootReducer = combineReducers({
  authSlice: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [templateApi.reducerPath]: templateApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }).concat(
      authApi.middleware,
      templateApi.middleware,
      tagApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
