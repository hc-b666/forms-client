import { useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useTranslations } from "@/hooks/useTranslations";
import { useGetPrivateAccessibleTemplatesQuery } from "../services";
import { Button } from "@/components/ui/button";
import { TemplateComponent } from "./TemplateComponent";
import { ErrorMessage } from "@/pages/error/Error";

export function PrivateAccessibleTemplates() {
  const { t } = useTranslations();
  const { userId } = useParams();
  const { data, isLoading, isError, isSuccess, error } = useGetPrivateAccessibleTemplatesQuery(userId);
  const navigate = useNavigate();
  
  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
    {isLoading && (
      <div className="w-full flex justify-center">
        <MoonLoader color="black" />
      </div>
    )}

    {isSuccess && (
      <div className="w-full">
        <div className="flex items-center justify-between mb-5">
          <h1 className="md:text-2xl font-semibold">
            {t("profilepage.private-accessible-templates")} ({data.length})
          </h1>

          <Button onClick={() => navigate("/create-template")}>
            {t("profilepage.create")}
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {data.length !== 0 ? (
            data.map((t) => <TemplateComponent template={t} key={t.id} />)
          ) : (
            <p>{t("profilepage.notemplates")}</p>
          )}
        </div>
      </div>
    )}
  </>
  );
}
