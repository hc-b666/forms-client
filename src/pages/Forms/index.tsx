import { Navigate, NavLink, useParams } from "react-router-dom";

import { useGetFormsQuery } from "@/features/templates/services/templateApi";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { formatDate } from "@/lib/utils/dateUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capitalize } from "@/lib/utils/stringUtils";

export default function FormsPage() {
  const { templateId } = useParams();
  if (!templateId) {
    return <Navigate to="/error" replace />;
  }

  const { data, isLoading, isError, isSuccess, error } = useGetFormsQuery(templateId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    if ('status' in error) {
      switch (error.status) {
        case 403:
          return <div>You do not have permission</div>;
        case 404:
          return <div>Template not found</div>;
        case 500:
          return <div>Server error occurred</div>;
        default:
          return <div>An unexpected error occurred</div>;
      }
    }
    
    return <div>{error.message || 'An error occurred'}</div>;
  }

  return (
    <div className="container flex-grow flex flex-col items-center">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-5">
          <TabsTrigger value="details" >Details</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          {isSuccess && (
            <div className="flex flex-col gap-3">
              <span className="self-end">Created at: <b>{formatDate(data.template.createdAt)}</b></span>

              <p>Title: {data.template.title}</p>
              <p>Description: {data.template.description}</p>
              <p>Topic: {capitalize(data.template.topic)}</p>
              <div>Tags: &nbsp;
                {data.template.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="questions">
          {isSuccess && (
            <div className="flex flex-col gap-3">
              {data.template.questions.map((question) => (
                <div key={question.id} className="border rounded-md p-5">
                  <div className="flex items-center gap-1">
                    <span>{question.order}.</span>
                    <p>{question.questionText}</p>
                  </div>
                  <span>Question Type: {capitalize(question.type)}</span>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="forms">
          {isSuccess && (
            <div className="flex flex-col items-center gap-5">
              {data.forms.length > 0 ? (
                <>
                  {data.forms.map((form) => (
                    <NavLink
                      to={`/template/${templateId}/forms/${form.id}`}
                      key={form.id}
                      className="w-full border rounded py-3 px-10 cursor-pointer"
                    >
                      <h3>{form.author.email}</h3>
                      <p>{formatDate(form.filledAt)}</p>
                    </NavLink>
                  ))}
                </>
              ) : (
                <p>There is no filled forms yet</p>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
