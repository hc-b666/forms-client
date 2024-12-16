import { Navigate, NavLink, useParams } from "react-router-dom";

import { useGetFormsQuery } from "@/features/templates/services/templateApi";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { formatDate } from "@/lib/utils/dateUtils";

export default function FormsPage() {
  const { templateId } = useParams();
  if (!templateId) {
    return <Navigate to="/error" replace />;
  }

  const { data, isLoading, isSuccess } = useGetFormsQuery(templateId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container flex-grow flex flex-col items-center">
      {isSuccess && (
        <div className="w-[720px] flex flex-col items-center gap-5">
          <h1>{data.template.title}</h1>
          {data.forms.map((form) => (
            <NavLink
              to={`/template/${templateId}/forms/${form.formId}`}
              key={form.formId}
              className="w-full border rounded py-3 px-10 cursor-pointer"
            >
              <h3>{form.email}</h3>
              <p>{formatDate(form.filledAt)}</p>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
