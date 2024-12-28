import { useParams } from "react-router-dom";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import TemplateHeader from "./TemplateHeader";
import { ErrorMessage } from "../error/Error";
import { Comments } from "@/features/comments/components/Comments";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Form } from "@/features/forms/components/Form";
import { useGetTemplateByIdQuery, useHasUserSubmittedFormQuery } from "./services";

export default function TemplatePage() {
  const { templateId } = useParams();

  const { data: template, isError, isLoading, isSuccess, error } = useGetTemplateByIdQuery(templateId);
  const { data, refetch } = useHasUserSubmittedFormQuery(templateId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
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
          {isSuccess && !data?.hasSubmitted ? (
            <div className="w-full h-full flex flex-col gap-5 py-5">
              <TemplateHeader template={template} />

              <Form template={template} refetch={refetch} />
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
