import { X } from "lucide-react";
import { SelectComponent } from "../../components/SelectComponent";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

const questions: string[] = ["short", "paragraph", "mcq", "checkbox"];

interface IQuestionsComponent {
  q: IQuestion;
  handleUpdateQuestion: (id: string, v: string) => void;
  handleQuestionTypeChange: (id: string, v: string) => void;
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
  return (
    <div className="w-full flex flex-col gap-5 border p-5 rounded-md">
      <div className="w-full grid grid-cols-4 gap-5">
        <Input
          onChange={(e) => handleUpdateQuestion(q.id, e.target.value)}
          defaultValue={q.question}
          className="col-span-3"
        />
        <SelectComponent
          onValueChange={(v: string) => handleQuestionTypeChange(q.id, v)}
          options={questions}
          defaultValue={q.type}
          placeholder="Question type"
          label="Type"
        />
      </div>

      {q.type === "short" && <Input placeholder="Short answer text" readOnly />}
      {q.type === "paragraph" && <Textarea placeholder="Long answer text" readOnly />}
      {(q.type === "mcq" || q.type === "checkbox") && (
        <div className="flex flex-col gap-3">
          {(q.options || []).map((option) => (
            <div key={option.id} className="flex items-center gap-3">
              <input type={q.type === "mcq" ? "radio" : "checkbox"} disabled />
              <Input
                type="text"
                defaultValue={option.value}
                onChange={(e) => handleUpdateOption(q.id, option.id, e.target.value)}
              />
              <Button onClick={() => handleDeleteOption(q.id, option.id)} variant={"secondary"}>
                <X />
              </Button>
            </div>
          ))}

          <Button onClick={() => handleAddOption(q.id)}>
            Add option
          </Button>
        </div>
      )}

      <Button onClick={() => handleDeleteQuestion(q.id)} className="w-[180px] self-end" variant={"secondary"}>
        Delete Question
      </Button>
    </div>
  );
}
