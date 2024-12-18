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
              {res.type === "TEXT" && (
                <>
                  <h3>{res.question}</h3>
                  <p>{res.answer}</p>
                </>
              )}

              {res.type === "PARAGRAPH" && (
                <>
                  <h3>{res.question}</h3>
                  <p>{res.answer}</p>
                </>
              )}

              {res.type === "MCQ" && (
                <>
                  <h3>{res.question}</h3>
                  <p>{res.option}</p>
                </>
              )}

              {res.type === "CHECKBOX" && (
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
