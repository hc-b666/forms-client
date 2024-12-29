import { Navigate, useParams, useSearchParams } from "react-router-dom";

import { Loader } from "@/components/common/LoadingSpinner";
import { useGetFormQuery } from "./services";
import { ErrorMessage } from "../error/Error";
import { Response } from "./components/Response";
import { GoBack } from "@/components/common/GoBack";
import { useEffect } from "react";

export default function FormPage() {
  const { templateId, formId } = useParams();
  if (!templateId || !formId) {
    return <Navigate to="/error" replace />;
  }

  const [searchParams] = useSearchParams();

  const title = searchParams.get("title");

  const { data, isLoading, isError, isSuccess, error, refetch } =
    useGetFormQuery({
      templateId,
      formId,
    });

  useEffect(() => {
    document.title = `Forms | ${title}`; 
  }, []);

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
