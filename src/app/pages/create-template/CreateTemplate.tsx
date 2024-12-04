import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useToast } from "@/app/hooks/use-toast";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
// import { Badge } from "@/app/components/ui/badge";
import { QuestionCard } from "@/app/pages/create-template/QuestionCard";
import { SelectComponent } from "@/app/components/SelectComponent";
import { Button } from "@/app/components/ui/button";

const topics = ["Education", "Quiz", "Other"];

export interface IQuestion {
  id: string;
  question: string;
  type: string;
  options: { 
    id: string;
    value: string;
  }[];
}

// type User = {
//   id: string;
//   email: string;
// };

export default function CreateTemplatePage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [type, setType] = useState<"public" | "private">("public");
  // const [users, setUsers] = useState<User[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      id: uuidv4(),
      question: "Question 1",
      type: "short",
      options: [],
    },
  ]);

  const handleCreateTemplate = () => {
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
    const request = {
      title,
      description,
      topic,
      createdBy: user.id,
      questions,
    };

    console.log(request);
  };

  const handleTopicChange = (v: string) => {
    setTopic(v);
  };

  const handleTypeChange = (v: "public" | "private") => {
    setType(v);
  };

  const handleAddQuestion = () => {
    setQuestions((p) => [...p, { id: uuidv4(), question: `Question ${p.length + 1}`, type: "short", options: [] }]);
  };

  const handleUpdateQuestion = (id: string, v: string) => {
    setQuestions((p) => p.map((q) => q.id === id ? { ...q, question: v } : q));
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((p) => p.filter((q) => q.id !== id));
  };

  const handleQuestionTypeChange = (id: string, v: string) => {
    setQuestions((p) => p.map((q) => q.id === id ? { ...q, type: v } : q));
  };

  const handleAddOption = (id: string) => {
    setQuestions((p) => p.map((q) => q.id === id ? { ...q, options: [...q.options, { id: uuidv4(), value: `Option ${q.options.length + 1}` }] } : q));
  };

  const handleUpdateOption = (qId: string, oId: string, v: string) => {
    setQuestions((p) => p.map((q) => q.id === qId ? { ...q, options: q.options.map((o) => o.id === oId ? { ...o, value: v } : o)  } : q));
  };

  const handleDeleteOption = (qId: string, oId: string) => {
    setQuestions((p) => p.map((q) => q.id === qId ? { ...q, options: q.options.filter((o) => o.id !== oId) } : q));
  };

  return (
    <div className="container flex-grow flex flex-col items-center gap-5">
      <h1 className="text-2xl font-semibold">
        Create your questionnaire / survey template
      </h1>

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

        {/* {type === "private" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              {users.map((u) => (
                <Badge key={u.id}>{u.email}</Badge>
              ))}
            </div>
          </div>
        )} */}

        <h2 className="font-semibold">Your questions</h2>

        <div className="flex flex-col gap-3">
          {questions.map((q) => (
            <QuestionCard 
              q={q}
              handleUpdateQuestion={handleUpdateQuestion}
              handleQuestionTypeChange={handleQuestionTypeChange}
              handleDeleteQuestion={handleDeleteQuestion}
              handleAddOption={handleAddOption}
              handleUpdateOption={handleUpdateOption}
              handleDeleteOption={handleDeleteOption}
              key={q.id}
            />
          ))}

          <Button onClick={handleAddQuestion} type="button" variant={"secondary"}>Add question</Button>
        </div>

        <Button onClick={handleCreateTemplate}>Create template</Button>
      </div>
    </div>
  );
}
