import { baseApi } from "@/services/baseApi";

interface GetForms {
  forms: Form[];
  template: TemplateExtended;
}

interface EditTemplateDetails {
  templateId: number;
  title: string;
  description: string;
  topic: TemplateTopic;
  tags: string[];
  users: number[];
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
      query: ({ templateId, title, description, topic, tags, users }) => ({
        url: `templates/${templateId}`,
        method: "PUT",
        body: { title, description, topic, tags, users },
      }),
      invalidatesTags: ["SingleTemplate"],
    }),
  }),
});

export const { useGetFormsQuery, useEditTemplateDetailsMutation } = formsApi;
