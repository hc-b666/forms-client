import { UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ITemplateForm {
  [key: string]: any;
}

interface ITemplateQuestionRenderer {
  question: IQuestionServer;
  register: UseFormRegister<ITemplateForm>;
  user?: IUser | null;
}
export default function TemplateQuestionRenderer({ question, register, user }: ITemplateQuestionRenderer) {
  switch (question.type) {
    case "TEXT":
      return (
        <Input
          {...register(`${question.id}`)}
          disabled={!user}
          placeholder="Your answer"
          required
        />
      );

    case "PARAGRAPH":
      return (
        <Textarea
          {...register(`${question.id}`)}
          disabled={!user}
          placeholder="Your answer"
          required
        />
      );

    case "MCQ":
      return (
        <div className="flex flex-col gap-2">
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center gap-3">
              <input
                type="radio"
                value={option.option}
                {...register(`${question.id}`)}
                id={`${option.id}`}
                disabled={!user}
              />
              <Label htmlFor={`${option.id}`}>{option.option}</Label>
            </div>
          ))}
        </div>
      );

    case "CHECKBOX":
      return (
        <div className="flex flex-col gap-2">
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center gap-3">
              <input
                type="checkbox"
                value={option.option}
                {...register(`${question.id}`, { setValueAs: (v) => v || [] })}
                id={`${option.id}`}
                disabled={!user}
              />
              <Label htmlFor={`${option.id}`}>{option.option}</Label>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
