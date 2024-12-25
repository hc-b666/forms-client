import { Loader } from "@/components/common/LoadingSpinner";
import { useSearchTemplatesByTagQuery } from "@/features/search/services";
import { useLocation, useNavigate } from "react-router-dom";
import { TemplateCard } from "../../components/common/TemplateCard";
import { Button } from "@/components/ui/button";

export default function TemplatesPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tagId = queryParams.get("tagId");
  const navigate = useNavigate();

  const { data, isLoading, isSuccess } = useSearchTemplatesByTagQuery(tagId);

  return (
    <div className="container flex-grow flex flex-col gap-5">
      <Button onClick={() => navigate(-1)} className="self-start">
        Go Back
      </Button>
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {data.map((template) => (
            <TemplateCard template={template} key={template.id} />
          ))}
        </div>
      )}
    </div>
  );
}
