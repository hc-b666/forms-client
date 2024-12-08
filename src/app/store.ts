import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { templateApi } from "./services/templateApi";
import { tagApi } from "./services/tagApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [templateApi.reducerPath]: templateApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      templateApi.middleware,
      tagApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
