import { BaseQueryApi, createApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base-url";
import { logout } from "../features/authSlice";

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

const baseQueryAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    api.dispatch(logout());

    window.alert("Your session is expired. Please log in again.");

    window.location.href = "/login";
  }

  return result;
};

export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: baseQueryAuth,
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
