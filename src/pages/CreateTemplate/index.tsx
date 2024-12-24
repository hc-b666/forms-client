import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { v4 as uuidv4 } from "uuid";

import { useToast } from "@/hooks/use-toast";

import { useCreateTemplateMutation } from "@/features/templates/services/templateApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionsManager } from "./QuestionsManager";
import { Button } from "@/components/ui/button";
import { TagsComponent } from "./TagsComponent";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth/slices/authSlice";
import { AddUsers } from "./AddUsers";
import { SelectTopic } from "./SelectTopic";

export default function CreateTemplatePage() {
  const intl = useIntl();
  const user = useSelector(selectUser);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [createTemplate, { isLoading }] = useCreateTemplateMutation();

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

  if (!user) {
    navigate("/login");
    return;
  }

  const handleCreateTemplate = async () => {
    if (!title.trim()) {
      toast({ 
        variant: "destructive", 
        description: intl.formatMessage({ id: "createtemplatepage.toast.err.title" }) 
      });
      return;
    }
    if (!description.trim()) {
      toast({ 
        variant: "destructive", 
        description: intl.formatMessage({ id: "createtemplatepage.toast.err.description" }) 
      });
      return;
    }
    if (!topic) {
      toast({ 
        variant: "destructive", 
        description: intl.formatMessage({ id: "createtemplatepage.toast.err.topic" }) 
      });
      return;
    }
    if (tags.length === 0) {
      toast({ 
        variant: "destructive", 
        description: intl.formatMessage({ id: "createtemplatepage.toast.err.tags" }) 
      });
      return;
    }
    if (questions.length === 0) {
      toast({ 
        variant: "destructive", 
        description: intl.formatMessage({ id: "createtemplatepage.toast.err.question" }) 
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
      const res = await createTemplate(data).unwrap();
      toast({ description: res.message });
      navigate(`/profile/${user.id}`);
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

  return (
    <div className="container flex-grow flex flex-col items-center gap-5">
      <div className="flex items-center justify-between gap-10 w-full md:w-[720px]">
        <h1 className="text-lg lg:text-2xl font-semibold">
          {intl.formatMessage({ id: "createtemplatepage.header" })}
        </h1>
        <Button onClick={() => navigate(-1)}>
          {intl.formatMessage({ id: "createtemplatepage.goback" })}
        </Button>
      </div>

      <div className="w-full md:w-[720px] md:p-10 flex flex-col gap-4 md:border rounded-md">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">
            {intl.formatMessage({ id: "createtemplatepage.title" })}
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder={intl.formatMessage({ id: "createtemplatepage.title" })}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">
            {intl.formatMessage({ id: "createtemplatepage.description" })}
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder={intl.formatMessage({ id: "createtemplatepage.description" })}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <SelectTopic handleTopicChange={handleTopicChange} />

        <TagsComponent tags={tags} setTags={setTags} />

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">
            {intl.formatMessage({ id: "createtemplatepage.selecttype" })}
          </h3>
          <RadioGroup onValueChange={handleTypeChange} defaultValue={type}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public">
                {intl.formatMessage({ id: "createtemplatepage.public" })}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private">
                {intl.formatMessage({ id: "createtemplatepage.private" })}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {type === "private" && <AddUsers users={users} setUsers={setUsers} />}

        <QuestionsManager questions={questions} setQuestions={setQuestions}  />

        <Button disabled={isLoading} onClick={handleCreateTemplate}>
          {isLoading 
            ? intl.formatMessage({ id: "createtemplatepage.creating" }) 
            : intl.formatMessage({ id: "createtemplatepage.create" })}
        </Button>
      </div>
    </div>
  );
}
