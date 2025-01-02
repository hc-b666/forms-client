import { useTranslations } from "@/hooks/useTranslations";
import { formatDate } from "@/lib/utils/dateUtils";
import { NavLink } from "react-router-dom";

interface TemplateFormsProps {
  template: TemplateExtended;
  forms: Form[];
}

export function TemplateForms({ forms, template }: TemplateFormsProps) {
  const { t } = useTranslations();

  return (
    <div className="w-full lg:w-[720px] mx-auto flex flex-col items-center gap-5">
      {forms.length > 0 ? (
        <>
          {forms.map((form) => (
            <NavLink
              to={`/template/${template.id}/forms/${form.id}?title=${template.title}`}
              key={form.id}
              className="w-full border rounded py-3 px-10 cursor-pointer"
            >
              <h3>{form.author.email}</h3>
              <p>{formatDate(form.filledAt)}</p>
            </NavLink>
          ))}
        </>
      ) : (
        <p>{t("formspage.noforms")}</p>
      )}
    </div>
  );
}
