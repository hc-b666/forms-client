import { Button } from "@/app/components/ui/button";
import { capitalize } from "@/app/lib/capitalize";
import { formatDate } from "@/app/lib/dateUtils";
import { NavLink, useNavigate } from "react-router-dom";

interface ITemplateComponent {
  t: IProfileTemplate;
  isAuthor: boolean;
}

export function TemplateComponent({ t, isAuthor }: ITemplateComponent) {
  const navigate = useNavigate();

  return (
    <NavLink to={`/template/${t.templateId}`} className="flex flex-col border rounded-md p-3 hover:bg-gray-50 dark:hover:bg-zinc-900 duration-300">
      <div className="flex items-center justify-between mb-3 text-sm">
        <h4 className="text-lg font-medium">{t.title}</h4>
        <span>{formatDate(t.createdAt)}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-5 text-sm">
          <span>Responses: {t.responses}</span>
          <span>Topic: {capitalize(t.topic)}</span>
          <div className="flex items-center gap-1">
            <p>Tags:</p>
            {t.tags.map((t: string) => <span key={t}>{t}</span>)}
          </div>
        </div>
        {isAuthor && (
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate(`/edit-template/${t.templateId}`)}>Edit</Button>
          </div>
        )}
      </div>
    </NavLink>
  );
}
