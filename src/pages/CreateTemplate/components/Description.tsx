import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/hooks/useTranslations";
import { useCreateTemplate } from "../CreateTemplateProvider";

export function Description() {
  const { t } = useTranslations();
  const { setDescription } = useCreateTemplate();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="description">{t("createtemplatepage.description")}</Label>
      <Textarea
        id="description"
        name="description"
        placeholder={t("createtemplatepage.description")}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}
