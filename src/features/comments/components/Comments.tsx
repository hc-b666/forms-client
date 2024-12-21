import { useIntl } from "react-intl";
import { MoonLoader } from "react-spinners";
import { useGetCommentsQuery } from "../services";
import { CreateCommentForm } from "./CreateCommentForm";

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
        {isLoading && (
          <div className="h-40 flex items-center justify-center">
            <MoonLoader color="black" />
          </div>
        )}
        {isSuccess &&
          data.map((comment) => (
            <div key={comment.id} className="border p-3">
              <h1>{comment.user.email}</h1>
              <p>{comment.content}</p>
              <p>{intl.formatDate(comment.createdAt)}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
