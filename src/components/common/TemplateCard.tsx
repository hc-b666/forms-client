import { useNavigate } from "react-router-dom";
import { Image, Inbox } from "lucide-react";

import { capitalize, truncateText } from "@/lib/utils/stringUtils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/dateUtils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LikeButton } from "@/features/likes/LikeButton";

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Card
      onClick={() =>
        user?.id === template.creator.id
          ? navigate(`/template/${template.id}/forms`)
          : navigate(`/template/${template.id}`)
      }
      className="hover:bg-zinc-50 duration-300 h-full flex flex-col dark:bg-zinc-900 dark:hover:bg-zinc-800 cursor-pointer"
    >
      {template.imageId ? (
        <div className="overflow-hidden rounded-xl">
          <img
            src={`https://drive.google.com/thumbnail?id=${template.imageId}`}
            alt={template.title}
            className="w-full h-[360px] md:h-[320px] xl:h-[240px] 2xl:h-[280px] hover:scale-110 duration-300 object-cover rounded-xl"
          />
        </div>
      ) : (
        <div className="w-full h-[360px] md:h-[320px] xl:h-[240px] 2xl:h-[280px] flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <Image />
        </div>
      )}

      <CardHeader>
        <CardTitle>{template.title}</CardTitle>
        <CardDescription className="text-justify">
          {truncateText(template.description, 100)}
        </CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto flex flex-col items-start gap-2">
        <div className="w-full flex items-center justify-between">
          <Badge>{capitalize(template.topic)}</Badge>
          <div className="flex items-center gap-1">
            <span className="text-xs flex items-center gap-1">
              <Inbox className="w-4 h-4" />
              {template.responses}
            </span>
            <LikeButton templateId={template.id} />
          </div>
        </div>
        <p className="self-end text-xs">{formatDate(template.createdAt)}</p>
      </CardFooter>
    </Card>
  );
}
