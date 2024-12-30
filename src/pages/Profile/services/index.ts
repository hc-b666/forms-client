import { baseApi } from "@/services/baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<UserProfile, string | undefined>({
      query: (userId) => ({
        url: `user/profile/${userId}`,
        method: "GET",
      }),
    }),
    getTemplatesByUserId: builder.query<ProfileTemplate[], string | undefined>({
      query: (userId) => ({
        url: `templates/profile/${userId}`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    getPrivateTemplates: builder.query<ProfileTemplate[], string | undefined>({
      query: (userId) => ({
        url: `templates/profile/private/${userId}`,
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
    getAccessibleTemplates: builder.query<ProfileTemplate[], string | undefined>({
      query: (userId) => ({
        url: `templates/profile/private/templates/${userId}`,
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
  useGetTemplatesByUserIdQuery,
  useGetPrivateTemplatesQuery,
  useGetFormsByUserQuery,
  useGetAccessibleTemplatesQuery,
  useDeleteTemplateMutation,
  useDeleteFormMutation,
} = profileApi;
