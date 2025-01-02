import { NavLink } from "react-router-dom";

import { GoBack } from "@/components/common/GoBack";
import { CreateCommentForm } from "./CreateCommentForm";
import { formatDate } from "@/lib/utils/dateUtils";
import { useTranslations } from "@/hooks/useTranslations";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface IComments {
  templateId: number;
}

export function Comments({ templateId }: IComments) {
  const { t } = useTranslations();
  const comments = useSelector(
    (state: RootState) => state.commentSlice.byTemplate[templateId] || []
  );

  return (
    <div className="w-full lg:w-[720px] py-5 mx-auto flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">{t("comments")}</h1>
        <GoBack />
      </div>

      <CreateCommentForm templateId={templateId} />

      <div className="flex flex-col gap-3">
        {/* {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div className="flex flex-col border p-3 rounded-md" key={i}>
              <Skeleton className="w-1/2 h-5" />
              <Skeleton className="w-full h-8 mt-1" />
              <Skeleton className="w-1/4 h-4 mt-4 self-end" />
            </div>
          ))} */}
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col border p-3 rounded-md">
            <NavLink
              to={`/profile/${comment.author.id}?tab=templates`}
              className="text-zinc-800 font-semibold text-sm hover:underline"
            >
              {comment.author.email}
            </NavLink>
            <p className="text-justify mt-1 ">{comment.content}</p>
            <span className="text-xs mt-4 self-end">
              {formatDate(comment.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
