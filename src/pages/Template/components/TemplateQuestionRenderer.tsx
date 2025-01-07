import { useEffect } from "react";
import { UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { IFormBody } from "./TemplateForm";
import { AutoGrowingTextarea } from "./AutoGrowingTextarea";

interface ITemplateQuestionRenderer {
  question: IQuestionServer;
  register: UseFormRegister<IFormBody>;
}
export default function TemplateQuestionRenderer(
  props: ITemplateQuestionRenderer
) {
  const { question, register } = props;
  const { user } = useAuth();

  useEffect(() => {}, []);

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
      return <AutoGrowingTextarea {...props} />;

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
