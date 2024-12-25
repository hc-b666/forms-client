import { baseApi } from "@/services/baseApi";

export const likesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTemplateLikes: builder.query<{ isLiked: boolean, likeCount: number }, number>({
      query: (templateId) => `likes/${templateId}`,
      providesTags: (_result, _error, templateId) => [{ type: "Likes", id: templateId }],
    }),
    toggleTemplateLike: builder.mutation<{ message: string }, number>({
      query: (templateId) => ({
        url: `likes/${templateId}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, templateId) => [{ type: "Likes", id: templateId }],
      async onQueryStarted(templateId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(likesApi.util.updateQueryData("getTemplateLikes", templateId, (draft) => {
          draft.isLiked = !draft.isLiked;
          draft.likeCount += draft.isLiked ? 1 : -1;
        }));

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTemplateLikesQuery,
  useToggleTemplateLikeMutation,
} = likesApi;
