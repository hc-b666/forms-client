import { baseApi } from "@/services/baseApi";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string | undefined>({
      query: (templateId) => ({
        url: `comments/${templateId}`,
        method: "GET"
      }),
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation<{ message: string }, { templateId: string | undefined, content: string }>({
      query: ({ templateId, content }) => ({
        url: `comments/create/${templateId}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentsQuery } = commentApi;
