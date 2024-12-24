import { useIntl } from "react-intl";
import { useGetCommentsQuery } from "../services";
import { CreateCommentForm } from "./CreateCommentForm";
import { Loader } from "@/components/common/LoadingSpinner";

interface IComments {
  templateId: string | undefined;
}

export function Comments({ templateId }: IComments) {
  const intl = useIntl();
  const { data, isLoading, isSuccess } = useGetCommentsQuery(templateId);

  return (
    <div className="w-full py-5 flex flex-col gap-5">
      <h1 className="text-2xl">Comments</h1>

      <CreateCommentForm templateId={templateId} />

      <div className="flex flex-col gap-3">
        {isLoading && <Loader />}
        {isSuccess &&
          data.map((comment) => (
            <div key={comment.id} className="border p-3">
              <h1>{comment.author.email}</h1>
              <p>{comment.content}</p>
              <p>{intl.formatDate(comment.createdAt)}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
