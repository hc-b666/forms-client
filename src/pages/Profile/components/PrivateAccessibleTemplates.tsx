import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useTranslations } from "@/hooks/useTranslations";
import { useGetPrivateAccessibleTemplatesQuery } from "../services";
import { Button } from "@/components/ui/button";
import { TemplateComponent } from "./TemplateComponent";

export function PrivateAccessibleTemplates() {
  const { t } = useTranslations();
  const { data, isLoading, isSuccess } = useGetPrivateAccessibleTemplatesQuery();
  const navigate = useNavigate();
  
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
          <h1 className="text-2xl font-semibold">
            {t("profilepage.private-accessible-templates")} ({data.length})
          </h1>

          <Button onClick={() => navigate("/create-template")}>
            {t("profilepage.create")}
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {data.length !== 0 ? (
            data.map((t) => <TemplateComponent t={t} key={t.id} />)
          ) : (
            <p>{t("profilepage.notemplates")}</p>
          )}
        </div>
      </div>
    )}
  </>
  );
}
