import { Navigate, useLocation, useParams } from "react-router-dom";

import { Loader } from "@/components/common/LoadingSpinner";
import { useGetFormQuery } from "./services";
import { ErrorMessage } from "../error/Error";
import { Response } from "./components/Response";
import { GoBack } from "@/components/common/GoBack";

export default function FormPage() {
  const { templateId, formId } = useParams();
  if (!templateId || !formId) {
    return <Navigate to="/error" replace />;
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title");

  const { data, isLoading, isError, isSuccess, error, refetch } =
    useGetFormQuery({
      templateId,
      formId,
    });

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="container flex-grow flex flex-col items-center gap-5">
      <div className="w-full lg:w-[720px] flex items-center justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <GoBack />
      </div>

      {isLoading && <Loader />}

      {isSuccess && (
        <div className="w-full lg:w-[720px] flex flex-col gap-5">
          {data.questions.map((question) => (
            <Response
              question={question}
              responses={data.responses}
              authorId={data.form.authorId}
              key={question.id}
              refetch={refetch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
