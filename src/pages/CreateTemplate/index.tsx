import { useEffect } from "react";

import { GoBack } from "@/components/common/GoBack";
import { useTranslations } from "@/hooks/useTranslations";
import { CreateTemplateProvider } from "./CreateTemplateProvider";
import { CreateTemplateForm } from "./components/CreateTemplateForm";

export default function CreateTemplatePage() {
  const { t } = useTranslations();

  useEffect(() => {
    document.title = "Forms | Create Template";
  }, []);

  return (
    <CreateTemplateProvider>
      <div className="container flex-grow flex flex-col items-center gap-5">
        <div className="flex items-center justify-between gap-10 w-full md:w-[720px]">
          <h1 className="lg:text-2xl font-semibold">
            {t("createtemplatepage.header")}
          </h1>
          <GoBack />
        </div>

        <CreateTemplateForm />
      </div>
    </CreateTemplateProvider>
  );
}
