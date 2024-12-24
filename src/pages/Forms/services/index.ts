import { baseApi } from "@/services/baseApi";

interface GetForms {
  forms: Form[];
  template: ISingleTemplate;
}

interface EditTemplateDetails {
  templateId: number;
  title: string;
  description: string;
  topic: TemplateTopic;
  tags: string[];
}

export const formsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getForms: builder.query<GetForms, string | undefined>({
      query: (templateId) => ({
        url: `forms/${templateId}`,
        method: "GET",
      }),
      providesTags: ["SingleTemplate"],
    }),
    editTemplateDetails: builder.mutation<{ message: string }, EditTemplateDetails>({
      query: ({ templateId, title, description, topic, tags }) => ({
        url: `templates/${templateId}`,
        method: "PUT",
        body: { title, description, topic, tags },
      }),
      invalidatesTags: ["SingleTemplate"],
    }),
  }),
});

export const { useGetFormsQuery, useEditTemplateDetailsMutation } = formsApi;
