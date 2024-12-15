import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";

export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: `${BACKEND_BASE_URL}/api/v1/`,
  prepareHeaders: (headers, { getState }) => {
    const tkn = (getState() as RootState).authSlice.token;
    if (tkn) {
      headers.set("Authorization", `Bearer ${tkn}`);
    }

    return headers;
  },
});
