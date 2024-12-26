import { Question } from "./Question";

interface TemplateQuestionsProps {
  questions: IQuestionServer[];
}
export function TemplateQuestions({ questions }: TemplateQuestionsProps) {
  return (
    <div className="w-[720px] mx-auto flex flex-col gap-3">
      {questions.map((question) => (
        <Question question={question} key={question.id} />
      ))}
    </div>
  );
}
