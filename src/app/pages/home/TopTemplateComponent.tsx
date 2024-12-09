import { useNavigate } from "react-router-dom";

import { Button } from "@/app/components/ui/button";
import { capitalize } from "@/app/lib/capitalize";
import { formatDate } from "@/app/lib/dateUtils";
import { useLikeTemplateMutation } from "@/app/services/templateApi";
import { useToast } from "@/app/hooks/use-toast";

interface ITopTemplateComponent {
  t: ITopTemplate;
}

export function TopTemplateComponent({ t }: ITopTemplateComponent) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [likeTemplate] = useLikeTemplateMutation();

  const handleLikeTemplate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    try {
      const res = await likeTemplate(t.id).unwrap();
      toast({ description: res.message });
    } catch (err) {
      console.log(`Error in handleLikeTemplate: ${err}`);
      toast({ variant: "destructive", description: "Something went wrong in the server" });
    }
  };

  return (
    <div onClick={() => navigate(`/template/${t.id}`)} className="flex flex-col border rounded-md p-3 hover:bg-gray-50 dark:hover:bg-zinc-900 duration-300">
      <div className="flex items-center justify-between mb-3 text-sm">
        <p>{t.email}</p>
        <span>{formatDate(t.createdAt)}</span>
      </div>
      <h4 className="mb-5 text-lg font-medium">{t.title}</h4>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-5 text-sm">
          <span>Responses: {t.responses}</span>
          <span>Topic: {capitalize(t.topic)}</span>
          <div className="flex items-center gap-1">
            <p>Tags:</p>
            {t.tags.map((t: string, id) => <span key={id}>{t}</span>)}
          </div>
          <span>Likes: {t.totalLikes}</span>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleLikeTemplate}>{t.hasLiked ? "Liked" : "Like"}</Button>
          <Button>Unlike</Button>
        </div>
      </div>
    </div>
  );
}
