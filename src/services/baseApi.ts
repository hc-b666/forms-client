  import { createApi } from "@reduxjs/toolkit/query/react";

  import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
  import { RootState } from "@/app/store";
  import { logout, updateAccessToken } from "@/features/auth/slices/authSlice";
  import { BACKEND_BASE_URL } from "@/lib/constants";

  export const baseQuery = fetchBaseQuery({
    baseUrl: `${BACKEND_BASE_URL}/api/v1/`,
    prepareHeaders: (headers, { getState }) => {
      const tkn = (getState() as RootState).authSlice.accessToken;
      if (tkn) {
        headers.set("Authorization", `Bearer ${tkn}`);
      }

      return headers;
    },
  });

  export const baseQueryInterceptor = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const refreshToken = (api.getState() as RootState).authSlice.refreshToken;

      if (refreshToken) {
        try {
          const refreshResult = await baseQuery({ url: "auth/refresh-token", method: "POST", body: { refreshToken } }, api, extraOptions);

          if (refreshResult.data) {
            const newAccessToken = (refreshResult.data as { accessToken: string }).accessToken;
            api.dispatch(updateAccessToken(newAccessToken));
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logout());
            window.alert("Your session is expired. Please log in again.");
            window.location.href = "/login";
          }

        } catch (err) {
          api.dispatch(logout());
          window.alert("Your session is expired. Please log in again.");
          window.location.href = "/login";
        }
      } else {
        api.dispatch(logout());
        window.alert("Your session is expired. Please log in again.");
        window.location.href = "/login";
      }
    }

    // if (result.error && result.error.status === 403) {
    //   api.dispatch(logout());

    //   window.alert("Your session is expired. Please log in again.");

    //   window.location.href = "/login";
    // }

    return result;
  };

  export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryInterceptor,
    tagTypes: ["Template"],
    endpoints: () => ({}),
  });
