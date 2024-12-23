import { baseApi } from "@/services/baseApi";

interface GetForms {
  forms: Form[];
  template: ISingleTemplate;
}

export const formsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getForms: builder.query<GetForms, string | undefined>({
      query: (templateId) => ({
        url: `forms/${templateId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFormsQuery } = formsApi;
