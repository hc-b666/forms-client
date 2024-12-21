import { baseApi } from "@/services/baseApi";

export const formApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFormsByUser: builder.query<IUserForm[], {}>({
      query: () => ({
        url: "forms/user",
        method: "GET",
      }),
    }),
    submitForm: builder.mutation({
      query: ({ templateId, body }) => ({
        url: `forms/submit/${templateId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Template"],
    }),
  }),
});

export const { useGetFormsByUserQuery, useSubmitFormMutation } = formApi;
