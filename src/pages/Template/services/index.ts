import { baseApi } from "@/services/baseApi";

export const templateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTemplateById: builder.query<TemplateExtended, string | undefined>({
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
    submitForm: builder.mutation({
      query: ({ templateId, body }) => ({
        url: `forms/submit/${templateId}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { 
  useGetTemplateByIdQuery, 
  useHasUserSubmittedFormQuery, 
  useSubmitFormMutation 
} = templateApi;
