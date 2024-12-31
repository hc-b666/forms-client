import { NavLink, useParams } from "react-router-dom";

import { TableCell, TableRow } from "@/components/ui/table";
import { capitalize, truncateText } from "@/lib/utils/stringUtils";
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
import { useTranslations } from "@/hooks/useTranslations";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface TemplateRowProps {
  template: ProfileTemplate;
  showActions?: boolean;
}

export function TemplateRow({ template, showActions }: TemplateRowProps) {
  const { userId } = useParams();
  const { user } = useAuth();
  const { t } = useTranslations();
  const [deleteTemplate] = useDeleteTemplateMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteTemplate(template.id).unwrap();
      toast({ description: res.message });
    } catch (err: any) {
      toast({ description: err.error.message });
    }
  };

  return (
    <TableRow key={template.id}>
      <TableCell>{template.id}</TableCell>
      <TableCell>
        <NavLink to={user?.id === parseInt(userId as string) ? `/template/${template.id}/forms` : `/template/${template.id}`} className="underline">
          {truncateText(template.title, 20)}
        </NavLink>
      </TableCell>
      <TableCell>{truncateText(template.description, 60)}</TableCell>
      <TableCell>{capitalize(template.topic)}</TableCell>
      <TableCell>
        {template.tags.slice(0, 3).map((tag) => tag.tagName).join(", ")}
      </TableCell>
      <TableCell>{template.responses}</TableCell>
      <TableCell>{template.likes}</TableCell>
      <TableCell>{new Date(template.createdAt).toLocaleDateString()}</TableCell>
      {showActions && (
        <TableCell className="flex items-center gap-1">
          <NavLink
            to={
              showActions
                ? `/template/${template.id}/forms`
                : `/template/${template.id}`
            }
          >
            <Button size="sm">{t("profilepage.edit")}</Button>
          </NavLink>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                {t("profilepage.delete")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("profilepage.delete.alert.title")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("profilepage.delete.alert.description")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("profilepage.cancel")}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  {t("profilepage.delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TableCell>
      )}
    </TableRow>
  );
}
