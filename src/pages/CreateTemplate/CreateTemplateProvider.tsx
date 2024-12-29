import { useState, createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { QuestionType, TemplateTopic } from "@/enums";

type CreateTemplateProviderState = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  topic: TemplateTopic;
  setTopic: React.Dispatch<React.SetStateAction<TemplateTopic>>;
  type: "public" | "private";
  setType: React.Dispatch<React.SetStateAction<"public" | "private">>;
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  users: { id: number; email: string }[];
  setUsers: React.Dispatch<React.SetStateAction<{ id: number; email: string }[]>>;

  formData: {
    title: string;
    description: string;
    topic: TemplateTopic;
    type: "public" | "private";
    questions: {
      order: number;
      questionText: string;
      type: QuestionType;
      options: string[];
    }[];
    tags: string[];
    users: number[];
  },
};

const initialState: CreateTemplateProviderState = {
  title: "",
  setTitle: () => null,
  description: "",
  setDescription: () => null,
  topic: TemplateTopic.OTHER,
  setTopic: () => null,
  type: "public",
  setType: () => null,
  tags: [],
  setTags: () => null,
  questions: [
    {
      id: uuidv4(),
      questionText: "Question 1",
      type: QuestionType.TEXT,
      order: 1,
      options: [],
    },
  ],
  setQuestions: () => null,
  users: [],
  setUsers: () => null,

  formData: {
    title: "",
    description: "",
    topic: TemplateTopic.OTHER,
    type: "public",
    tags: [],
    questions: [],
    users: [],
  },
};

const CreateTemplateContext =
  createContext<CreateTemplateProviderState>(initialState);

interface CreateTemplateProviderProps {
  children: React.ReactNode;
}

export function CreateTemplateProvider({
  children,
}: CreateTemplateProviderProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState<TemplateTopic>(TemplateTopic.OTHER);
  const [type, setType] = useState<"public" | "private">("public");
  const [tags, setTags] = useState<ITag[]>([]);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: uuidv4(),
      questionText: "Question 1",
      type: QuestionType.TEXT,
      order: 1,
      options: [],
    },
  ]);
  const [users, setUsers] = useState<{ id: number; email: string }[]>([]);

  const formData = {
    title,
    description,
    topic: topic.toUpperCase() as TemplateTopic,
    type,
    questions: questions.map(({ id, ...rest }) => ({
      ...rest,
      options: rest.options.map((option) => option.optionText),
    })),
    tags: tags.map(({ tagName }) => tagName),
    users: users.map((u) => u.id),
  };

  return (
    <CreateTemplateContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        topic,
        setTopic,
        type,
        setType,
        tags,
        setTags,
        questions,
        setQuestions,
        users,
        setUsers,

        formData,
      }}
    >
      {children}
    </CreateTemplateContext.Provider>
  );
}

export const useCreateTemplate = () => useContext(CreateTemplateContext);
