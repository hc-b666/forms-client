import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useGetPrivateTemplatesQuery } from "../services";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useTranslations";
import { TemplateComponent } from "./TemplateComponent";

export function PrivateTemplates() {
  const { t } = useTranslations();
  const { data, isLoading, isSuccess } = useGetPrivateTemplatesQuery();
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
            <h1 className="md:text-2xl font-semibold">
              {t("profilepage.private-templates")} ({data.length})
            </h1>

            <Button onClick={() => navigate("/create-template")}>
              {t("profilepage.create")}
            </Button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {data.length !== 0 ? (
              data.map((t) => <TemplateComponent template={t} key={t.id} isAuthor={true} />)
            ) : (
              <p>{t("profilepage.notemplates")}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
