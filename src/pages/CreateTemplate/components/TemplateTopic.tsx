import { SelectComponent } from "@/components/common/SelectComponent";
import { useTranslations } from "@/hooks/useTranslations";
import { useCreateTemplate } from "../CreateTemplateProvider";

const topics = ["EDU", "QUIZ", "OTHER"];

export function TemplateTopic() {
  const { t } = useTranslations();
  const { setTopic } = useCreateTemplate();

  return (
    <SelectComponent
      onValueChange={(v: string) => setTopic(v as TemplateTopic)}
      options={topics}
      placeholder={t("createtemplatepage.selecttopic")}
      label="Topic"
    />
  );
}
