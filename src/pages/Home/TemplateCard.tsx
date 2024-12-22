import { useNavigate } from "react-router-dom";
import { Inbox } from "lucide-react";

import { capitalize, truncateText } from "@/lib/utils/stringUtils";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/dateUtils";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Card 
      onClick={() => user?.id === template.creator.id ? navigate(`/template/${template.id}/forms`) : navigate(`/template/${template.id}`)} 
      className="hover:bg-zinc-50 duration-300 flex flex-col dark:bg-zinc-900 dark:hover:bg-zinc-800 cursor-pointer"
    >
      <CardHeader>
        <CardTitle>{template.title}</CardTitle>
        <CardDescription className="text-justify">{truncateText(template.description, 100)}</CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto flex flex-col items-start gap-2">
        <div className="w-full flex items-center justify-between">
          <Badge>{capitalize(template.topic)}</Badge>
          <span className="text-xs flex items-center gap-1">
            <Inbox className="w-4 h-4" />
            {template.responses}
          </span>
        </div>
        <p className="self-end text-xs">
          {formatDate(template.createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
}
