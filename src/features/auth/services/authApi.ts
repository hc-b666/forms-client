import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@/services/baseApi";
import { IRegisterForm } from "../components/RegisterForm";
import { ILoginForm } from "../components/LoginForm";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<IRegisterResponse, IRegisterForm>({
      query: (body) => ({
        url: `auth/register`,
        method: "POST",
        body,
      }),
    }),
    verify: builder.mutation<{ message: string }, string>({
      query: (token) => ({
        url: "auth/verify",
        method: "POST",
        body: { token },
      }),
    }),
    login: builder.mutation<ILoginResponse, ILoginForm>({
      query: (body) => ({
        url: `auth/login`,
        method: "POST",
        body,
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
  useVerifyMutation,
  useLoginMutation,
  useRefreshTokenMutation,
} = authApi;
