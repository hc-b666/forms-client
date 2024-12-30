import { useEffect } from "react";
import { useSearchTemplatesByTagQuery } from "@/features/search/services";
import { TemplateCard } from "../../components/common/TemplateCard";
import { GoBack } from "@/components/common/GoBack";
import { ErrorMessage } from "../error/Error";
import { Skeleton } from "@/components/ui/skeleton";

export default function TemplatesPage() {
  useEffect(() => {
    document.title = "Forms | Templates";
  }, []);

  const { data, isLoading, isError, isSuccess, error } =
    useSearchTemplatesByTagQuery(null);

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="container flex-grow flex flex-col gap-5">
      <GoBack className="self-start" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {isLoading && (
          <>
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="w-full h-[400px]" />
            ))}
          </>
        )}

        {isSuccess &&
          (data.length > 0 ? (
            data.map((template) => (
              <TemplateCard template={template} key={template.id} />
            ))
          ) : (
            <div>
              <h3 className="text-center">No templates found</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
