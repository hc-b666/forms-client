import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../types";

interface CommentsState {
  byTemplate: Record<number, Comment[]>;
}

const initialState: CommentsState = {
  byTemplate: {},
};

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<{ templateId: number, comments: Comment[] }>) => {
      const { templateId } = action.payload;
      state.byTemplate[templateId] = action.payload.comments;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      const { templateId } = action.payload;
      if (!state.byTemplate[templateId]) {
        state.byTemplate[templateId] = [];
      }

      state.byTemplate[templateId].unshift(action.payload);
    },
  },
});

export const { setComments, addComment } = commentSlice.actions;
export default commentSlice.reducer;
