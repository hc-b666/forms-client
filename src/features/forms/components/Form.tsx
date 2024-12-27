import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useSubmitFormMutation } from "../services/formApi";
import TemplateQuestionRenderer from "./TemplateQuestionRenderer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface IForm {
  template: ISingleTemplate;
  refetch: () => void;
}

interface IFormBody {
  [key: string]: any;
}

export function Form({ template, refetch }: IForm) {
  const { user } = useAuth();
  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const { register, handleSubmit } = useForm<IFormBody>();
  const onSubmit: SubmitHandler<IFormBody> = async (data) => {
    let isValid = true;
    const responses: {
      questionId: number;
      answer: string | number | number[];
    }[] = [];

    try {
      template?.questions.forEach((q) => {
        switch (q.type) {
          case "TEXT":
          case "PARAGRAPH":
            responses.push({
              questionId: q.id,
              answer: data[q.id],
            });
            break;

          case "MCQ":
            const selectedOption = q.options.find(
              (option) => option.option === data[q.id]
            );
            if (!selectedOption) {
              isValid = false;
              toast({
                variant: "destructive",
                description: "Please select an option",
              });
              return;
            }
            responses.push({
              questionId: q.id,
              answer: selectedOption.id,
            });
            break;

          case "CHECKBOX":
            const selectedCheckboxOptions = q.options
              .filter((option) => data[q.id]?.includes(option.option))
              .map((option) => option.id);

            if (selectedCheckboxOptions.length === 0) {
              isValid = false;
              toast({
                variant: "destructive",
                description: "Please select at least one option",
              });
              return;
            }
            responses.push({
              questionId: q.id,
              answer: selectedCheckboxOptions,
            });
            break;
        }
      });

      if (!isValid) return;

      const res = await submitForm({
        templateId: template.id,
        body: { responses },
      }).unwrap();
      toast({ description: res.message });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {template.questions.map((q) => (
        <div className="flex flex-col gap-3 py-2" key={q.id}>
          <h3>{q.questionText}</h3>

          <TemplateQuestionRenderer
            question={q}
            register={register}
            user={user}
          />
        </div>
      ))}

      {user && (
        <Button disabled={isLoading} type="submit" className="mt-5 self-end">
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      )}
    </form>
  );
}
