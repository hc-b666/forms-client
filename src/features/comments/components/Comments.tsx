import { GoBack } from "@/components/common/GoBack";
import { useGetCommentsQuery } from "../services";
import { CreateCommentForm } from "./CreateCommentForm";
import { Loader } from "@/components/common/LoadingSpinner";
import { formatDate } from "@/lib/utils/dateUtils";

interface IComments {
  templateId: string | undefined;
}

export function Comments({ templateId }: IComments) {
  const { data, isLoading, isSuccess } = useGetCommentsQuery(templateId);

  return (
    <div className="w-full lg:w-[720px] py-5 mx-auto flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Comments</h1>
        <GoBack />
      </div>


      <CreateCommentForm templateId={templateId} />

      <div className="flex flex-col gap-3">
        {isLoading && <Loader />}
        {isSuccess &&
          data.map((comment) => (
            <div key={comment.id} className="flex flex-col border p-3 rounded-md">
              <h6 className="text-zinc-800 font-semibold text-sm">{comment.author.email}</h6>
              <p className="text-justify mt-1 ">{comment.content}</p>
              <span className="text-xs mt-4 self-end">{formatDate(comment.createdAt)}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
