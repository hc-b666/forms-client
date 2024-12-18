import { baseApi } from "@/services/baseApi";

export const formApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFormsByUser: builder.query<IUserForm[], {}>({
      query: () => ({
        url: "forms/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFormsByUserQuery } = formApi;
