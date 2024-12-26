import { NavLink } from "react-router-dom";
import { useIntl } from "react-intl";

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

interface ITemplateComponent {
  t: IProfileTemplate;
  isAuthor?: boolean;
}

export function TemplateComponent({ t, isAuthor }: ITemplateComponent) {
  const intl = useIntl();

  const [deleteTemplate, { isLoading }] = useDeleteTemplateMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteTemplate(t.id).unwrap();
      toast({ description: res.message });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="flex flex-col border rounded-md p-3">
      <div className="flex items-center justify-between mb-3 text-sm">
        <NavLink
          to={isAuthor ? `/template/${t.id}/forms` : `/template/${t.id}`}
          className="font-medium hover:underline"
        >
          {t.title}
        </NavLink>
        <span>{intl.formatDate(t.createdAt)}</span>
      </div>

      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-5 text-sm">
          <span>Responses: {t.responses}</span>
          <span>Topic: {capitalize(t.topic)}</span>
          <div className="flex items-center gap-1 flex-wrap">
            <p>Tags:</p>
            {t.tags.map((t: string) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
        {isAuthor && (
          <div className="flex self-end items-center gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your template and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    Delete
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
