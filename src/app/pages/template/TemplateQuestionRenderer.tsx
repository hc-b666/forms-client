import { UseFormRegister } from "react-hook-form";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

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
    case "short":
      return (
        <Input
          {...register(`${question.id}`)}
          disabled={!user}
          placeholder="Your answer"
          required
        />
      );

    case "paragraph":
      return (
        <Textarea
          {...register(`${question.id}`)}
          disabled={!user}
          placeholder="Your answer"
          required
        />
      );

    case "mcq":
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

    case "checkbox":
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
