import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useGetFormQuery } from "./services";
import { Button } from "@/components/ui/button";

export default function FormPage() {
  const { templateId, formId } = useParams();
  if (!templateId || !formId) {
    return <Navigate to="/error" replace />;
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title"); 

  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useGetFormQuery({
    templateId,
    formId,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container flex-grow flex flex-col gap-5">
      <div className="w-full flex items-center justify-between">
        <h1>{title}</h1>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>

      {isSuccess && (
        <div className="w-full flex flex-col gap-5">
          {data.map((res) => (
            <div key={res.responseId} className="border p-5">
              {res.type === "TEXT" && (
                <>
                  <h3>{res.questionText}</h3>
                  <p>{res.answer}</p>
                </>
              )}

              {res.type === "PARAGRAPH" && (
                <>
                  <h3>{res.questionText}</h3>
                  <p>{res.answer}</p>
                </>
              )}

              {res.type === "MCQ" && (
                <>
                  <h3>{res.questionText}</h3>
                  <p>{res.option}</p>
                </>
              )}

              {res.type === "CHECKBOX" && (
                <>
                  <h3>{res.questionText}</h3>
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
