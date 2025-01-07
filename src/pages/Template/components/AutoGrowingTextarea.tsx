import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { type UseFormRegister } from "react-hook-form";
import { IFormBody } from "./TemplateForm";

interface AutoGrowingTextareaProps {
  question: IQuestionServer;
  register: UseFormRegister<IFormBody>;
}
export function AutoGrowingTextarea({
  question,
  register,
}: AutoGrowingTextareaProps) {
  const { user } = useAuth();
  const [val, setVal] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [val]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVal(e.target.value);
  };

  return (
    <Textarea
      {...register(`${question.id}`)}
      ref={textareaRef}
      value={val}
      onChange={handleChange}
      placeholder="Your answer"
      required
      rows={1}
      disabled={!user}
      className="overflow-hidden"
    />
  );
}
