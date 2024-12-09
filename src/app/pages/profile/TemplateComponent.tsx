import { capitalize } from "@/app/lib/capitalize";
import { formatDate } from "@/app/lib/dateUtils";
import { NavLink } from "react-router-dom";

interface ITemplateComponent {
  t: IProfileTemplate;
}

export function TemplateComponent({ t }: ITemplateComponent) {
  return (
    <NavLink to={`/template/${t.id}`} className="flex flex-col border rounded-md p-3 hover:bg-gray-50 dark:hover:bg-zinc-900 duration-300">
      <div className="flex items-center justify-between mb-3 text-sm">
        <p>{t.email}</p>
        <span>{formatDate(t.createdAt)}</span>
      </div>
      <h4 className="mb-5 text-lg font-medium">{t.title}</h4>
      <div className="flex items-center justify-start gap-5 text-sm">
        <span>Responses: {t.responses}</span>
        <span>Topic: {capitalize(t.topic)}</span>
        <div className="flex items-center gap-1">
          <p>Tags:</p>
          {t.tags.map((t: string) => <span key={t}>{t}</span>)}
        </div>
      </div>
    </NavLink>
  );
}
