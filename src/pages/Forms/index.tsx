import { Navigate, useParams } from "react-router-dom";

import { useGetFormsQuery } from "./services";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Comments } from "@/features/comments/components/Comments";
import { TemplateDetails } from "./components/TemplateDetails";
import { TemplateForms } from "./components/TemplateForms";
import { TemplateQuestions } from "./components/TemplateQuestions";
import { Loader } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "../error/Error";
import { GoBack } from "@/components/common/GoBack";
import { Skeleton } from "@/components/ui/skeleton";
import { truncateText } from "@/lib/utils/stringUtils";
import { useTranslations } from "@/hooks/useTranslations";
import { useEffect } from "react";

export default function FormsPage() {
  const { templateId } = useParams();
  if (!templateId) {
    return <Navigate to="/error" replace />;
  }
  const { t } = useTranslations();

  const { data, isLoading, isError, isSuccess, error, refetch } = useGetFormsQuery(templateId);

  useEffect(() => {
    if (data) {
      document.title = `Forms | ${data.template.title}`;
    }
  }, [data]);

  if (isError) {
    return <ErrorMessage error={error} />
  }

  return (
    <div className="container flex-grow flex flex-col items-center gap-5">
      <div className="flex items-center justify-between w-full">
        {isLoading && <Skeleton className="w-40 h-8" />}
        {isSuccess && <h1 className="text-lg font-semibold">{truncateText(data?.template.title, 20)}</h1>}
        <GoBack />
      </div>
      <Tabs defaultValue="details" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full min-w-[480px] grid-cols-4 mb-5">
            <TabsTrigger value="details" >
              {t("formspage.details")}
            </TabsTrigger>
            <TabsTrigger value="questions">
              {t("formspage.questions")}
            </TabsTrigger>
            <TabsTrigger value="forms">
              {t("formspage.forms")}
            </TabsTrigger>
            <TabsTrigger value="comments">
              {t("formspage.comments")}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="details">
          {isLoading && <Loader />}
          {isSuccess && <TemplateDetails template={data.template} refetch={refetch} />}
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
