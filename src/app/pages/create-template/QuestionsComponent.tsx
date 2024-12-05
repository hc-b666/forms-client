import { v4 as uuidv4 } from "uuid";

import { QuestionComponent } from "./QuestionComponent";
import { Button } from "@/app/components/ui/button";

interface IQuestionsComponent {
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
}

export function QuestionsComponent({ questions, setQuestions }: IQuestionsComponent) {
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
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold">Your questions</h2>

      {questions.map((q) => (
        <QuestionComponent 
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
  );
}
