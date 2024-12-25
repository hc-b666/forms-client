import { Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  useGetTemplateLikesQuery,
  useToggleTemplateLikeMutation,
} from "./likesApi";

interface LikeButtonProps {
  templateId: number;
}

export function LikeButton({ templateId }: LikeButtonProps) {
  const { data, isSuccess } = useGetTemplateLikesQuery(templateId, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });
  const [toggleTemplateLike] = useToggleTemplateLikeMutation();

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await toggleTemplateLike(templateId).unwrap();
      toast({ description: res.message });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button onClick={handleLike} className="text-xs flex items-center gap-1">
      {isSuccess && (
        <>
          <Heart
            className={`w-4 h-4 ${
              data.isLiked ? "fill-red-500 text-red-500" : ""
            }`}
          />
          {data.likeCount}
        </>
      )}
    </button>
  );
}
