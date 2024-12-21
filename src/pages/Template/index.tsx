import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetTemplateByIdQuery, useHasUserSubmittedFormMutation } from "@/features/templates/services/templateApi";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";
import TemplateHeader from "./TemplateHeader";
import { ErrorPage } from "../error/Error";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Comments } from "@/features/comments/components/Comments";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Form } from "@/features/forms/components/Form";

export default function TemplatePage() {
  const { templateId } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { data: template, isLoading, isSuccess, error: templateError } = useGetTemplateByIdQuery(templateId);
  const [hasSubmittedForm, { isLoading: hasSubmittedLoading }] = useHasUserSubmittedFormMutation();

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

  if (isLoading || hasSubmittedLoading) {
    return <LoadingSpinner />;
  }

  if (templateError) {
    return templateError && <ErrorPage error={templateError} />;
  }

  if (!template) {
    return <div className="container flex-grow flex justify-center">Template not found</div>;
  }

  return (
    <div className="container flex-grow flex justify-center gap-20">
      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-5">
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
      
        <TabsContent value="form">
          {isSuccess && !hasSubmitted ? (
            <div className="w-full h-full flex flex-col gap-5 py-5">
              <TemplateHeader template={template} />

              <Form template={template} />
            </div>
          ) : (
            <div className="w-fullh-full flex flex-col gap-5 py-5">
              <TemplateHeader template={template} />

              <p className="text-center">You have already submitted the form</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="comments">
          <Comments templateId={templateId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
