import { useIntl } from "react-intl";
import { X } from "lucide-react";

import { SelectComponent } from "@/components/common/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const questions: string[] = ["TEXT", "PARAGRAPH", "MCQ", "CHECKBOX"];

interface IQuestionsComponent {
  q: IQuestion;
  handleUpdateQuestion: (id: string, v: string) => void;
  handleQuestionTypeChange: (id: string, v: QuestionType) => void;
  handleDeleteQuestion: (id: string) => void;
  handleAddOption: (id: string) => void;
  handleUpdateOption: (qId: string, oId: string, v: string) => void;
  handleDeleteOption: (qId: string, oId: string) => void;
}

export function QuestionComponent({
  q,
  handleUpdateQuestion,
  handleQuestionTypeChange,
  handleDeleteQuestion,
  handleUpdateOption,
  handleAddOption,
  handleDeleteOption,
}: IQuestionsComponent) {
  const intl = useIntl();

  return (
    <div className="w-full flex flex-col gap-5 border p-3 md:p-5 rounded-md">
      <div className="w-full grid grid-cols-4 gap-5">
        <Input
          onChange={(e) => handleUpdateQuestion(q.id, e.target.value)}
          defaultValue={q.question}
          className="col-span-4 md:col-span-3"
        />
        <SelectComponent
          onValueChange={(v: string) => handleQuestionTypeChange(q.id, v as QuestionType)}
          options={questions}
          defaultValue={q.type}
          placeholder={intl.formatMessage({ id: "createtemplatepage.questiontype" })}
          label={intl.formatMessage({ id: "createtemplatepage.type" })}
          className="col-span-4 md:col-span-1"
        />
      </div>

      {q.type === "TEXT" && (
        <Input 
          placeholder={intl.formatMessage({ id: "createtemplatepage.question.short" })} 
          readOnly 
        />
      )}

      {q.type === "PARAGRAPH" && (
        <Textarea 
          placeholder={intl.formatMessage({ id: "createtemplatepage.question.paragraph" })} 
          readOnly 
        />
      )}

      {(q.type === "MCQ" || q.type === "CHECKBOX") && (
        <div className="flex flex-col gap-3">
          {(q.options || []).map((option) => (
            <div key={option.id} className="flex items-center gap-3">
              <input type={q.type === "MCQ" ? "radio" : "checkbox"} disabled />
              <Input
                type="text"
                defaultValue={option.tagName}
                onChange={(e) => handleUpdateOption(q.id, option.id, e.target.value)}
              />
              <Button onClick={() => handleDeleteOption(q.id, option.id)} variant={"secondary"}>
                <X />
              </Button>
            </div>
          ))}

          <Button onClick={() => handleAddOption(q.id)}>
            {intl.formatMessage({ id: "createtemplatepage.addoption" })}
          </Button>
        </div>
      )}

      <Button onClick={() => handleDeleteQuestion(q.id)} className="w-[180px] self-end" variant={"secondary"}>
        {intl.formatMessage({ id: "createtemplatepage.deletequestion" })}
      </Button>
    </div>
  );
}
