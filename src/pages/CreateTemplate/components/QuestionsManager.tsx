import { useState } from "react";

import { QuestionCard } from "./QuestionCard";
import { Button } from "@/components/ui/button";
import { useQuestionManager } from "../hooks/useQuestionManager";
import { useTranslations } from "@/hooks/useTranslations";
import { useCreateTemplate } from "../CreateTemplateProvider";

export function QuestionsManager() {
  const { t } = useTranslations();
  const [draggedItem, setDraggedItem] = useState<Question | null>(null);

  const { questions, setQuestions } = useCreateTemplate();

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
        {t("createtemplatepage.questions")}
      </h2>

      <p className="text-justify">
        {t("createtemplatepage.questions.reminder")}
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
        {t("createtemplatepage.addquestion")}
      </Button>
    </div>
  );
}
