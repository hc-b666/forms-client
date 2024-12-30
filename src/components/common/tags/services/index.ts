import { baseApi } from "@/services/baseApi";

const searchTagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchTags: builder.query<Tag[], string>({
      query: (query) => ({
        url: `tags/search?query=${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchTagsQuery } = searchTagApi;
