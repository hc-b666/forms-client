import { capitalize } from "@/app/lib/capitalize";
import { formatDate } from "@/app/lib/dateUtils";

interface ILatestTemplateCompoennt {
  t: ILatestTemplate;
}

export function LatestTemplateComponent({ t }: ILatestTemplateCompoennt) {
  return (
    <div className="flex flex-col border rounded-md p-3">
      <div className="flex items-center justify-between mb-3 text-sm">
        <p>{t.email}</p>
        <span>{formatDate(t.createdAt)}</span>
      </div>
      <h4 className="mb-5 text-lg font-medium">{t.title}</h4>
      <div className="flex items-center justify-start gap-5 text-sm">
        <span>Topic: {capitalize(t.topic)}</span>
        <div className="flex items-center gap-1">
          <p>Tags:</p>
          {t.tags.map((t: string) => <span key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}
