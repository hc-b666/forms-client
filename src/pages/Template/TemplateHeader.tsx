import { NavLink } from "react-router-dom";
import { User } from "lucide-react";
import { GoBack } from "@/components/common/GoBack";

interface ITemplateHeader {
  template: ISingleTemplate;
}
export default function TemplateHeader({ template }: ITemplateHeader) {  
  return (
    <>
      <div className="flex items-center justify-between">
        <GoBack />
        <NavLink to={`/profile/${template.creator.id}`} className="flex justify-end gap-1">
          <span className="ml-auto hover:underline">{template.creator.email}</span>
          <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        </NavLink>
      </div>

      <h1 className="text-2xl border-b pb-2 mb-5">{template.title}</h1>
      <p className="mb-5 border-b pb-1">{template.description}</p>
    </>
  );
}
