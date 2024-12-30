import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { formatDate } from "@/lib/utils/dateUtils";
import { capitalize } from "@/lib/utils/stringUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TemplateTopic } from "./TemplateTopic";
import { useEditTemplateDetailsMutation } from "../services";
import { toast } from "@/hooks/use-toast";
import { ErrorMessage } from "@/pages/error/Error";
import { useTranslations } from "@/hooks/useTranslations";
import { TagsManager } from "./TagsManager";
import { UsersManager } from "./UsersManager";

interface FormData {
  title: string;
  description: string;
  topic: TemplateTopic;
}

interface TemplateDetailsProps {
  template: ISingleTemplate;
  refetch: () => void;
}

export function TemplateDetails({ template, refetch }: TemplateDetailsProps) {
  const { t } = useTranslations();
  const [editMode, setEditMode] = useState(false);
  const [tags, setTags] = useState<ITag[]>(
    template.tags.map((tag) => ({
      id: uuidv4(),
      tagName: tag,
    }))
  );
  const [users, setUsers] = useState(template.accessControls);

  const [editTemplateDetails, { isLoading, isError, error }] =
    useEditTemplateDetailsMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: template.title,
      description: template.description,
      topic: template.topic,
    },
  });

  const onSubmit = async (formData: FormData) => {
    const data = {
      templateId: template.id,
      title: formData.title,
      description: formData.description,
      topic: formData.topic,
      tags: tags.map((tag) => tag.tagName),
      accessControls: users.map((user) => user.id),
    };

    try {
      const res = await editTemplateDetails(data).unwrap();
      toast({ description: res.message });
      setEditMode(false);
      refetch();
    } catch (err) {
      console.log(err);
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    reset();
    setTags(
      template.tags.map((tag) => ({
        id: uuidv4(),
        tagName: tag,
      }))
    );
    setEditMode(false);
  };

  if (editMode) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="title">{t("formspage.title")}</Label>
          <Input
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full"
          />
          {errors.title && (
            <span className="text-sm text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div>
          <Label htmlFor="description">{t("formspage.description")}</Label>
          <Textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full"
          />
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        <Controller
          name="topic"
          control={control}
          rules={{ required: "Topic is required" }}
          render={({ field }) => (
            <div>
              <TemplateTopic handleTopicChange={field.onChange} />
              {errors.topic && (
                <span className="text-sm text-red-500">
                  {errors.topic.message}
                </span>
              )}
            </div>
          )}
        />

        <TagsManager tags={tags} setTags={setTags} />

        <UsersManager users={users} setUsers={setUsers} />

        <div className="flex gap-2 mt-2">
          <Button disabled={isLoading} type="submit">
            {isLoading ? t("formspage.saving") : t("formspage.save")}
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            {t("formspage.cancel")}
          </Button>
        </div>
      </form>
    );
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="w-full lg:w-[720px] flex flex-col gap-3">
      <p>
        {t("formspage.title")}: {template.title}
      </p>
      <p>
        {t("formspage.description")}: {template.description}
      </p>
      <p>
        {t("formspage.topic")}: {capitalize(template.topic)}
      </p>
      <div>
        {t("formspage.tags")}: {template.tags.join(", ")}
      </div>
      <span>
        {t("formspage.created-at")}: {formatDate(template.createdAt)}
      </span>
      {!template.isPublic && (
        <div>
          <h4>People who can access</h4>
          {template.accessControls.length > 0 ? (
            <ul className="list-disc pl-5">
              {template.accessControls.map((control) => (
                <li key={control.id}>{control.email}</li>
              ))}
            </ul>
          ) : (
            <div>
              <p>There is no users who can access to your template</p>
            </div>
          )}
        </div>
      )}
      <Button onClick={() => setEditMode(true)} className="w-fit mt-2">
        {t("formspage.edit")}
      </Button>
    </div>
  );
}
