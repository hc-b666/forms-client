import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCreateFormMutation, useGetTemplateByIdQuery, useHasUserSubmittedFormMutation } from "@/features/templates/services/templateApi";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import TemplateHeaderComponent from "./TemplateHeaderComponent";
import TemplateQuestionRenderer from "./TemplateQuestionRenderer";
import useFormSubmission from "./useFormSubmission";
import { selectUser } from "@/features/auth/slices/authSlice";
import { ErrorPage } from "../error/Error";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCreateCommentMutation } from "@/features/templates/services/templateApi";
import { formatDate } from "@/lib/utils/dateUtils";

interface ITemplateForm {
  [key: string]: any;
}

interface ICommentForm {
  content: string;
}

export default function TemplatePage() {
  const { templateId } = useParams();
  const { toast } = useToast();
  const user = useSelector(selectUser);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { data: template, isLoading, isSuccess, error: templateError } = useGetTemplateByIdQuery(templateId);
  const [createForm, { isLoading: createLoading, error: createError }] = useCreateFormMutation();
  const [hasSubmittedForm, { isLoading: hasSubmittedLoading }] = useHasUserSubmittedFormMutation();
  const [createComment] = useCreateCommentMutation();

  const { register, handleSubmit } = useForm<ITemplateForm>();
  const { onSubmit } = useFormSubmission({ templateId, template, createForm, toast });

  const { register: commentRegister, handleSubmit: commentHandleSubmit } = useForm<ICommentForm>();
  const onCommentSubmit: SubmitHandler<ICommentForm> = async (data) => {
    try {
      const res = await createComment({ templateId: templateId, content: data.content }).unwrap();
      toast({ description: res.message });
    } catch (err) {
      console.log(err);
    }
  };

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
    <div className="container flex-grow flex justify-center gap-20">
      {isSuccess && !hasSubmitted ? (
        <div className="w-full h-full flex flex-col gap-5 border-x py-5 px-10">
          <TemplateHeaderComponent template={template} />

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            {template.questions.map(q => (
              <div className="flex flex-col gap-3 border-y py-2" key={q.id}>
                <h3>{q.question}</h3>

                <TemplateQuestionRenderer question={q} register={register} user={user} />
              </div>
            ))}

            {user && <Button type="submit" className="mt-5 self-end">Submit</Button>}
          </form>
        </div>
      ) : (
        <div className="w-fullh-full flex flex-col gap-5 border-x py-5 px-10">
          <TemplateHeaderComponent template={template} />

          <p className="text-center">You have already submitted the form</p>
        </div>
      )}

      {isSuccess && (
        <div className="w-full border-x px-10 py-5 flex flex-col gap-5">
          <h1 className="text-2xl">Comments</h1>

          <form onSubmit={commentHandleSubmit(onCommentSubmit)} className="flex flex-col gap-3 pb-5 border-b">
            <Label htmlFor="content">Add your comment</Label>
            <div className="grid grid-cols-4 gap-3">
              <Input 
                id="content" 
                placeholder="Add your comment" 
                className="col-span-3"
                {...commentRegister("content")}
                disabled={!user}
              />
              <Button disabled={!user} type="submit" className="col-span-1">
                Add
              </Button>
            </div>
          </form>

          <div>
            {template.comments.map(c => (
              <div key={c.commentId} className="border-y py-5">
                <h1>{c.email}</h1>
                <p>{c.content}</p>
                <p>{formatDate(c.createdAt)}</p>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
