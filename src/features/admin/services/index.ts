import { baseApi } from "@/services/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUserAdmin[], void>({
      query: () => ({
        url: "admin/users",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUsersQuery } = adminApi;
