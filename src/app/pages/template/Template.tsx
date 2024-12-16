import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { useCreateFormMutation, useGetTemplateByIdQuery, useHasUserSubmittedFormMutation } from "@/app/services/templateApi";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/hooks/use-toast";
import TemplateHeaderComponent from "./TemplateHeaderComponent";
import TemplateQuestionRenderer from "./TemplateQuestionRenderer";
import useFormSubmission from "./useFormSubmission";
import { selectUser } from "@/app/features/authSlice";
import { ErrorPage } from "../error/Error";

interface ITemplateForm {
  [key: string]: any;
}

export default function TemplatePage() {
  const { templateId } = useParams();
  const { toast } = useToast();
  const user = useSelector(selectUser);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { data: template, isLoading, isSuccess, error: templateError } = useGetTemplateByIdQuery(templateId);
  const [createForm, { isLoading: createLoading, error: createError }] = useCreateFormMutation();
  const [hasSubmittedForm, { isLoading: hasSubmittedLoading }] = useHasUserSubmittedFormMutation();

  
  const { register, handleSubmit } = useForm<ITemplateForm>();
  const { onSubmit } = useFormSubmission({ templateId, template, createForm, toast });

  useEffect(() => {
    const checkUserSubmitted = async () => {
      try {
        if (user) {
          const res = await hasSubmittedForm(templateId).unwrap();
          setHasSubmitted(res.hasSubmitted);
        }
      } catch (err: any) {
        if (err.status === 403) {
          toast({ variant: "destructive", description: "Unauthorized. Log In" });
        } else {
          toast({ variant: "destructive", description: "Something went wrong"});
        }

      }
    };

    checkUserSubmitted();
  }, [user]);

  if (isLoading || createLoading || hasSubmittedLoading) {
    return <LoadingSpinner />;
  }

  if (templateError) {
    return templateError && <ErrorPage error={templateError} />;
  }

  if (createError) {
    return createError && <ErrorPage error={createError} />;
  }

  if (!template) {
    return <div className="container flex-grow flex justify-center">Template not found</div>;
  }

  return (
    <div className="container flex-grow flex justify-center">
      {isSuccess && !hasSubmitted ? (
        <div className="w-[720px] h-full flex flex-col gap-5 border-x py-5 px-10">
          <TemplateHeaderComponent template={template} />

          <form onSubmit={handleSubmit(onSubmit)}>
            {template.questions.map(q => (
              <div className="flex flex-col gap-3 border-y py-2" key={q.id}>
                <h3>{q.question}</h3>

                <TemplateQuestionRenderer question={q} register={register} user={user} />
              </div>
            ))}

            {user && <Button type="submit">Submit</Button>}
          </form>
        </div>
      ) : (
        <div className="w-[720px] h-full flex flex-col gap-5 border-x py-5 px-10">
          <TemplateHeaderComponent template={template} />

          <p className="text-center">You have already submitted the form</p>
        </div>
      )}
    </div>
  );
}
