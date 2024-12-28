import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useGetTemplatesByUserIdQuery } from "../services";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { TemplateComponent } from "./TemplateComponent";
import { ErrorMessage } from "@/pages/error/Error";
import { useTranslations } from "@/hooks/useTranslations";
import { useGetPath } from "@/hooks/useGetPath";

export function ProfileTemplates({ userId }: { userId: number }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslations();
  const createtemplatepath = useGetPath("/create-template", userId);

  const { data, isLoading, isError, isSuccess, error } = useGetTemplatesByUserIdQuery(userId);

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
              {t("profilepage.templates")} ({data.length})
            </h1>

            {(user?.id === userId || user?.role === "ADMIN") && (
              <Button onClick={() => navigate(createtemplatepath)}>
                {t("profilepage.create")}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {data.length !== 0 ? (
              data.map((t) => (
                <TemplateComponent
                  template={t}
                  key={t.id}
                  isAuthor={user?.id === userId}
                />
              ))
            ) : (
              <p>{t("profilepage.notemplates")}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
