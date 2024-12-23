import { baseApi } from "@/services/baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    }),
    getTemplatesByUserId: builder.query<IProfileTemplate[], number>({
      query: (userId) => ({
        url: `templates/profile/${userId}`,
        method: "GET",
      }),
    }),
    getPrivateAccessibleTemplates: builder.query<IProfileTemplate[], void>({
      query: () => ({
        url: "templates/profile/private/templates",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPrivateTemplatesQuery,
  useGetFormsByUserQuery,
  useGetTemplatesByUserIdQuery,
  useGetPrivateAccessibleTemplatesQuery,
} = profileApi;
