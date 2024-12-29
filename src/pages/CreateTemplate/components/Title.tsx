import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "@/hooks/useTranslations";
import { useCreateTemplate } from "../CreateTemplateProvider";

export function Title() {
  const { t } = useTranslations();
  const { setTitle } = useCreateTemplate();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="title">{t("createtemplatepage.title")}</Label>
      <Input
        id="title"
        name="title"
        type="text"
        placeholder={t("createtemplatepage.title")}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}
