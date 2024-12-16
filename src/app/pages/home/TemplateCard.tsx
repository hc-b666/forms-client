import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";

import { capitalize, truncateText } from "@/app/lib/stringUtils";
// import { Button } from "@/app/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
// import { useLikeTemplateMutation } from "@/app/services/templateApi";
// import { useToast } from "@/app/hooks/use-toast";
import { Inbox } from "lucide-react";

type TemplateType = ILatestTemplate | ITopTemplate;

function isTopTemplate(template: TemplateType): template is ITopTemplate {
  return (template as ITopTemplate).responses !== undefined;
}

interface TemplateCardProps {
  t: TemplateType;
}

export function TemplateCard({ t }: TemplateCardProps) {
  const intl = useIntl();
  const navigate = useNavigate();
  // const { toast } = useToast();
  // const [likeTemplate] = useLikeTemplateMutation();

  // const handleLikeTemplate = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
    
  //   try {
  //     const res = await likeTemplate(t.id).unwrap();
  //     toast({ description: res.message });
  //   } catch (err) {
  //     console.log(`Error in handleLikeTemplate: ${err}`);
  //     toast({ variant: "destructive", description: "Something went wrong in the server" });
  //   }
  // };

  return (
    <Card onClick={() => navigate(`/template/${t.id}`)} className="hover:bg-zinc-50 duration-300 flex flex-col dark:bg-zinc-900 dark:hover:bg-zinc-800 cursor-pointer">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{truncateText(t.description, 100)}</CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto flex flex-col items-start gap-2">
        <div className="w-full flex items-center justify-between">
          <Badge>{capitalize(t.topic)}</Badge>
          
          {isTopTemplate(t) && (
            <span className="text-xs flex items-center gap-1">
              <Inbox className="w-4 h-4" />
              {t.responses}
            </span>
          )}
        </div>
        <p className="self-end text-xs">
          {intl.formatDate(t.createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
}