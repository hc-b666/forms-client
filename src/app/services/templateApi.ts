import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_BASE_URL } from "./base-url";

interface ICreateTemplateBody {
  title: string;
  description: string;
  createdBy: number;
  topic: string;
  type: "public" | "private";
  questions: {
    question: string;
    type: string;
    options: string[];
  }[];
  tags: string[];
}

export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_BASE_URL}/api/v1/`,
    prepareHeaders: (headers) => {
      const tkn = localStorage.getItem("token");
      if (tkn) {
        headers.set("Authorization", `Bearer ${tkn}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Template"],
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
        url: "templates/top5",
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
    }),
    getProfile: builder.query<{ templates: IProfileTemplate[], user: IUserProfile }, string | undefined>({
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
    createForm: builder.mutation({
      query: ({ templateId, body }) => ({
        url: `forms/submit/${templateId}`,
        method: "POST",
        body,
      }),
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
  useGetProfileQuery,
  useLikeTemplateMutation,
  useUnlikeTemplateMutation,
  useCreateFormMutation,
  useHasUserSubmittedFormMutation,
  useGetFormsQuery,
  useGetFormQuery,
} = templateApi;
