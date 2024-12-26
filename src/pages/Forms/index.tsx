import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useGetFormsQuery } from "./services";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Comments } from "@/features/comments/components/Comments";
import { TemplateDetails } from "./components/TemplateDetails";
import { TemplateForms } from "./components/TemplateForms";
import { TemplateQuestions } from "./components/TemplateQuestions";
import { Loader } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "../error/Error";
import { Button } from "@/components/ui/button";

export default function FormsPage() {
  const navigate = useNavigate();
  const { templateId } = useParams();
  if (!templateId) {
    return <Navigate to="/error" replace />;
  }

  const { data, isLoading, isError, isSuccess, error } = useGetFormsQuery(templateId);

  if (isError) {
    return <ErrorMessage error={error} />
  }

  return (
    <div className="container flex-grow flex flex-col items-center gap-5">
      <Button onClick={() => navigate(-1)} className="self-start">Go Back</Button>
      <Tabs defaultValue="details" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full min-w-[480px] grid-cols-4 mb-5">
            <TabsTrigger value="details" >Details</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="details">
          {isLoading && <Loader />}
          {isSuccess && <TemplateDetails template={data.template} />}
        </TabsContent>

        <TabsContent value="questions">
          {isLoading && <Loader />}
          {isSuccess && <TemplateQuestions questions={data.template.questions} />}
        </TabsContent>

        <TabsContent value="forms">
          {isLoading && <Loader />}
          {isSuccess && <TemplateForms {...data} />}
        </TabsContent>

        <TabsContent value="comments">
          <Comments templateId={templateId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
