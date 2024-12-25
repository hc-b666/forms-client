import { baseApi } from "@/services/baseApi";

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopTemplates: builder.query<Template[], void>({
      query: () => ({
        url: "templates/top",
        method: "GET",
      }),
      providesTags: ["Template"],
    }),
    getLatestTemplates: builder.query<Template[], void>({
      query: () => ({
        url: "templates/latest",
        method: "GET",
      }),
      providesTags: ["Template"],
    }),
  }),
});

export const { useGetTopTemplatesQuery, useGetLatestTemplatesQuery } = homeApi;
