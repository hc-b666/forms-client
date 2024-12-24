import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { formatDate } from "@/lib/utils/dateUtils";
import { capitalize } from "@/lib/utils/stringUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TagsComponent } from "@/pages/CreateTemplate/TagsComponent";
import { SelectTopic } from "@/pages/CreateTemplate/SelectTopic";
import { useEditTemplateDetailsMutation } from "../services";
import { toast } from "@/hooks/use-toast";
import { ErrorMessage } from "@/pages/error/Error";

interface FormData {
  title: string;
  description: string;
  topic: TemplateTopic;
}

export function TemplateDetails({ template }: { template: ISingleTemplate }) {
  const [editMode, setEditMode] = useState(false);
  const [tags, setTags] = useState<ITag[]>(
    template.tags.map((tag) => ({
      id: uuidv4(),
      tagName: tag,
    }))
  );

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
    };

    try {
      const res = await editTemplateDetails(data).unwrap();
      toast({ description: res.message });
      setEditMode(false);
    } catch (err) {
      console.log(err);
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
          <Label htmlFor="title">Title</Label>
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
          <Label htmlFor="description">Description</Label>
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
              <SelectTopic handleTopicChange={field.onChange} />
              {errors.topic && (
                <span className="text-sm text-red-500">
                  {errors.topic.message}
                </span>
              )}
            </div>
          )}
        />

        <TagsComponent tags={tags} setTags={setTags} />

        <div className="flex gap-2 mt-2">
          <Button disabled={isLoading} type="submit">
            {isLoading ? "Saving changes" : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="flex flex-col gap-3">
      <p>Title: {template.title}</p>
      <p>Description: {template.description}</p>
      <p>Topic: {capitalize(template.topic)}</p>
      <div>Tags: {template.tags.join(", ")}</div>
      <span>Created at: {formatDate(template.createdAt)}</span>
      <Button onClick={() => setEditMode(true)} className="w-fit mt-2">
        Edit Template
      </Button>
    </div>
  );
}
