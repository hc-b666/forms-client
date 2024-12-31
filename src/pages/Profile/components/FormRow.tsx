import { Link, useNavigate } from "react-router-dom";
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
import { TableCell, TableRow } from "@/components/ui/table";
import { capitalize, truncateText } from "@/lib/utils/stringUtils";
import { useDeleteFormMutation } from "../services";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/useTranslations";

export function FormRow({ form }: { form: FilledForm }) {
  const navigate = useNavigate();
  const { t } = useTranslations();
  const [deleteForm] = useDeleteFormMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteForm(form.id).unwrap();
      toast({ description: res.message });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Link to={`/template/${form.template.id}`} className="text-blue-500">
          {truncateText(form.template.title, 20)}
        </Link>
      </TableCell>
      <TableCell>{truncateText(form.template.description, 60)}</TableCell>
      <TableCell>{capitalize(form.template.topic)}</TableCell>
      <TableCell>{form.template.tags.slice(0, 3).join(", ")}</TableCell>
      <TableCell>{new Date(form.filledAt).toLocaleDateString()}</TableCell>
      <TableCell className="flex items-center space-x-2">
        <Button
          size="sm"
          onClick={() =>
            navigate(
              `/template/${form.template.id}/forms/${form.id}?title=${form.template.title}`
            )
          }
        >
          {t("profilepage.edit")}
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              {t("profilepage.delete")}
            </Button>
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
              <AlertDialogCancel>{t("profilepage.cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                {t("profilepage.delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
