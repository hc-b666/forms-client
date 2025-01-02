import { NavLink, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { GoBack } from "@/components/common/GoBack";
import { formatDate } from "@/lib/utils/dateUtils";
import { Badge } from "@/components/ui/badge";

interface TemplateHeaderProps {
  template: TemplateExtended;
}
export default function TemplateHeader({ template }: TemplateHeaderProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between">
        <GoBack />
        <NavLink
          to={`/profile/${template.creator.id}`}
          className="flex justify-end gap-1"
        >
          <span className="ml-auto hover:underline">
            {template.creator.email}
          </span>
          <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        </NavLink>
      </div>

      <div className="">
        {template.imageId && (
          <img
            src={`https://drive.google.com/thumbnail?id=${template.imageId}`}
            alt={template.title}
            className="object-cover rounded-md"
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">{template.title}</h1>
          <span className="text-sm">{formatDate(template.createdAt)}</span>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            {template.tags.map((tag) => (
              <Badge
                onClick={() => navigate(`/search?tagId=${tag.id}`)}
                className="cursor-pointer"
                key={tag.id}
              >
                {tag.tagName}
              </Badge>
            ))}
          </div>
          <span className="text-sm">Responses: {template.responses}</span>
        </div>
      </div>

      <p className="text-justify">{template.description}</p>
    </>
  );
}
