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
      query: (data: ICreateTemplateBody) => ({
        url: "templates/create",
        method: "POST",
        body: data,
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
    getTemplateById: builder.query<ITemplate, string | undefined>({
      query: (id) => ({
        url: `templates/${id}`,
        method: "GET",
      }),
    }),
    getTemplatesForUser: builder.query<{ templates: IProfileTemplate[], user: IUserProfile }, string | undefined>({
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
  }),
});

export const {
  useCreateTemplateMutation,
  useGetTopTemplatesQuery,
  useGetLatestTemplatesQuery,
  useGetTemplateByIdQuery,
  useGetTemplatesForUserQuery,
  useLikeTemplateMutation,
  useUnlikeTemplateMutation,
} = templateApi;
