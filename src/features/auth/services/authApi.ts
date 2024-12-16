import { baseQuery } from "@/services/baseApi";

import { IRegisterForm } from "../components/RegisterForm";
import { ILoginForm } from "../components/LoginForm";
import { createApi } from "@reduxjs/toolkit/query/react";

interface IValidateToken {
  token: string;
  user: IUser;
}

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
    validateToken: builder.mutation({
      query: (data: IValidateToken) => ({
        url: "auth/validate-token",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useValidateTokenMutation,
} = authApi;
