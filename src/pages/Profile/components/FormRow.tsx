import { useNavigate } from "react-router-dom";
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

export function FormRow({ form }: { form: IUserForm }) {
  const navigate = useNavigate();
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
      <TableCell>{truncateText(form.template.title, 20)}</TableCell>
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
          See more
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                response to this template.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
