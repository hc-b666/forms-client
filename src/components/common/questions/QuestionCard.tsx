import { X } from "lucide-react";

import { SelectComponent } from "@/components/common/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/hooks/useTranslations";

const questions: string[] = ["TEXT", "PARAGRAPH", "MCQ", "CHECKBOX"];

interface QuestionCardProps {
  question: Question;
  updateQuestion: (questionId: string, newQuestionText: string) => void;
  updateQuestionType: (
    questionId: string,
    newQuestionType: QuestionType
  ) => void;
  deleteQuestion: (questionId: string) => void;
  addOption: (questionId: string) => void;
  updateOption: (
    questionId: string,
    optionId: string,
    newOptionText: string
  ) => void;
  deleteOption: (questionId: string, optionId: string) => void;
}

export function QuestionCard({
  question,
  updateQuestion,
  updateQuestionType,
  deleteQuestion,
  updateOption,
  addOption,
  deleteOption,
}: QuestionCardProps) {
  const { t } = useTranslations();

  return (
    <div className="w-full flex flex-col gap-5 border p-3 md:p-5 rounded-md hover:cursor-grab">
      <div className="w-full grid grid-cols-4 gap-5">
        <Input
          onChange={(e) => updateQuestion(question.id, e.target.value)}
          defaultValue={question.questionText}
          className="col-span-4 md:col-span-3"
        />
        <SelectComponent
          onValueChange={(v: string) =>
            updateQuestionType(question.id, v as QuestionType)
          }
          options={questions}
          defaultValue={question.type}
          placeholder={t("createtemplatepage.questiontype")}
          label={t("createtemplatepage.type")}
          className="col-span-4 md:col-span-1"
        />
      </div>

      {question.type === "TEXT" && (
        <Input placeholder={t("createtemplatepage.question.short")} readOnly />
      )}

      {question.type === "PARAGRAPH" && (
        <Textarea
          placeholder={t("createtemplatepage.question.paragraph")}
          readOnly
        />
      )}

      {(question.type === "MCQ" || question.type === "CHECKBOX") && (
        <div className="flex flex-col gap-3">
          {(question.options || []).map((option) => (
            <div key={option.id} className="flex items-center gap-3">
              <input
                type={question.type === "MCQ" ? "radio" : "checkbox"}
                disabled
              />
              <Input
                type="text"
                defaultValue={option.optionText}
                onChange={(e) =>
                  updateOption(question.id, option.id, e.target.value)
                }
              />
              <Button
                onClick={() => deleteOption(question.id, option.id)}
                variant={"secondary"}
              >
                <X />
              </Button>
            </div>
          ))}

          <Button onClick={() => addOption(question.id)}>
            {t("createtemplatepage.addoption")}
          </Button>
        </div>
      )}

      <Button
        onClick={() => deleteQuestion(question.id)}
        className="w-[180px] self-end"
        variant={"secondary"}
      >
        {t("createtemplatepage.deletequestion")}
      </Button>
    </div>
  );
}
