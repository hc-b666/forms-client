import { baseApi } from "@/services/baseApi";

export const templateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTemplateById: builder.query<ISingleTemplate, string | undefined>({
      query: (id) => ({
        url: `templates/${id}`,
        method: "GET",
      }),
    }),
    hasUserSubmittedForm: builder.query<{ hasSubmitted: boolean }, string | undefined>({
      query: (templateId) => ({
        url: `forms/check/${templateId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTemplateByIdQuery, useHasUserSubmittedFormQuery } =
  templateApi;
