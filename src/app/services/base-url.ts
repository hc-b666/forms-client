import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import { logout } from "../features/authSlice";

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

export const baseQueryAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    api.dispatch(logout());

    window.alert("Your session is expired. Please log in again.");

    window.location.href = "/login";
  }

  return result;
};
