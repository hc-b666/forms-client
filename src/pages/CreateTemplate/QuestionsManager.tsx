import { useState } from "react";
import { useIntl } from "react-intl";

import { QuestionCard } from "./QuestionCard";
import { Button } from "@/components/ui/button";
import { useQuestionManager } from "./hooks/useQuestionManager";

interface QuestionsManagerProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

export function QuestionsManager({ questions, setQuestions}: QuestionsManagerProps) {
  const intl = useIntl();
  const [draggedItem, setDraggedItem] = useState<Question | null>(null);

  const { 
    addQuestion, 
    updateQuestion, 
    updateQuestionType, 
    deleteQuestion, 
    addOption, 
    updateOption, 
    deleteOption
  } = useQuestionManager({ questions, setQuestions });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, question: Question) => {
    setDraggedItem(question);
    e.currentTarget.style.opacity = "0.7";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1";
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetQuestion: Question) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetQuestion.id) return;

    const reOrderedQuestions = questions.map((question) => {
      if (question.id === draggedItem.id) {
        return { ...question, order: targetQuestion.order };
      }

      if (question.order === targetQuestion.order) {
        return { ...question, order: draggedItem.order };
      }

      return question;
    });

    setQuestions(reOrderedQuestions.sort((a, b) => a.order - b.order));
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold">
        {intl.formatMessage({ id: "createtemplatepage.questions" })}
      </h2>

      <p>
        Remember! You can not add new questions after creating template. 
        You can update existing question's text or options but not question type. 
      </p>

      {questions.sort((a, b) => a.order - b.order).map((question) => (
        <QuestionCard
          question={question}
          updateQuestion={updateQuestion}
          updateQuestionType={updateQuestionType}
          deleteQuestion={deleteQuestion}
          addOption={addOption}
          updateOption={updateOption}
          deleteOption={deleteOption}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          key={question.id}
        />
      ))}
      <Button onClick={addQuestion} type="button" variant={"secondary"}>
        {intl.formatMessage({ id: "createtemplatepage.addquestion" })}
      </Button>
    </div>
  );
}
