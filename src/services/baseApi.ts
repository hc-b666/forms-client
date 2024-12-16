import { createApi } from "@reduxjs/toolkit/query/react";

import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "@/app/store";
import { logout } from "@/features/auth/slices/authSlice";
import { BACKEND_BASE_URL } from "@/lib/constants";

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

export const baseQueryInterceptor = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    api.dispatch(logout());

    window.alert("Your session is expired. Please log in again.");

    window.location.href = "/login";
  }

  return result;
};


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryInterceptor,
  tagTypes: ["Template"],
  endpoints: () => ({}),
});
