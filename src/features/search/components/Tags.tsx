import { Loader } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { useGetTagsQuery } from "@/features/tags/services/tagApi";
import { useNavigate } from "react-router-dom";

export function Tags() {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useGetTagsQuery();

  return (
    <div className="w-full flex justify-center">
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="w-full flex flex-wrap gap-1">
          {data.map((tag) => (
            <Badge
              onClick={() => navigate(`/templates?tagId=${tag.id}`)}
              className="cursor-pointer"
              key={tag.id}
            >
              {tag.tagName}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
