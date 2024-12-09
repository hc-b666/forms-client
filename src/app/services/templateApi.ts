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
  endpoints: (builder) => ({
    createTemplate: builder.mutation({
      query: (data: ICreateTemplateBody) => ({
        url: "templates/create",
        method: "POST",
        body: data,
      }),
    }),
    getTop5Templates: builder.query<ITopTemplate[], void>({
      query: () => ({
        url: "templates/top5",
        method: "GET",
      }),
    }),
    getLatestTemplates: builder.query<ILatestTemplate[], void>({
      query: () => ({
        url: "templates/latest",
        method: "GET",
      }),
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
  }),
});

export const {
  useCreateTemplateMutation,
  useGetTop5TemplatesQuery,
  useGetLatestTemplatesQuery,
  useGetTemplateByIdQuery,
  useGetTemplatesForUserQuery,
} = templateApi;
