import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ErrorMessage } from "@/pages/error/Error";
import { useTranslations } from "@/hooks/useTranslations";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCreateTemplate } from "../CreateTemplateProvider";
import { useCreateTemplateMutation } from "../services";
import { templateSchema } from "../schemas/templateSchema";
import { Title } from "./Title";
import { AddUsers } from "./AddUsers";
import { Description } from "./Description";
import { TemplateTopic } from "./TemplateTopic";
import { TemplateType } from "./TemplateType";
import { QuestionsManager } from "./QuestionsManager";
import { TagsComponent } from "./TagsComponent";

export function CreateTemplateForm() {
  const { type, formData } = useCreateTemplate();
  const navigate = useNavigate();
  const { t } = useTranslations();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const { user } = useAuth();

  const [createTemplate, { isLoading, isError, error }] =
    useCreateTemplateMutation();

  const handleCreateTemplate = async () => {
    const result = templateSchema.safeParse(formData);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({ description: firstError.message, variant: "destructive" });
      return;
    }

    try {
      const res = await createTemplate({
        userId: userId ? parseInt(userId) : (user?.id as number),
        body: result.data,
      }).unwrap();
      toast({ description: res.message });
      navigate(`/profile/${userId ? userId : user?.id}`);
    } catch (err) {
      const status = (err as any).status;
      const msg = (err as any).data.message;
      if (status === 400) {
        toast({ variant: "destructive", description: msg });
      }
    }
  };

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="w-full md:w-[720px] md:p-10 flex flex-col gap-4 md:border rounded-md">
      <Title />

      <Description />

      <TemplateTopic />

      <TagsComponent />

      <TemplateType />

      {type === "private" && <AddUsers />}

      <QuestionsManager />

      <Button disabled={isLoading} onClick={handleCreateTemplate}>
        {isLoading
          ? t("createtemplatepage.creating")
          : t("createtemplatepage.create")}
      </Button>
    </div>
  );
}
