import { baseApi } from "@/services/baseApi";

export const tagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<ITag[], void>({
      query: () => ({
        url: "tags",
        method: "GET",
      }),
    }),
    searchTags: builder.query<ITag[], string>({
      query: (query) => ({
        url: `tags/search?query=${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTagsQuery, useSearchTagsQuery } = tagApi;
