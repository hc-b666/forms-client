import { formatDate } from "@/lib/utils/dateUtils";
import { capitalize } from "@/lib/utils/stringUtils";

export function TemplateDetails({ template }: { template: ISingleTemplate }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="self-end">
        Created at: <b>{formatDate(template.createdAt)}</b>
      </span>

      <p>Title: {template.title}</p>
      <p>Description: {template.description}</p>
      <p>Topic: {capitalize(template.topic)}</p>
      <div>
        Tags: &nbsp;
        {template.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
