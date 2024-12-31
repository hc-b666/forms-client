import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { ErrorMessage } from "../error/Error";
import { Comments } from "@/features/comments/components/Comments";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  useGetTemplateByIdQuery,
  useHasUserSubmittedFormQuery,
} from "./services";
import { Template } from "./components/Template";
import { TemplateSkeletion } from "./components/TemplateSkeleton";

export default function TemplatePage() {
  const { templateId } = useParams();

  const {
    data: template,
    isError,
    isLoading,
    isSuccess: templateSuccess,
    error,
  } = useGetTemplateByIdQuery(templateId);
  const {
    data,
    isSuccess: hasSubmittedSuccess,
    refetch,
  } = useHasUserSubmittedFormQuery(templateId);

  useEffect(() => {
    if (template) {
      document.title = `Forms | ${template?.title}`;
    }
  }, [template]);

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="container flex-grow flex justify-center gap-20">
      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid w-full lg:w-[720px] grid-cols-2 mb-5 mx-auto">
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          {isLoading && <TemplateSkeletion />}
          {templateSuccess && hasSubmittedSuccess && (
            <Template
              template={template}
              hasSubmmited={data?.hasSubmitted}
              refetch={refetch}
            />
          )}
        </TabsContent>
        <TabsContent value="comments">
          <Comments templateId={templateId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
