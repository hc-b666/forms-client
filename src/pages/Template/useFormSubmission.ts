import { SubmitHandler } from "react-hook-form";

interface ITemplateForm {
  [key: string]: any;
}
interface IUseFormSubmission {
  templateId: string | undefined;
  template: ISingleTemplate | undefined;
  createForm: any;
  toast: any;
}
export default function useFormSubmission({ templateId, template, createForm, toast }: IUseFormSubmission) {
  const onSubmit: SubmitHandler<ITemplateForm> = async (data) => {
      let isValid = true;
      const responses: { questionId: number; answer: string | number | number[] }[] = [];
  
      try {
        template?.questions.forEach(q => {
          switch (q.type) {
            case "short":
            case "paragraph":
              responses.push({ 
                questionId: q.id, 
                answer: data[q.id] 
              });
              break;
  
            case "mcq":
              const selectedOption = q.options.find(option => option.option === data[q.id]);
              if (!selectedOption) {
                isValid = false;
                toast({ variant: "destructive", description: "Please select an option" });
                return;
              }
              responses.push({ 
                questionId: q.id, 
                answer: selectedOption.id 
              });
              break;
  
            case "checkbox":
              const selectedCheckboxOptions = q.options
                .filter(option => data[q.id]?.includes(option.option))
                .map(option => option.id);
  
              if (selectedCheckboxOptions.length === 0) {
                isValid = false;
                toast({ variant: "destructive", description: "Please select at least one option" });
                return;
              }
              responses.push({ 
                questionId: q.id, 
                answer: selectedCheckboxOptions 
              });
              break;
          }
        });
  
        if (!isValid) return;
  
        const res = await createForm({ templateId, body: { responses } }).unwrap();
        toast({ description: res.message });
      } catch (err: any) {
        if (err.status === 403) {
          toast({ variant: "destructive", description: "Unauthorized. Log In" });
        }
      }
    };

  return { onSubmit };
}
