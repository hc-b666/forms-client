import { baseApi } from "@/services/baseApi";

export const createTemplateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTemplate: builder.mutation({
      query: ({ userId, body }: { userId: number; body: FormData }) => ({
        url: `templates/create/${userId}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateTemplateMutation } = createTemplateApi;
