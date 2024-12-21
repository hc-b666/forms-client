import { useIntl } from "react-intl";

import { QuestionCard } from "./QuestionCard";
import { Button } from "@/components/ui/button";
import { useQuestionManager } from "./hooks/useQuestionManager";

interface QuestionsManagerProps {
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
}

export function QuestionsManager({ questions, setQuestions}: QuestionsManagerProps) {
  const intl = useIntl();
  const { 
    addQuestion, 
    updateQuestion, 
    updateQuestionType, 
    deleteQuestion, 
    addOption, 
    updateOption, 
    deleteOption
  } = useQuestionManager({ setQuestions });

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold">
        {intl.formatMessage({ id: "createtemplatepage.questions" })}
      </h2>

      {questions.map((question) => (
        <QuestionCard
          question={question}
          updateQuestion={updateQuestion}
          updateQuestionType={updateQuestionType}
          deleteQuestion={deleteQuestion}
          addOption={addOption}
          updateOption={updateOption}
          deleteOption={deleteOption}
          key={question.id}
        />
      ))}
      <Button onClick={addQuestion} type="button" variant={"secondary"}>
        {intl.formatMessage({ id: "createtemplatepage.addquestion" })}
      </Button>
    </div>
  );
}
