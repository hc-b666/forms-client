import { baseApi } from "@/services/baseApi";

export interface ResponseProps {
  templates: ProfileTemplate[];
  metadata: MetaData;
}

interface RequestProps {
  userId: string | undefined;
  page: number;
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<UserProfile, string | undefined>({
      query: (userId) => ({
        url: `user/profile/${userId}`,
        method: "GET",
      }),
    }),
    getPublicByUserId: builder.query<ResponseProps, RequestProps>({
      query: ({ userId, page }) => ({
        url: `templates/profile/${userId}?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    getPrivateTemplates: builder.query<ResponseProps, RequestProps>({
      query: ({ userId, page }) => ({
        url: `templates/profile/private/${userId}?page=${page}`,
        method: "GET",
      }),
    }),
    getFormsByUser: builder.query<FilledForm[], string | undefined>({
      query: (userId) => ({
        url: `forms/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Forms"],
    }),
    getAccessibleTemplates: builder.query<ResponseProps, RequestProps>({
      query: ({ userId, page }) => ({
        url: `templates/profile/private/templates/${userId}?page=${page}`,
        method: "GET",
      }),
    }),
    deleteTemplate: builder.mutation<{ message: string }, number>({
      query: (templateId) => ({
        url: `templates/${templateId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteForm: builder.mutation<{ message: string }, number>({
      query: (formId) => ({
        url: `forms/${formId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Forms"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetPublicByUserIdQuery,
  useGetPrivateTemplatesQuery,
  useGetFormsByUserQuery,
  useGetAccessibleTemplatesQuery,
  useDeleteTemplateMutation,
  useDeleteFormMutation,
} = profileApi;
