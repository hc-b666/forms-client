import { Loader } from "@/components/common/LoadingSpinner";
import { useSearchTemplatesByTagQuery } from "@/features/search/services";
import { useLocation } from "react-router-dom";
import { TemplateCard } from "../../components/common/TemplateCard";
import { GoBack } from "@/components/common/GoBack";
import { ErrorMessage } from "../error/Error";

export default function TemplatesPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tagId = queryParams.get("tagId");

  const { data, isLoading, isError, isSuccess, error } =
    useSearchTemplatesByTagQuery(tagId);

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="container flex-grow flex flex-col gap-5">
      <GoBack className="self-start" />
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {data.length > 0 ? (
            data.map((template) => (
              <TemplateCard template={template} key={template.id} />
            ))
          ) : (
            <div>
              <h3 className="text-center">No templates found</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
