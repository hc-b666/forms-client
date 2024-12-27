import { baseApi } from "@/services/baseApi";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<ITag[], void>({
      query: () => ({
        url: "tags",
        method: "GET",
      }),
    }),
    getTemplates: builder.query({
      query: () => ({
        url: "templates",
        method: "GET",
      }),
    }),
    searchTemplates: builder.query<Template[], string>({
      query: (query) => ({
        url: `templates/search?query=${query}`,
        method: "GET",
      }),
    }),
    searchTemplatesByTag: builder.query<Template[], string | null>({
      query: (tagId) => ({
        url: `templates/search/${tagId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useGetTagsQuery,
  useGetTemplatesQuery,
  useSearchTemplatesQuery, 
  useSearchTemplatesByTagQuery 
} = searchApi;
