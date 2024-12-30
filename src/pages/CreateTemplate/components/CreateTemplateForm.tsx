import { useNavigate, useSearchParams } from "react-router-dom";

import { toast } from "@/hooks/use-toast";
import { ErrorMessage } from "@/pages/error/Error";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCreateTemplate } from "../CreateTemplateProvider";
import { useCreateTemplateMutation } from "../services";
import { templateSchema } from "../schemas/templateSchema";
import { CreateTemplateFormDesign } from "./CreateTemplateFormDesign";

export function CreateTemplateForm() {
  const { formData, file } = useCreateTemplate();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const { user } = useAuth();

  const [createTemplate, { isLoading, isError, error }] = useCreateTemplateMutation();

  const handleCreateTemplate = async () => {
    const result = templateSchema.safeParse(formData);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({ description: firstError.message, variant: "destructive" });
      return;
    }

    try {
      const reqFormData = new FormData();
      if (file) reqFormData.append("image", file);
      reqFormData.append("title", result.data.title);
      reqFormData.append("description", result.data.description);
      reqFormData.append("topic", result.data.topic);
      reqFormData.append("type", result.data.type);
      reqFormData.append("tags", JSON.stringify(result.data.tags));
      reqFormData.append("questions", JSON.stringify(result.data.questions));
      reqFormData.append("users", JSON.stringify(result.data.users));

      const res = await createTemplate({
        userId: userId ? parseInt(userId) : (user?.id as number),
        body: reqFormData,
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

  return <CreateTemplateFormDesign isLoading={isLoading} handleCreateTemplate={handleCreateTemplate} />;
}
