import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTranslations } from "@/hooks/useTranslations";
import { useComments } from "../hooks/useComments";

interface ICreateCommentForm {
  templateId: number;
}

interface ICommentForm {
  content: string;
}

export function CreateCommentForm({ templateId }: ICreateCommentForm) {
  const { user } = useAuth();
  const { t } = useTranslations();
  const { sendComment } = useComments(templateId);

  const { register, handleSubmit, reset } = useForm<ICommentForm>();
  const onSubmit: SubmitHandler<ICommentForm> = async (data) => {
    try {
      if (data.content.trim() === "") {
        return toast({ variant: "destructive", description: "Comment cannot be empty" });
      }

      sendComment(data.content);
      reset();
    } catch (err) {
      console.log(err);
      toast({ variant: "destructive", description: "Something went wrong" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 pb-5 border-b"
    >
      <Label htmlFor="content">{t("add-comment")}</Label>
      <div className="grid grid-cols-4 gap-3">
        <Input
          id="content"
          placeholder={t("add-comment")}
          className="col-span-3"
          {...register("content")}
          disabled={!user}
        />
        <Button
          disabled={!user}
          type="submit"
          className="col-span-1"
        >
          {t("comment")}
        </Button>
      </div>
    </form>
  );
}
