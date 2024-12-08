import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_BASE_URL } from "./base-url";

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_BASE_URL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    getTags: builder.query<ITagServer[], void>({
      query: () => ({
        url: "tags",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTagsQuery } = tagApi;
