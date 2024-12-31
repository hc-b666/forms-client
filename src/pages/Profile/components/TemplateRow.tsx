import { NavLink } from "react-router-dom";

import { TableCell, TableRow } from "@/components/ui/table";
import { capitalize } from "@/lib/utils/stringUtils";
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

interface TemplateRowProps {
  template: ProfileTemplate;
  showActions?: boolean;
}

export function TemplateRow({
  template,
  showActions,
}: TemplateRowProps) {
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
      <TableCell>{template.title}</TableCell>
      <TableCell>{template.description}</TableCell>
      <TableCell>{capitalize(template.topic)}</TableCell>
      <TableCell>
        {template.tags.map((tag) => tag.tagName).join(", ")}
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
            <Button size="sm">Edit</Button>
          </NavLink>
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
                  This action cannot be undone. This will permanently delete{" "}
                  {template.title}.
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
      )}
    </TableRow>
  );
}
