import { baseApi } from "@/services/baseApi";

export const formApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getForm: builder.query<IResponse[], { templateId: string; formId: string }>(
      {
        query: ({ templateId, formId }) => ({
          url: `forms/${templateId}/responses/${formId}`,
          method: "GET",
        }),
      }
    ),
  }),
});

export const { useGetFormQuery } = formApi;
