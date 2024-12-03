import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRegisterForm } from "../pages/register/Register";
import { ILoginForm } from "../pages/login/Login";

export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL; 

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_BASE_URL}/api/v1/` }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: IRegisterForm) => ({
        url: `auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data: ILoginForm) => ({
        url: `auth/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
