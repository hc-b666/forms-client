import { baseApi } from "@/services/baseApi";

export const searchUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUserByEmail: builder.query<{ id: number; email: string }[], string>({
      query: (query) => ({
        url: `user/search?query=${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchUserByEmailQuery } = searchUserApi;
