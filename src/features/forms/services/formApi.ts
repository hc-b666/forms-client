import { baseApi } from "@/services/baseApi";

export const formApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useSubmitFormMutation } = formApi;
