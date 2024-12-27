import { baseApi } from "@/services/baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<IUserProfile, string | undefined>({
      query: (userId) => ({
        url: `user/profile/${userId}`,
        method: "GET",
      }),
    }),
    getPrivateTemplates: builder.query<IProfileTemplate[], void>({
      query: () => ({
        url: "templates/profile/private",
        method: "GET",
      }),
    }),
    getFormsByUser: builder.query<IUserForm[], {}>({
      query: () => ({
        url: "forms/user",
        method: "GET",
      }),
      providesTags: ["Forms"],
    }),
    getTemplatesByUserId: builder.query<IProfileTemplate[], number>({
      query: (userId) => ({
        url: `templates/profile/${userId}`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    getPrivateAccessibleTemplates: builder.query<IProfileTemplate[], void>({
      query: () => ({
        url: "templates/profile/private/templates",
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
  useGetPrivateTemplatesQuery,
  useGetFormsByUserQuery,
  useGetTemplatesByUserIdQuery,
  useGetPrivateAccessibleTemplatesQuery,
  useDeleteTemplateMutation,
  useDeleteFormMutation,
} = profileApi;
