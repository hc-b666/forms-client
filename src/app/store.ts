import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { templateApi } from "./services/templateApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [templateApi.reducerPath]: templateApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, templateApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
