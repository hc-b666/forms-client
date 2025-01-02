import { baseApi } from "@/services/baseApi";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], number>({
      query: (templateId) => ({
        url: `comments/${templateId}`,
        method: "GET"
      }),
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation<{ message: string }, { templateId: number, content: string }>({
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
