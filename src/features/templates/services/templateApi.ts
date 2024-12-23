import { baseApi } from "@/services/baseApi";

interface CreateTemplateBody {
  title: string;
  description: string;
  topic: TemplateTopic;
  type: "public" | "private";
  questions: {
    order: number;
    questionText: string;
    type: QuestionType;
    options: string[];
  }[];
  tags: string[];
  users: number[];
}

export const templateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTemplate: builder.mutation({
      query: (body: CreateTemplateBody) => ({
        url: "templates/create",
        method: "POST",
        body,
      }),
    }),
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
    getTemplateById: builder.query<ISingleTemplate, string | undefined>({
      query: (id) => ({
        url: `templates/${id}`,
        method: "GET",
      }),
      providesTags: ["Template"],
    }),
    likeTemplate: builder.mutation({
      query: (templateId: number) => ({
        url: `templates/like/${templateId}`,
        method: "POST",
      }),
      invalidatesTags: ["Template"],
    }),
    unlikeTemplate: builder.mutation({
      query: (templateId: number) => ({
        url: `templates/unlike/${templateId}`,
        method: "POST",
      }),
      invalidatesTags: ["Template"],
    }),
    hasUserSubmittedForm: builder.mutation({
      query: (templateId: string | undefined) => ({
        url: `forms/check/${templateId}`,
        method: "POST",
      }),
    }),
    getForms: builder.query<{ forms: IForm[], template: ISingleTemplate }, string | undefined>({
      query: (templateId) => ({
        url: `forms/${templateId}`,
        method: "GET",
      }),
    }),
    getForm: builder.query<IResponse[], { templateId: string, formId: string }>({
      query: ({ templateId, formId }) => ({
        url: `forms/${templateId}/responses/${formId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateTemplateMutation,
  useGetTopTemplatesQuery,
  useGetLatestTemplatesQuery,
  useGetTemplateByIdQuery,
  useLikeTemplateMutation,
  useUnlikeTemplateMutation,
  useHasUserSubmittedFormMutation,
  useGetFormsQuery,
  useGetFormQuery,
} = templateApi;
