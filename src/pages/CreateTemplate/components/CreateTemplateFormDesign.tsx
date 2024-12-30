import { Title } from "./Title";
import { Description } from "./Description";
import { TemplateTopic } from "./TemplateTopic";
import { TagsManager } from "@/components/common/tags";
import { TemplateType } from "./TemplateType";
import { UsersManager } from "@/components/common/users";
import { QuestionsManager } from "@/components/common/questions";
import FileUpload from "./FileUpload";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useTranslations";
import { useCreateTemplate } from "../CreateTemplateProvider";

interface CreateTemplateFormDesignProps {
  isLoading: boolean;
  handleCreateTemplate: () => Promise<void>;
}

export function CreateTemplateFormDesign({ isLoading, handleCreateTemplate }: CreateTemplateFormDesignProps) {
  const { t } = useTranslations();
  const { type, tags, setTags, users, setUsers, questions, setQuestions } = useCreateTemplate();

  return (
    <div className="w-full md:w-[720px] md:p-10 flex flex-col gap-4 md:border rounded-md">
      <Title />
      <Description />
      <TemplateTopic />
      <TagsManager tags={tags} setTags={setTags} />
      <TemplateType />
      {type === "private" && <UsersManager users={users} setUsers={setUsers} />}
      <QuestionsManager questions={questions} setQuestions={setQuestions} />
      <FileUpload />
      <Button disabled={isLoading} onClick={handleCreateTemplate}>
        {isLoading
          ? t("createtemplatepage.creating")
          : t("createtemplatepage.create")}
      </Button>
    </div>
  );
}
