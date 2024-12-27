import { SelectComponent } from "@/components/common/SelectComponent";
import { useTranslations } from "@/hooks/useTranslations";

const topics = ["EDU", "QUIZ", "OTHER"];

export function SelectTopic({
  handleTopicChange,
}: {
  handleTopicChange: (v: string) => void;
}) {
  const { t } = useTranslations();

  return (
    <SelectComponent
      onValueChange={handleTopicChange}
      options={topics}
      placeholder={t("createtemplatepage.selecttopic")}
      label="Topic"
    />
  );
}
