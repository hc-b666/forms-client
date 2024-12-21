import { NavLink } from "react-router-dom";
import { User } from "lucide-react";

interface ITemplateHeader {
  template: ISingleTemplate;
}
export default function TemplateHeader({ template }: ITemplateHeader) {
  return (
    <>
      <NavLink to={`/profile/${template.creator.id}`} className="w-full flex justify-end gap-1">
        <span className="ml-auto hover:underline">{template.creator.email}</span>
        <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
      </NavLink>

      <h1 className="text-2xl border-b pb-3 mb-5">{template.title}</h1>
      <p className="mb-5 border-b pb-5">{template.description}</p>
    </>
  );
}
