import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useIntl } from "react-intl";

import { useGetTemplatesByUserIdQuery } from "../services";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { TemplateComponent } from "./TemplateComponent";

interface IProfileTemplates {
  userId: number;
}

export function ProfileTemplates({ userId }: IProfileTemplates) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const intl = useIntl();

  const { data, isLoading, isSuccess } = useGetTemplatesByUserIdQuery(userId);

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
              {intl.formatMessage({ id: "profilepage.templates" })} (
              {data.length})
            </h1>

            {user?.id === userId && (
              <Button onClick={() => navigate("/create-template")}>
                {intl.formatMessage({ id: "profilepage.create" })}
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
              <p>{intl.formatMessage({ id: "profilepage.notemplates" })}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
