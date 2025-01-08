import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/baseApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, IRegisterForm>({
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
    login: builder.mutation<LoginResponse, ILoginForm>({
      query: (body) => ({
        url: `auth/login`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyMutation,
  useLoginMutation,
} = authApi;
