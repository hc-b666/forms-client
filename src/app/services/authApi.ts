import { createApi } from "@reduxjs/toolkit/query/react";
import { IRegisterForm } from "../pages/register/Register";
import { ILoginForm } from "../pages/login/Login";
import { baseQuery } from "./base-url";

interface IValidateToken {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
  };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: IRegisterForm) => ({
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
