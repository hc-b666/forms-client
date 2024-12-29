import { NavLink } from "react-router-dom";

import { capitalize } from "@/lib/utils/stringUtils";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteTemplateMutation } from "../services";
import { toast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils/dateUtils";
import { useTranslations } from "@/hooks/useTranslations";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface ITemplateComponent {
  template: IProfileTemplate;
  userId?: number;
}

export function TemplateComponent({ template, userId }: ITemplateComponent) {
  const { t } = useTranslations();
  const { user } = useAuth();

  const [deleteTemplate, { isLoading }] = useDeleteTemplateMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteTemplate(template.id).unwrap();
      toast({ description: res.message });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="flex flex-col border rounded-md p-3">
      <div className="flex items-center justify-between mb-3 text-sm">
        <NavLink
          to={
            user?.role === "ADMIN" || user?.id === userId
              ? `/template/${template.id}/forms`
              : `/template/${template.id}`
          }
          className="font-medium hover:underline"
        >
          {template.title}
        </NavLink>
        <span>{formatDate(template.createdAt)}</span>
      </div>

      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-5 text-sm">
          <span>
            {t("profilepage.responses")}: {template.responses}
          </span>
          <span>
            {t("profilepage.topic")}: {capitalize(template.topic)}
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            <p>{t("profilepage.tags")}:</p>
            {template.tags.map((t: string) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
        {(user?.id === userId || user?.role === "ADMIN") && (
          <div className="flex self-end items-center gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>{t("profilepage.delete")}</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {t("profilepage.delete.alert.title")}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("profilepage.delete.alert.description")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    {t("profilepage.cancel")}
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    {t("profilepage.delete")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </Card>
  );
}
