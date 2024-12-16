import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryAuth } from "./base-url";

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: baseQueryAuth,
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
