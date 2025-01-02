import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { BACKEND_BASE_URL } from "@/lib/constants";
import { addComment, setComments } from "../slices/commentSlice";
import { useAuth } from "@/features/auth/hooks/useAuth";

const socket = io(BACKEND_BASE_URL);

export const useComments = (templateId: number) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  useEffect(() => {
    const fetchInitialComments = async () => {
      const response = await fetch(`${BACKEND_BASE_URL}/api/v1/comments/${templateId}`);
      const comments = await response.json();
      dispatch(setComments({ templateId, comments }));
    };

    fetchInitialComments();
    socket.emit('joinTemplate', templateId);

    socket.on('commentAdded', (comment: Comment) => {
      dispatch(addComment(comment));
    });

    return () => {
      socket.off('commentAdded');
    };
  }, [templateId, dispatch]);

  const sendComment = (content: string) => {
    socket.emit('newComment', {
      templateId,
      userId: user?.id,
      content,
    });
  };

  return { sendComment };
};
