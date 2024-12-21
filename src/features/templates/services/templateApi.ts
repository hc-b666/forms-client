import { baseApi } from "@/services/baseApi";

interface ICreateTemplateBody {
  title: string;
  description: string;
  topic: TemplateTopic;
  type: "public" | "private";
  questions: {
    question: string;
    type: QuestionType;
    options: string[];
  }[];
  tags: string[];
}

export const templateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTemplate: builder.mutation({
      query: (body: ICreateTemplateBody) => ({
        url: "templates/create",
        method: "POST",
        body,
      }),
    }),
    getTopTemplates: builder.query<ITopTemplate[], void>({
      query: () => ({
        url: "templates/top",
        method: "GET",
      }),
      providesTags: ["Template"],
    }),
    getLatestTemplates: builder.query<ILatestTemplate[], void>({
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
    getTemplatesByUserId: builder.query<IProfileTemplate[], number>({
      query: (userId) => ({
        url: `templates/profile/${userId}`,
        method: "GET",
      }),
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
  useGetTemplatesByUserIdQuery,
  useLikeTemplateMutation,
  useUnlikeTemplateMutation,
  useHasUserSubmittedFormMutation,
  useGetFormsQuery,
  useGetFormQuery,
} = templateApi;
