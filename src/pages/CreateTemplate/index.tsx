import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useToast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionsManager } from "./components/QuestionsManager";
import { Button } from "@/components/ui/button";
import { TagsComponent } from "./components/TagsComponent";
import { AddUsers } from "./components/AddUsers";
import { SelectTopic } from "./components/SelectTopic";
import { useCreateTemplateMutation } from "./services";
import { GoBack } from "@/components/common/GoBack";
import { ErrorMessage } from "../error/Error";
import { useTranslations } from "@/hooks/useTranslations";

export default function CreateTemplatePage() {
  const { t } = useTranslations();

  useEffect(() => {
    document.title = "Forms | Create Template";
  }, []);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  const { toast } = useToast();
  const navigate = useNavigate();
  const [createTemplate, { isLoading, isError, error }] = useCreateTemplateMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [type, setType] = useState<"public" | "private">("public");
  const [tags, setTags] = useState<ITag[]>([]);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: uuidv4(),
      questionText: "Question 1",
      type: "TEXT",
      order: 1,
      options: [],
    },
  ]);
  const [users, setUsers] = useState<{ id: number, email: string }[]>([]);

  const handleCreateTemplate = async () => {
    if (!title.trim()) {
      toast({ 
        variant: "destructive", 
        description: t("createtemplatepage.toast.err.title"), 
      });
      return;
    }
    if (!description.trim()) {
      toast({ 
        variant: "destructive", 
        description: t("createtemplatepage.toast.err.description"), 
      });
      return;
    }
    if (!topic) {
      toast({ 
        variant: "destructive", 
        description: t("createtemplatepage.toast.err.topic"), 
      });
      return;
    }
    if (tags.length === 0) {
      toast({ 
        variant: "destructive", 
        description: t("createtemplatepage.toast.err.tags"), 
      });
      return;
    }
    if (questions.length === 0) {
      toast({ 
        variant: "destructive", 
        description: t("createtemplatepage.toast.err.question"), 
      });
      return;
    }
    
    const data = {
      title,
      description,
      topic: topic.toUpperCase() as TemplateTopic,
      type,
      questions: questions.map(({ id, ...rest }) => ({ 
        ...rest, 
        options: rest.options.map(option => option.optionText) 
      })),
      tags: tags.map(({ tagName }) => tagName),
      users: users.map((u) => u.id),
    };

    try {
      const res = await createTemplate({ userId: parseInt(userId as string), body: data }).unwrap();
      toast({ description: res.message });
      navigate(`/profile/${userId}`);
    } catch (err) {
      const status = (err as any).status;
      const msg = (err as any).data.message;
      if (status === 400) {
        toast({ variant: "destructive", description: msg });
      }

      if (status === 403) {
        localStorage.clear();
        toast({ variant: "destructive", description: msg });
        navigate("/login");
      }
    }
  };

  const handleTopicChange = (v: string) => {
    setTopic(v);
  };

  const handleTypeChange = (v: "public" | "private") => {
    setType(v);
  };

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="container flex-grow flex flex-col items-center gap-5">
      <div className="flex items-center justify-between gap-10 w-full md:w-[720px]">
        <h1 className="lg:text-2xl font-semibold">
          {t("createtemplatepage.header")}
        </h1>
        <GoBack />
      </div>

      <div className="w-full md:w-[720px] md:p-10 flex flex-col gap-4 md:border rounded-md">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">
            {t("createtemplatepage.title")}
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder={t("createtemplatepage.title")}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">
            {t("createtemplatepage.description")}
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder={t("createtemplatepage.description")}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <SelectTopic handleTopicChange={handleTopicChange} />

        <TagsComponent tags={tags} setTags={setTags} />

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">
            {t("createtemplatepage.selecttype")}
          </h3>
          <RadioGroup onValueChange={handleTypeChange} defaultValue={type}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public">
                {t("createtemplatepage.public")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private">
                {t("createtemplatepage.private")}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {type === "private" && <AddUsers users={users} setUsers={setUsers} />}

        <QuestionsManager questions={questions} setQuestions={setQuestions}  />

        <Button disabled={isLoading} onClick={handleCreateTemplate}>
          {isLoading 
            ? t("createtemplatepage.creating") 
            : t("createtemplatepage.create")}
        </Button>
      </div>
    </div>
  );
}
