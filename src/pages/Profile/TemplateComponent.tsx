import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils/stringUtils";
import { formatDate } from "@/lib/utils/dateUtils";
import { NavLink, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface ITemplateComponent {
  t: IProfileTemplate;
  isAuthor: boolean;
}

export function TemplateComponent({ t, isAuthor }: ITemplateComponent) {
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    alert(`Delete coming soon ${t.id}`);
  };

  return (
    <Card className="flex flex-col border rounded-md p-3">
      <div className="flex items-center justify-between mb-3 text-sm">
        <NavLink to={isAuthor ? `/template/${t.id}/forms` : `/template/${t.id}`} className="font-medium hover:underline">
          {t.title}
        </NavLink>
        <span>{formatDate(t.createdAt)}</span>
      </div>

      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-5 text-sm">
          <span>Responses: {t.responses}</span>
          <span>Topic: {capitalize(t.topic)}</span>
          <div className="flex items-center gap-1 flex-wrap">
            <p>Tags:</p>
            {t.tags.map((t: string) => <span key={t}>{t}</span>)}
          </div>
        </div>
        {isAuthor && (
          <div className="flex self-end items-center gap-3">
            <Button onClick={() => navigate(`/edit-template/${t.id}`)}>Edit</Button>
            <Button onClick={(e) => handleDelete(e)}>Delete</Button>
          </div>
        )}
      </div>
    </Card>
  );
}
