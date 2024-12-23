import { capitalize } from "@/lib/utils/stringUtils";

interface TemplateQuestionsProps {
  template: ISingleTemplate;
}
export function TemplateQuestions({ template }: TemplateQuestionsProps) {
  return (
    <div className="flex flex-col gap-3">
      {template.questions.map((question) => (
        <div key={question.id} className="border rounded-md p-5">
          <div className="flex items-center gap-1">
            <span>{question.order}.</span>
            <p>{question.questionText}</p>
          </div>
          <span>Question Type: {capitalize(question.type)}</span>
        </div>
      ))}
    </div>
  );
}
