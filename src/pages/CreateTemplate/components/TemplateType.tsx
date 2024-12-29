import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "@/hooks/useTranslations";
import { useCreateTemplate } from "../CreateTemplateProvider";

export function TemplateType() {
  const { t } = useTranslations();
  const { type, setType } = useCreateTemplate();

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold">
        {t("createtemplatepage.selecttype")}
      </h3>
      <RadioGroup
        onValueChange={(value: "public" | "private") => setType(value)}
        defaultValue={type}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="public" id="public" />
          <Label htmlFor="public">{t("createtemplatepage.public")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="private" id="private" />
          <Label htmlFor="private">{t("createtemplatepage.private")}</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
