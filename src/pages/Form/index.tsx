import { Navigate, useParams } from "react-router-dom";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useGetFormQuery } from "@/features/templates/services/templateApi";

export default function FormPage() {
  const { templateId, formId } = useParams();
  if (!templateId || !formId) {
    return <Navigate to="/error" replace />;
  }

  const { data, isLoading, isSuccess } = useGetFormQuery({ templateId, formId });
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container flex-grow flex flex-col items-center">
      {isSuccess && (
        <div className="w-[720px] flex flex-col gap-5">
          {data.map((res) => (
            <div key={res.responseId} className="border p-5">
              {res.type === "short" && (
                <>
                  <h3>{res.question}</h3>
                  <p>{res.answer}</p>
                </>
              )}

              {res.type === "paragraph" && (
                <>
                  <h3>{res.question}</h3>
                  <p>{res.answer}</p>
                </>
              )}

              {res.type === "mcq" && (
                <>
                  <h3>{res.question}</h3>
                  <p>{res.option}</p>
                </>
              )}

              {res.type === "checkbox" && (
                <>
                  <h3>{res.question}</h3>
                  <p>{res.options.join(", ")}</p>
                </>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
