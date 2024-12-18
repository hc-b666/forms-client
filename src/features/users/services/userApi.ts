import { baseApi } from "@/services/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<IUserProfile, string | undefined>({
      query: (userId) => ({
        url: `user/profile/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;
