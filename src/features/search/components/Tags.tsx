import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTagsQuery } from "../services";
import { useNavigate } from "react-router-dom";

export function Tags() {
  const navigate = useNavigate();
  const { data, isLoading, isError, isSuccess } = useGetTagsQuery();

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-wrap gap-1">
        {isLoading && (
          <>
            {[...Array(20)].map((_, i) => (
              <Skeleton key={i} className="w-20 h-8" />
            ))}
          </>
        )}
        {isSuccess && (
          <>
            {data.map((tag) => (
              <Badge
                onClick={() => navigate(`/templates?tagId=${tag.id}`)}
                className="cursor-pointer"
                key={tag.id}
              >
                {tag.tagName}
              </Badge>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
