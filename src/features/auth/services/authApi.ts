import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@/services/baseApi";
import { IRegisterForm } from "../components/RegisterForm";
import { ILoginForm } from "../components/LoginForm";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<IRegisterResponse, IRegisterForm>({
      query: (data) => ({
        url: `auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<ILoginResponse, ILoginForm>({
      query: (data) => ({
        url: `auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation<IRefreshTokenResponse, { refreshToken: string }>({
      query: (body) => ({
        url: 'auth/refresh-token',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
} = authApi;
