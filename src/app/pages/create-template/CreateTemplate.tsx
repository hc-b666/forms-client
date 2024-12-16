import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useToast } from "@/app/hooks/use-toast";

import { useCreateTemplateMutation } from "@/app/services/templateApi";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { SelectComponent } from "@/app/components/SelectComponent";
import { QuestionsComponent } from "./QuestionsComponent";
import { Button } from "@/app/components/ui/button";
import { TagsComponent } from "./TagsComponent";

const topics = ["Edu", "Quiz", "Other"];

export default function CreateTemplatePage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [createTemplate] = useCreateTemplateMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [type, setType] = useState<"public" | "private">("public");
  const [tags, setTags] = useState<ITag[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      id: uuidv4(),
      question: "Question 1",
      type: "short",
      options: [],
    },
  ]);

  const handleCreateTemplate = async () => {
    if (!title.trim()) {
      toast({ variant: "destructive", description: "There has to be 'Title' in the template" });
      return;
    }
    if (!description.trim()) {
      toast({ variant: "destructive", description: "There has to be 'Description' in the template" });
      return;
    }
    if (!topic) {
      toast({ variant: "destructive", description: "There has to be 'Topic' in the template" });
      return;
    }
    if (tags.length === 0) {
      toast({ variant: "destructive", description: "There has to be at least one tag" });
      return;
    }
    if (questions.length === 0) {
      toast({ variant: "destructive", description: "There has to be at least one question in the template" });
      return;
    }
    
    const u = localStorage.getItem("user");
    if (!u) {
      toast({ variant: "destructive", description: "Unauthorized" });
      localStorage.clear();
      navigate("/login");
      return;
    }

    const user: IUser = JSON.parse(u);
    const data = {
      title,
      description,
      createdBy: user.id,
      topic: topic.toLowerCase(),
      type,
      questions: questions.map(({ id, ...rest }) => ({ ...rest, options: rest.options.map(o => o.value) })),
      tags: tags.map(({ tagName }) => tagName),
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
      <div className="flex items-center justify-between w-[720px]">
        <h1 className="text-2xl font-semibold">
          Create your questionnaire or survey template
        </h1>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>

      <div className="w-[720px] p-10 flex flex-col gap-4 border rounded-md">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <SelectComponent
          onValueChange={handleTopicChange}
          options={topics}
          placeholder="Select topic"
          label="Topic"
        />

        <TagsComponent tags={tags} setTags={setTags} />

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">
            Select the type of your template
          </h3>
          <RadioGroup onValueChange={handleTypeChange} defaultValue={type}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public">Public</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private">Private</Label>
            </div>
          </RadioGroup>
        </div>

        <QuestionsComponent questions={questions} setQuestions={setQuestions}  />

        <Button onClick={handleCreateTemplate}>Create template</Button>
      </div>
    </div>
  );
}
